/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { EnvironmentInjector } from '../../di/r3_injector';
import { assertDefined, throwError } from '../../util/assert';
import { assertTNodeForLView } from '../assert';
import { getComponentDef } from '../definition';
import { getNodeInjectorLView, getNodeInjectorTNode, NodeInjector } from '../di';
import { setInjectorProfiler } from './injector_profiler';
/**
 * These are the data structures that our framework injector profiler will fill with data in order
 * to support DI debugging APIs.
 *
 * resolverToTokenToDependencies: Maps an injector to a Map of tokens to an Array of
 * dependencies. Injector -> Token -> Dependencies This is used to support the
 * getDependenciesFromInjectable API, which takes in an injector and a token and returns it's
 * dependencies.
 *
 * resolverToProviders: Maps a DI resolver (an Injector or a TNode) to the providers configured
 * within it This is used to support the getInjectorProviders API, which takes in an injector and
 * returns the providers that it was configured with. Note that for the element injector case we
 * use the TNode instead of the LView as the DI resolver. This is because the registration of
 * providers happens only once per type of TNode. If an injector is created with an identical TNode,
 * the providers for that injector will not be reconfigured.
 *
 * standaloneInjectorToComponent: Maps the injector of a standalone component to the standalone
 * component that it is associated with. Used in the getInjectorProviders API, specificially in the
 * discovery of import paths for each provider. This is necessary because the imports array of a
 * standalone component is processed and configured in its standalone injector, but exists within
 * the component's definition. Because getInjectorProviders takes in an injector, if that injector
 * is the injector of a standalone component, we need to be able to discover the place where the
 * imports array is located (the component) in order to flatten the imports array within it to
 * discover all of it's providers.
 *
 *
 * All of these data structures are instantiated with WeakMaps. This will ensure that the presence
 * of any object in the keys of these maps does not prevent the garbage collector from collecting
 * those objects. Because of this property of WeakMaps, these data structures will never be the
 * source of a memory leak.
 *
 * An example of this advantage: When components are destroyed, we don't need to do
 * any additional work to remove that component from our mappings.
 *
 */
class DIDebugData {
    constructor() {
        this.resolverToTokenToDependencies = new WeakMap();
        this.resolverToProviders = new WeakMap();
        this.standaloneInjectorToComponent = new WeakMap();
    }
    reset() {
        this.resolverToTokenToDependencies =
            new WeakMap();
        this.resolverToProviders = new WeakMap();
        this.standaloneInjectorToComponent = new WeakMap();
    }
}
let frameworkDIDebugData = new DIDebugData();
export function getFrameworkDIDebugData() {
    return frameworkDIDebugData;
}
/**
 * Initalize default handling of injector events. This handling parses events
 * as they are emitted and constructs the data structures necessary to support
 * some of debug APIs.
 *
 * See handleInjectEvent, handleCreateEvent and handleProviderConfiguredEvent
 * for descriptions of each handler
 *
 * Supported APIs:
 *               - getDependenciesFromInjectable
 *               - getInjectorProviders
 */
export function setupFrameworkInjectorProfiler() {
    frameworkDIDebugData.reset();
    setInjectorProfiler((injectorProfilerEvent) => handleInjectorProfilerEvent(injectorProfilerEvent));
}
function handleInjectorProfilerEvent(injectorProfilerEvent) {
    const { context, type } = injectorProfilerEvent;
    if (type === 0 /* InjectorProfilerEventType.Inject */) {
        handleInjectEvent(context, injectorProfilerEvent.service);
    }
    else if (type === 1 /* InjectorProfilerEventType.InstanceCreatedByInjector */) {
        handleInstanceCreatedByInjectorEvent(context, injectorProfilerEvent.instance);
    }
    else if (type === 2 /* InjectorProfilerEventType.ProviderConfigured */) {
        handleProviderConfiguredEvent(context, injectorProfilerEvent.providerRecord);
    }
}
/**
 *
 * Stores the injected service in frameworkDIDebugData.resolverToTokenToDependencies
 * based on it's injector and token.
 *
 * @param context InjectorProfilerContext the injection context that this event occurred in.
 * @param data InjectedService the service associated with this inject event.
 *
 */
function handleInjectEvent(context, data) {
    const diResolver = getDIResolver(context.injector);
    if (diResolver === null) {
        throwError('An Inject event must be run within an injection context.');
    }
    const diResolverToInstantiatedToken = frameworkDIDebugData.resolverToTokenToDependencies;
    if (!diResolverToInstantiatedToken.has(diResolver)) {
        diResolverToInstantiatedToken.set(diResolver, new WeakMap());
    }
    // if token is a primitive type, ignore this event. We do this because we cannot keep track of
    // non-primitive tokens in WeakMaps since they are not garbage collectable.
    if (!canBeHeldWeakly(context.token)) {
        return;
    }
    const instantiatedTokenToDependencies = diResolverToInstantiatedToken.get(diResolver);
    if (!instantiatedTokenToDependencies.has(context.token)) {
        instantiatedTokenToDependencies.set(context.token, []);
    }
    const { token, value, flags } = data;
    assertDefined(context.token, 'Injector profiler context token is undefined.');
    const dependencies = instantiatedTokenToDependencies.get(context.token);
    assertDefined(dependencies, 'Could not resolve dependencies for token.');
    if (context.injector instanceof NodeInjector) {
        dependencies.push({ token, value, flags, injectedIn: getNodeInjectorContext(context.injector) });
    }
    else {
        dependencies.push({ token, value, flags });
    }
}
/**
 *
 * Returns the LView and TNode associated with a NodeInjector. Returns undefined if the injector
 * is not a NodeInjector.
 *
 * @param injector
 * @returns {lView: LView, tNode: TNode}|undefined
 */
function getNodeInjectorContext(injector) {
    if (!(injector instanceof NodeInjector)) {
        throwError('getNodeInjectorContext must be called with a NodeInjector');
    }
    const lView = getNodeInjectorLView(injector);
    const tNode = getNodeInjectorTNode(injector);
    if (tNode === null) {
        return;
    }
    assertTNodeForLView(tNode, lView);
    return { lView, tNode };
}
/**
 *
 * If the created instance is an instance of a standalone component, maps the injector to that
 * standalone component in frameworkDIDebugData.standaloneInjectorToComponent
 *
 * @param context InjectorProfilerContext the injection context that this event occurred in.
 * @param data InjectorCreatedInstance an object containing the instance that was just created
 *
 */
function handleInstanceCreatedByInjectorEvent(context, data) {
    const { value } = data;
    if (getDIResolver(context.injector) === null) {
        throwError('An InjectorCreatedInstance event must be run within an injection context.');
    }
    // if our value is an instance of a standalone component, map the injector of that standalone
    // component to the component class. Otherwise, this event is a noop.
    let standaloneComponent = undefined;
    if (typeof value === 'object') {
        standaloneComponent = value?.constructor;
    }
    if (standaloneComponent === undefined || !isStandaloneComponent(standaloneComponent)) {
        return;
    }
    const environmentInjector = context.injector.get(EnvironmentInjector, null, { optional: true });
    // Standalone components should have an environment injector. If one cannot be
    // found we may be in a test case for low level functionality that did not explictly
    // setup this injector. In those cases, we simply ignore this event.
    if (environmentInjector === null) {
        return;
    }
    const { standaloneInjectorToComponent } = frameworkDIDebugData;
    // If our injector has already been mapped, as is the case
    // when a standalone component imports another standalone component,
    // we consider the original component (the component doing the importing)
    // as the component connected to our injector.
    if (standaloneInjectorToComponent.has(environmentInjector)) {
        return;
    }
    // If our injector hasn't been mapped, then we map it to the standalone component
    standaloneInjectorToComponent.set(environmentInjector, standaloneComponent);
}
function isStandaloneComponent(value) {
    const def = getComponentDef(value);
    return !!def?.standalone;
}
/**
 *
 * Stores the emitted ProviderRecords from the InjectorProfilerEventType.ProviderConfigured
 * event in frameworkDIDebugData.resolverToProviders
 *
 * @param context InjectorProfilerContext the injection context that this event occurred in.
 * @param data ProviderRecord an object containing the instance that was just created
 *
 */
function handleProviderConfiguredEvent(context, data) {
    const { resolverToProviders } = frameworkDIDebugData;
    let diResolver;
    if (context?.injector instanceof NodeInjector) {
        diResolver = getNodeInjectorTNode(context.injector);
    }
    else {
        diResolver = context.injector;
    }
    if (diResolver === null) {
        throwError('A ProviderConfigured event must be run within an injection context.');
    }
    if (!resolverToProviders.has(diResolver)) {
        resolverToProviders.set(diResolver, []);
    }
    resolverToProviders.get(diResolver).push(data);
}
function getDIResolver(injector) {
    let diResolver = null;
    if (injector === undefined) {
        return diResolver;
    }
    // We use the LView as the diResolver for NodeInjectors because they
    // do not persist anywhere in the framework. They are simply wrappers around an LView and a TNode
    // that do persist. Because of this, we rely on the LView of the NodeInjector in order to use
    // as a concrete key to represent this injector. If we get the same LView back later, we know
    // we're looking at the same injector.
    if (injector instanceof NodeInjector) {
        diResolver = getNodeInjectorLView(injector);
    }
    // Other injectors can be used a keys for a map because their instances
    // persist
    else {
        diResolver = injector;
    }
    return diResolver;
}
// inspired by
// https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-canbeheldweakly
function canBeHeldWeakly(value) {
    // we check for value !== null here because typeof null === 'object
    return value !== null &&
        (typeof value === 'object' || typeof value === 'function' || typeof value === 'symbol');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWV3b3JrX2luamVjdG9yX3Byb2ZpbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyMy9kZWJ1Zy9mcmFtZXdvcmtfaW5qZWN0b3JfcHJvZmlsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBR0gsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFFekQsT0FBTyxFQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUM1RCxPQUFPLEVBQWMsbUJBQW1CLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDM0QsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM5QyxPQUFPLEVBQUMsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsWUFBWSxFQUFDLE1BQU0sT0FBTyxDQUFDO0FBSS9FLE9BQU8sRUFBc0ksbUJBQW1CLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUU3TDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtDRztBQUNILE1BQU0sV0FBVztJQUFqQjtRQUNFLGtDQUE2QixHQUN6QixJQUFJLE9BQU8sRUFBNkQsQ0FBQztRQUM3RSx3QkFBbUIsR0FBRyxJQUFJLE9BQU8sRUFBb0MsQ0FBQztRQUN0RSxrQ0FBNkIsR0FBRyxJQUFJLE9BQU8sRUFBMkIsQ0FBQztJQVF6RSxDQUFDO0lBTkMsS0FBSztRQUNILElBQUksQ0FBQyw2QkFBNkI7WUFDOUIsSUFBSSxPQUFPLEVBQTZELENBQUM7UUFDN0UsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksT0FBTyxFQUFvQyxDQUFDO1FBQzNFLElBQUksQ0FBQyw2QkFBNkIsR0FBRyxJQUFJLE9BQU8sRUFBMkIsQ0FBQztJQUM5RSxDQUFDO0NBQ0Y7QUFFRCxJQUFJLG9CQUFvQixHQUFHLElBQUksV0FBVyxF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QjtJQUNqRCxJQUFJLFVBQVUsR0FBd0IsSUFBSSxDQUFDO0lBRTNDLElBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtRQUMxQixPQUFPLFVBQVUsQ0FBQztLQUNuQjtJQUVELG9FQUFvRTtJQUNwRSxpR0FBaUc7SUFDakcsNkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3RixzQ0FBc0M7SUFDdEMsSUFBSSxRQUFRLFlBQVksWUFBWSxFQUFFO1FBQ3BDLFVBQVUsR0FBRyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUM3QztJQUNELHVFQUF1RTtJQUN2RSxVQUFVO1NBQ0w7UUFDSCxVQUFVLEdBQUcsUUFBUSxDQUFDO0tBQ3ZCO0lBRUQsT0FBTyxVQUFVLENBQUM7QUFDcEIsQ0FBQztBQUVELGNBQWM7QUFDZCxvR0FBb0c7QUFDcEcsU0FBUyxlQUFlLENBQUMsS0FBVTtJQUNqQyxtRUFBbUU7SUFDbkUsT0FBTyxLQUFLLEtBQUssSUFBSTtRQUNqQixDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxPQUFPLEtBQUssS0FBSyxVQUFVLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUM7QUFDOUYsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdG9yfSBmcm9tICcuLi8uLi9kaS9pbmplY3Rvcic7XG5pbXBvcnQge0Vudmlyb25tZW50SW5qZWN0b3J9IGZyb20gJy4uLy4uL2RpL3IzX2luamVjdG9yJztcbmltcG9ydCB7VHlwZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3R5cGUnO1xuaW1wb3J0IHthc3NlcnREZWZpbmVkLCB0aHJvd0Vycm9yfSBmcm9tICcuLi8uLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQge2Fzc2VydFROb2RlLCBhc3NlcnRUTm9kZUZvckxWaWV3fSBmcm9tICcuLi9hc3NlcnQnO1xuaW1wb3J0IHtnZXRDb21wb25lbnREZWZ9IGZyb20gJy4uL2RlZmluaXRpb24nO1xuaW1wb3J0IHtnZXROb2RlSW5qZWN0b3JMVmlldywgZ2V0Tm9kZUluamVjdG9yVE5vZGUsIE5vZGVJbmplY3Rvcn0gZnJvbSAnLi4vZGknO1xuaW1wb3J0IHtUTm9kZX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9ub2RlJztcbmltcG9ydCB7TFZpZXd9IGZyb20gJy4uL2ludGVyZmFjZXMvdmlldyc7XG5cbmltcG9ydCB7SW5qZWN0ZWRTZXJ2aWNlLCBJbmplY3RvckNyZWF0ZWRJbnN0YW5jZSwgSW5qZWN0b3JQcm9maWxlckNvbnRleHQsIEluamVjdG9yUHJvZmlsZXJFdmVudCwgSW5qZWN0b3JQcm9maWxlckV2ZW50VHlwZSwgUHJvdmlkZXJSZWNvcmQsIHNldEluamVjdG9yUHJvZmlsZXJ9IGZyb20gJy4vaW5qZWN0b3JfcHJvZmlsZXInO1xuXG4vKipcbiAqIFRoZXNlIGFyZSB0aGUgZGF0YSBzdHJ1Y3R1cmVzIHRoYXQgb3VyIGZyYW1ld29yayBpbmplY3RvciBwcm9maWxlciB3aWxsIGZpbGwgd2l0aCBkYXRhIGluIG9yZGVyXG4gKiB0byBzdXBwb3J0IERJIGRlYnVnZ2luZyBBUElzLlxuICpcbiAqIHJlc29sdmVyVG9Ub2tlblRvRGVwZW5kZW5jaWVzOiBNYXBzIGFuIGluamVjdG9yIHRvIGEgTWFwIG9mIHRva2VucyB0byBhbiBBcnJheSBvZlxuICogZGVwZW5kZW5jaWVzLiBJbmplY3RvciAtPiBUb2tlbiAtPiBEZXBlbmRlbmNpZXMgVGhpcyBpcyB1c2VkIHRvIHN1cHBvcnQgdGhlXG4gKiBnZXREZXBlbmRlbmNpZXNGcm9tSW5qZWN0YWJsZSBBUEksIHdoaWNoIHRha2VzIGluIGFuIGluamVjdG9yIGFuZCBhIHRva2VuIGFuZCByZXR1cm5zIGl0J3NcbiAqIGRlcGVuZGVuY2llcy5cbiAqXG4gKiByZXNvbHZlclRvUHJvdmlkZXJzOiBNYXBzIGEgREkgcmVzb2x2ZXIgKGFuIEluamVjdG9yIG9yIGEgVE5vZGUpIHRvIHRoZSBwcm92aWRlcnMgY29uZmlndXJlZFxuICogd2l0aGluIGl0IFRoaXMgaXMgdXNlZCB0byBzdXBwb3J0IHRoZSBnZXRJbmplY3RvclByb3ZpZGVycyBBUEksIHdoaWNoIHRha2VzIGluIGFuIGluamVjdG9yIGFuZFxuICogcmV0dXJucyB0aGUgcHJvdmlkZXJzIHRoYXQgaXQgd2FzIGNvbmZpZ3VyZWQgd2l0aC4gTm90ZSB0aGF0IGZvciB0aGUgZWxlbWVudCBpbmplY3RvciBjYXNlIHdlXG4gKiB1c2UgdGhlIFROb2RlIGluc3RlYWQgb2YgdGhlIExWaWV3IGFzIHRoZSBESSByZXNvbHZlci4gVGhpcyBpcyBiZWNhdXNlIHRoZSByZWdpc3RyYXRpb24gb2ZcbiAqIHByb3ZpZGVycyBoYXBwZW5zIG9ubHkgb25jZSBwZXIgdHlwZSBvZiBUTm9kZS4gSWYgYW4gaW5qZWN0b3IgaXMgY3JlYXRlZCB3aXRoIGFuIGlkZW50aWNhbCBUTm9kZSxcbiAqIHRoZSBwcm92aWRlcnMgZm9yIHRoYXQgaW5qZWN0b3Igd2lsbCBub3QgYmUgcmVjb25maWd1cmVkLlxuICpcbiAqIHN0YW5kYWxvbmVJbmplY3RvclRvQ29tcG9uZW50OiBNYXBzIHRoZSBpbmplY3RvciBvZiBhIHN0YW5kYWxvbmUgY29tcG9uZW50IHRvIHRoZSBzdGFuZGFsb25lXG4gKiBjb21wb25lbnQgdGhhdCBpdCBpcyBhc3NvY2lhdGVkIHdpdGguIFVzZWQgaW4gdGhlIGdldEluamVjdG9yUHJvdmlkZXJzIEFQSSwgc3BlY2lmaWNpYWxseSBpbiB0aGVcbiAqIGRpc2NvdmVyeSBvZiBpbXBvcnQgcGF0aHMgZm9yIGVhY2ggcHJvdmlkZXIuIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2UgdGhlIGltcG9ydHMgYXJyYXkgb2YgYVxuICogc3RhbmRhbG9uZSBjb21wb25lbnQgaXMgcHJvY2Vzc2VkIGFuZCBjb25maWd1cmVkIGluIGl0cyBzdGFuZGFsb25lIGluamVjdG9yLCBidXQgZXhpc3RzIHdpdGhpblxuICogdGhlIGNvbXBvbmVudCdzIGRlZmluaXRpb24uIEJlY2F1c2UgZ2V0SW5qZWN0b3JQcm92aWRlcnMgdGFrZXMgaW4gYW4gaW5qZWN0b3IsIGlmIHRoYXQgaW5qZWN0b3JcbiAqIGlzIHRoZSBpbmplY3RvciBvZiBhIHN0YW5kYWxvbmUgY29tcG9uZW50LCB3ZSBuZWVkIHRvIGJlIGFibGUgdG8gZGlzY292ZXIgdGhlIHBsYWNlIHdoZXJlIHRoZVxuICogaW1wb3J0cyBhcnJheSBpcyBsb2NhdGVkICh0aGUgY29tcG9uZW50KSBpbiBvcmRlciB0byBmbGF0dGVuIHRoZSBpbXBvcnRzIGFycmF5IHdpdGhpbiBpdCB0b1xuICogZGlzY292ZXIgYWxsIG9mIGl0J3MgcHJvdmlkZXJzLlxuICpcbiAqXG4gKiBBbGwgb2YgdGhlc2UgZGF0YSBzdHJ1Y3R1cmVzIGFyZSBpbnN0YW50aWF0ZWQgd2l0aCBXZWFrTWFwcy4gVGhpcyB3aWxsIGVuc3VyZSB0aGF0IHRoZSBwcmVzZW5jZVxuICogb2YgYW55IG9iamVjdCBpbiB0aGUga2V5cyBvZiB0aGVzZSBtYXBzIGRvZXMgbm90IHByZXZlbnQgdGhlIGdhcmJhZ2UgY29sbGVjdG9yIGZyb20gY29sbGVjdGluZ1xuICogdGhvc2Ugb2JqZWN0cy4gQmVjYXVzZSBvZiB0aGlzIHByb3BlcnR5IG9mIFdlYWtNYXBzLCB0aGVzZSBkYXRhIHN0cnVjdHVyZXMgd2lsbCBuZXZlciBiZSB0aGVcbiAqIHNvdXJjZSBvZiBhIG1lbW9yeSBsZWFrLlxuICpcbiAqIEFuIGV4YW1wbGUgb2YgdGhpcyBhZHZhbnRhZ2U6IFdoZW4gY29tcG9uZW50cyBhcmUgZGVzdHJveWVkLCB3ZSBkb24ndCBuZWVkIHRvIGRvXG4gKiBhbnkgYWRkaXRpb25hbCB3b3JrIHRvIHJlbW92ZSB0aGF0IGNvbXBvbmVudCBmcm9tIG91ciBtYXBwaW5ncy5cbiAqXG4gKi9cbmNsYXNzIERJRGVidWdEYXRhIHtcbiAgcmVzb2x2ZXJUb1Rva2VuVG9EZXBlbmRlbmNpZXMgPVxuICAgICAgbmV3IFdlYWtNYXA8SW5qZWN0b3J8TFZpZXcsIFdlYWtNYXA8VHlwZTx1bmtub3duPiwgSW5qZWN0ZWRTZXJ2aWNlW10+PigpO1xuICByZXNvbHZlclRvUHJvdmlkZXJzID0gbmV3IFdlYWtNYXA8SW5qZWN0b3J8VE5vZGUsIFByb3ZpZGVyUmVjb3JkW10+KCk7XG4gIHN0YW5kYWxvbmVJbmplY3RvclRvQ29tcG9uZW50ID0gbmV3IFdlYWtNYXA8SW5qZWN0b3IsIFR5cGU8dW5rbm93bj4+KCk7XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5yZXNvbHZlclRvVG9rZW5Ub0RlcGVuZGVuY2llcyA9XG4gICAgICAgIG5ldyBXZWFrTWFwPEluamVjdG9yfExWaWV3LCBXZWFrTWFwPFR5cGU8dW5rbm93bj4sIEluamVjdGVkU2VydmljZVtdPj4oKTtcbiAgICB0aGlzLnJlc29sdmVyVG9Qcm92aWRlcnMgPSBuZXcgV2Vha01hcDxJbmplY3RvcnxUTm9kZSwgUHJvdmlkZXJSZWNvcmRbXT4oKTtcbiAgICB0aGlzLnN0YW5kYWxvbmVJbmplY3RvclRvQ29tcG9uZW50ID0gbmV3IFdlYWtNYXA8SW5qZWN0b3IsIFR5cGU8dW5rbm93bj4+KCk7XG4gIH1cbn1cblxubGV0IGZyYW1ld29ya0RJRGVidWdEYXRhID0gbmV3IERJRGVidWdEYXRhKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRGcmFtZXdvcmtESURlYnVnRGF0YSgpOiBESURlYnVnRGF0YSB7XG4gIHJldHVybiBmcmFtZXdvcmtESURlYnVnRGF0YTtcbn1cblxuLyoqXG4gKiBJbml0YWxpemUgZGVmYXVsdCBoYW5kbGluZyBvZiBpbmplY3RvciBldmVudHMuIFRoaXMgaGFuZGxpbmcgcGFyc2VzIGV2ZW50c1xuICogYXMgdGhleSBhcmUgZW1pdHRlZCBhbmQgY29uc3RydWN0cyB0aGUgZGF0YSBzdHJ1Y3R1cmVzIG5lY2Vzc2FyeSB0byBzdXBwb3J0XG4gKiBzb21lIG9mIGRlYnVnIEFQSXMuXG4gKlxuICogU2VlIGhhbmRsZUluamVjdEV2ZW50LCBoYW5kbGVDcmVhdGVFdmVudCBhbmQgaGFuZGxlUHJvdmlkZXJDb25maWd1cmVkRXZlbnRcbiAqIGZvciBkZXNjcmlwdGlvbnMgb2YgZWFjaCBoYW5kbGVyXG4gKlxuICogU3VwcG9ydGVkIEFQSXM6XG4gKiAgICAgICAgICAgICAgIC0gZ2V0RGVwZW5kZW5jaWVzRnJvbUluamVjdGFibGVcbiAqICAgICAgICAgICAgICAgLSBnZXRJbmplY3RvclByb3ZpZGVyc1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBGcmFtZXdvcmtJbmplY3RvclByb2ZpbGVyKCk6IHZvaWQge1xuICBmcmFtZXdvcmtESURlYnVnRGF0YS5yZXNldCgpO1xuICBzZXRJbmplY3RvclByb2ZpbGVyKFxuICAgICAgKGluamVjdG9yUHJvZmlsZXJFdmVudCkgPT4gaGFuZGxlSW5qZWN0b3JQcm9maWxlckV2ZW50KGluamVjdG9yUHJvZmlsZXJFdmVudCkpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVJbmplY3RvclByb2ZpbGVyRXZlbnQoaW5qZWN0b3JQcm9maWxlckV2ZW50OiBJbmplY3RvclByb2ZpbGVyRXZlbnQpOiB2b2lkIHtcbiAgY29uc3Qge2NvbnRleHQsIHR5cGV9ID0gaW5qZWN0b3JQcm9maWxlckV2ZW50O1xuXG4gIGlmICh0eXBlID09PSBJbmplY3RvclByb2ZpbGVyRXZlbnRUeXBlLkluamVjdCkge1xuICAgIGhhbmRsZUluamVjdEV2ZW50KGNvbnRleHQsIGluamVjdG9yUHJvZmlsZXJFdmVudC5zZXJ2aWNlKTtcbiAgfSBlbHNlIGlmICh0eXBlID09PSBJbmplY3RvclByb2ZpbGVyRXZlbnRUeXBlLkluc3RhbmNlQ3JlYXRlZEJ5SW5qZWN0b3IpIHtcbiAgICBoYW5kbGVJbnN0YW5jZUNyZWF0ZWRCeUluamVjdG9yRXZlbnQoY29udGV4dCwgaW5qZWN0b3JQcm9maWxlckV2ZW50Lmluc3RhbmNlKTtcbiAgfSBlbHNlIGlmICh0eXBlID09PSBJbmplY3RvclByb2ZpbGVyRXZlbnRUeXBlLlByb3ZpZGVyQ29uZmlndXJlZCkge1xuICAgIGhhbmRsZVByb3ZpZGVyQ29uZmlndXJlZEV2ZW50KGNvbnRleHQsIGluamVjdG9yUHJvZmlsZXJFdmVudC5wcm92aWRlclJlY29yZCk7XG4gIH1cbn1cblxuLyoqXG4gKlxuICogU3RvcmVzIHRoZSBpbmplY3RlZCBzZXJ2aWNlIGluIGZyYW1ld29ya0RJRGVidWdEYXRhLnJlc29sdmVyVG9Ub2tlblRvRGVwZW5kZW5jaWVzXG4gKiBiYXNlZCBvbiBpdCdzIGluamVjdG9yIGFuZCB0b2tlbi5cbiAqXG4gKiBAcGFyYW0gY29udGV4dCBJbmplY3RvclByb2ZpbGVyQ29udGV4dCB0aGUgaW5qZWN0aW9uIGNvbnRleHQgdGhhdCB0aGlzIGV2ZW50IG9jY3VycmVkIGluLlxuICogQHBhcmFtIGRhdGEgSW5qZWN0ZWRTZXJ2aWNlIHRoZSBzZXJ2aWNlIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGluamVjdCBldmVudC5cbiAqXG4gKi9cbmZ1bmN0aW9uIGhhbmRsZUluamVjdEV2ZW50KGNvbnRleHQ6IEluamVjdG9yUHJvZmlsZXJDb250ZXh0LCBkYXRhOiBJbmplY3RlZFNlcnZpY2UpIHtcbiAgY29uc3QgZGlSZXNvbHZlciA9IGdldERJUmVzb2x2ZXIoY29udGV4dC5pbmplY3Rvcik7XG4gIGlmIChkaVJlc29sdmVyID09PSBudWxsKSB7XG4gICAgdGhyb3dFcnJvcignQW4gSW5qZWN0IGV2ZW50IG11c3QgYmUgcnVuIHdpdGhpbiBhbiBpbmplY3Rpb24gY29udGV4dC4nKTtcbiAgfVxuXG4gIGNvbnN0IGRpUmVzb2x2ZXJUb0luc3RhbnRpYXRlZFRva2VuID0gZnJhbWV3b3JrRElEZWJ1Z0RhdGEucmVzb2x2ZXJUb1Rva2VuVG9EZXBlbmRlbmNpZXM7XG5cbiAgaWYgKCFkaVJlc29sdmVyVG9JbnN0YW50aWF0ZWRUb2tlbi5oYXMoZGlSZXNvbHZlcikpIHtcbiAgICBkaVJlc29sdmVyVG9JbnN0YW50aWF0ZWRUb2tlbi5zZXQoZGlSZXNvbHZlciwgbmV3IFdlYWtNYXA8VHlwZTx1bmtub3duPiwgSW5qZWN0ZWRTZXJ2aWNlW10+KCkpO1xuICB9XG5cbiAgLy8gaWYgdG9rZW4gaXMgYSBwcmltaXRpdmUgdHlwZSwgaWdub3JlIHRoaXMgZXZlbnQuIFdlIGRvIHRoaXMgYmVjYXVzZSB3ZSBjYW5ub3Qga2VlcCB0cmFjayBvZlxuICAvLyBub24tcHJpbWl0aXZlIHRva2VucyBpbiBXZWFrTWFwcyBzaW5jZSB0aGV5IGFyZSBub3QgZ2FyYmFnZSBjb2xsZWN0YWJsZS5cbiAgaWYgKCFjYW5CZUhlbGRXZWFrbHkoY29udGV4dC50b2tlbikpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBpbnN0YW50aWF0ZWRUb2tlblRvRGVwZW5kZW5jaWVzID0gZGlSZXNvbHZlclRvSW5zdGFudGlhdGVkVG9rZW4uZ2V0KGRpUmVzb2x2ZXIpITtcbiAgaWYgKCFpbnN0YW50aWF0ZWRUb2tlblRvRGVwZW5kZW5jaWVzLmhhcyhjb250ZXh0LnRva2VuISkpIHtcbiAgICBpbnN0YW50aWF0ZWRUb2tlblRvRGVwZW5kZW5jaWVzLnNldChjb250ZXh0LnRva2VuISwgW10pO1xuICB9XG5cbiAgY29uc3Qge3Rva2VuLCB2YWx1ZSwgZmxhZ3N9ID0gZGF0YTtcblxuICBhc3NlcnREZWZpbmVkKGNvbnRleHQudG9rZW4sICdJbmplY3RvciBwcm9maWxlciBjb250ZXh0IHRva2VuIGlzIHVuZGVmaW5lZC4nKTtcblxuICBjb25zdCBkZXBlbmRlbmNpZXMgPSBpbnN0YW50aWF0ZWRUb2tlblRvRGVwZW5kZW5jaWVzLmdldChjb250ZXh0LnRva2VuKTtcbiAgYXNzZXJ0RGVmaW5lZChkZXBlbmRlbmNpZXMsICdDb3VsZCBub3QgcmVzb2x2ZSBkZXBlbmRlbmNpZXMgZm9yIHRva2VuLicpO1xuXG4gIGlmIChjb250ZXh0LmluamVjdG9yIGluc3RhbmNlb2YgTm9kZUluamVjdG9yKSB7XG4gICAgZGVwZW5kZW5jaWVzLnB1c2goe3Rva2VuLCB2YWx1ZSwgZmxhZ3MsIGluamVjdGVkSW46IGdldE5vZGVJbmplY3RvckNvbnRleHQoY29udGV4dC5pbmplY3Rvcil9KTtcbiAgfSBlbHNlIHtcbiAgICBkZXBlbmRlbmNpZXMucHVzaCh7dG9rZW4sIHZhbHVlLCBmbGFnc30pO1xuICB9XG59XG5cbi8qKlxuICpcbiAqIFJldHVybnMgdGhlIExWaWV3IGFuZCBUTm9kZSBhc3NvY2lhdGVkIHdpdGggYSBOb2RlSW5qZWN0b3IuIFJldHVybnMgdW5kZWZpbmVkIGlmIHRoZSBpbmplY3RvclxuICogaXMgbm90IGEgTm9kZUluamVjdG9yLlxuICpcbiAqIEBwYXJhbSBpbmplY3RvclxuICogQHJldHVybnMge2xWaWV3OiBMVmlldywgdE5vZGU6IFROb2RlfXx1bmRlZmluZWRcbiAqL1xuZnVuY3Rpb24gZ2V0Tm9kZUluamVjdG9yQ29udGV4dChpbmplY3RvcjogSW5qZWN0b3IpOiB7bFZpZXc6IExWaWV3LCB0Tm9kZTogVE5vZGV9fHVuZGVmaW5lZCB7XG4gIGlmICghKGluamVjdG9yIGluc3RhbmNlb2YgTm9kZUluamVjdG9yKSkge1xuICAgIHRocm93RXJyb3IoJ2dldE5vZGVJbmplY3RvckNvbnRleHQgbXVzdCBiZSBjYWxsZWQgd2l0aCBhIE5vZGVJbmplY3RvcicpO1xuICB9XG5cbiAgY29uc3QgbFZpZXcgPSBnZXROb2RlSW5qZWN0b3JMVmlldyhpbmplY3Rvcik7XG4gIGNvbnN0IHROb2RlID0gZ2V0Tm9kZUluamVjdG9yVE5vZGUoaW5qZWN0b3IpO1xuICBpZiAodE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBhc3NlcnRUTm9kZUZvckxWaWV3KHROb2RlLCBsVmlldyk7XG5cbiAgcmV0dXJuIHtsVmlldywgdE5vZGV9O1xufVxuXG4vKipcbiAqXG4gKiBJZiB0aGUgY3JlYXRlZCBpbnN0YW5jZSBpcyBhbiBpbnN0YW5jZSBvZiBhIHN0YW5kYWxvbmUgY29tcG9uZW50LCBtYXBzIHRoZSBpbmplY3RvciB0byB0aGF0XG4gKiBzdGFuZGFsb25lIGNvbXBvbmVudCBpbiBmcmFtZXdvcmtESURlYnVnRGF0YS5zdGFuZGFsb25lSW5qZWN0b3JUb0NvbXBvbmVudFxuICpcbiAqIEBwYXJhbSBjb250ZXh0IEluamVjdG9yUHJvZmlsZXJDb250ZXh0IHRoZSBpbmplY3Rpb24gY29udGV4dCB0aGF0IHRoaXMgZXZlbnQgb2NjdXJyZWQgaW4uXG4gKiBAcGFyYW0gZGF0YSBJbmplY3RvckNyZWF0ZWRJbnN0YW5jZSBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgaW5zdGFuY2UgdGhhdCB3YXMganVzdCBjcmVhdGVkXG4gKlxuICovXG5mdW5jdGlvbiBoYW5kbGVJbnN0YW5jZUNyZWF0ZWRCeUluamVjdG9yRXZlbnQoXG4gICAgY29udGV4dDogSW5qZWN0b3JQcm9maWxlckNvbnRleHQsIGRhdGE6IEluamVjdG9yQ3JlYXRlZEluc3RhbmNlKTogdm9pZCB7XG4gIGNvbnN0IHt2YWx1ZX0gPSBkYXRhO1xuXG4gIGlmIChnZXRESVJlc29sdmVyKGNvbnRleHQuaW5qZWN0b3IpID09PSBudWxsKSB7XG4gICAgdGhyb3dFcnJvcignQW4gSW5qZWN0b3JDcmVhdGVkSW5zdGFuY2UgZXZlbnQgbXVzdCBiZSBydW4gd2l0aGluIGFuIGluamVjdGlvbiBjb250ZXh0LicpO1xuICB9XG5cbiAgLy8gaWYgb3VyIHZhbHVlIGlzIGFuIGluc3RhbmNlIG9mIGEgc3RhbmRhbG9uZSBjb21wb25lbnQsIG1hcCB0aGUgaW5qZWN0b3Igb2YgdGhhdCBzdGFuZGFsb25lXG4gIC8vIGNvbXBvbmVudCB0byB0aGUgY29tcG9uZW50IGNsYXNzLiBPdGhlcndpc2UsIHRoaXMgZXZlbnQgaXMgYSBub29wLlxuICBsZXQgc3RhbmRhbG9uZUNvbXBvbmVudDogVHlwZTx1bmtub3duPnx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgc3RhbmRhbG9uZUNvbXBvbmVudCA9IHZhbHVlPy5jb25zdHJ1Y3RvciBhcyBUeXBlPHVua25vd24+O1xuICB9XG4gIGlmIChzdGFuZGFsb25lQ29tcG9uZW50ID09PSB1bmRlZmluZWQgfHwgIWlzU3RhbmRhbG9uZUNvbXBvbmVudChzdGFuZGFsb25lQ29tcG9uZW50KSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGVudmlyb25tZW50SW5qZWN0b3I6IEVudmlyb25tZW50SW5qZWN0b3J8bnVsbCA9XG4gICAgICBjb250ZXh0LmluamVjdG9yLmdldChFbnZpcm9ubWVudEluamVjdG9yLCBudWxsLCB7b3B0aW9uYWw6IHRydWV9KTtcbiAgLy8gU3RhbmRhbG9uZSBjb21wb25lbnRzIHNob3VsZCBoYXZlIGFuIGVudmlyb25tZW50IGluamVjdG9yLiBJZiBvbmUgY2Fubm90IGJlXG4gIC8vIGZvdW5kIHdlIG1heSBiZSBpbiBhIHRlc3QgY2FzZSBmb3IgbG93IGxldmVsIGZ1bmN0aW9uYWxpdHkgdGhhdCBkaWQgbm90IGV4cGxpY3RseVxuICAvLyBzZXR1cCB0aGlzIGluamVjdG9yLiBJbiB0aG9zZSBjYXNlcywgd2Ugc2ltcGx5IGlnbm9yZSB0aGlzIGV2ZW50LlxuICBpZiAoZW52aXJvbm1lbnRJbmplY3RvciA9PT0gbnVsbCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHtzdGFuZGFsb25lSW5qZWN0b3JUb0NvbXBvbmVudH0gPSBmcmFtZXdvcmtESURlYnVnRGF0YTtcblxuICAvLyBJZiBvdXIgaW5qZWN0b3IgaGFzIGFscmVhZHkgYmVlbiBtYXBwZWQsIGFzIGlzIHRoZSBjYXNlXG4gIC8vIHdoZW4gYSBzdGFuZGFsb25lIGNvbXBvbmVudCBpbXBvcnRzIGFub3RoZXIgc3RhbmRhbG9uZSBjb21wb25lbnQsXG4gIC8vIHdlIGNvbnNpZGVyIHRoZSBvcmlnaW5hbCBjb21wb25lbnQgKHRoZSBjb21wb25lbnQgZG9pbmcgdGhlIGltcG9ydGluZylcbiAgLy8gYXMgdGhlIGNvbXBvbmVudCBjb25uZWN0ZWQgdG8gb3VyIGluamVjdG9yLlxuICBpZiAoc3RhbmRhbG9uZUluamVjdG9yVG9Db21wb25lbnQuaGFzKGVudmlyb25tZW50SW5qZWN0b3IpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIElmIG91ciBpbmplY3RvciBoYXNuJ3QgYmVlbiBtYXBwZWQsIHRoZW4gd2UgbWFwIGl0IHRvIHRoZSBzdGFuZGFsb25lIGNvbXBvbmVudFxuICBzdGFuZGFsb25lSW5qZWN0b3JUb0NvbXBvbmVudC5zZXQoZW52aXJvbm1lbnRJbmplY3Rvciwgc3RhbmRhbG9uZUNvbXBvbmVudCk7XG59XG5cbmZ1bmN0aW9uIGlzU3RhbmRhbG9uZUNvbXBvbmVudCh2YWx1ZTogVHlwZTx1bmtub3duPik6IGJvb2xlYW4ge1xuICBjb25zdCBkZWYgPSBnZXRDb21wb25lbnREZWYodmFsdWUpO1xuICByZXR1cm4gISFkZWY/LnN0YW5kYWxvbmU7XG59XG5cbi8qKlxuICpcbiAqIFN0b3JlcyB0aGUgZW1pdHRlZCBQcm92aWRlclJlY29yZHMgZnJvbSB0aGUgSW5qZWN0b3JQcm9maWxlckV2ZW50VHlwZS5Qcm92aWRlckNvbmZpZ3VyZWRcbiAqIGV2ZW50IGluIGZyYW1ld29ya0RJRGVidWdEYXRhLnJlc29sdmVyVG9Qcm92aWRlcnNcbiAqXG4gKiBAcGFyYW0gY29udGV4dCBJbmplY3RvclByb2ZpbGVyQ29udGV4dCB0aGUgaW5qZWN0aW9uIGNvbnRleHQgdGhhdCB0aGlzIGV2ZW50IG9jY3VycmVkIGluLlxuICogQHBhcmFtIGRhdGEgUHJvdmlkZXJSZWNvcmQgYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGluc3RhbmNlIHRoYXQgd2FzIGp1c3QgY3JlYXRlZFxuICpcbiAqL1xuZnVuY3Rpb24gaGFuZGxlUHJvdmlkZXJDb25maWd1cmVkRXZlbnQoXG4gICAgY29udGV4dDogSW5qZWN0b3JQcm9maWxlckNvbnRleHQsIGRhdGE6IFByb3ZpZGVyUmVjb3JkKTogdm9pZCB7XG4gIGNvbnN0IHtyZXNvbHZlclRvUHJvdmlkZXJzfSA9IGZyYW1ld29ya0RJRGVidWdEYXRhO1xuXG4gIGxldCBkaVJlc29sdmVyOiBJbmplY3RvcnxUTm9kZTtcbiAgaWYgKGNvbnRleHQ/LmluamVjdG9yIGluc3RhbmNlb2YgTm9kZUluamVjdG9yKSB7XG4gICAgZGlSZXNvbHZlciA9IGdldE5vZGVJbmplY3RvclROb2RlKGNvbnRleHQuaW5qZWN0b3IpIGFzIFROb2RlO1xuICB9IGVsc2Uge1xuICAgIGRpUmVzb2x2ZXIgPSBjb250ZXh0LmluamVjdG9yO1xuICB9XG5cbiAgaWYgKGRpUmVzb2x2ZXIgPT09IG51bGwpIHtcbiAgICB0aHJvd0Vycm9yKCdBIFByb3ZpZGVyQ29uZmlndXJlZCBldmVudCBtdXN0IGJlIHJ1biB3aXRoaW4gYW4gaW5qZWN0aW9uIGNvbnRleHQuJyk7XG4gIH1cblxuICBpZiAoIXJlc29sdmVyVG9Qcm92aWRlcnMuaGFzKGRpUmVzb2x2ZXIpKSB7XG4gICAgcmVzb2x2ZXJUb1Byb3ZpZGVycy5zZXQoZGlSZXNvbHZlciwgW10pO1xuICB9XG5cbiAgcmVzb2x2ZXJUb1Byb3ZpZGVycy5nZXQoZGlSZXNvbHZlcikhLnB1c2goZGF0YSk7XG59XG5cbmZ1bmN0aW9uIGdldERJUmVzb2x2ZXIoaW5qZWN0b3I6IEluamVjdG9yfHVuZGVmaW5lZCk6IEluamVjdG9yfExWaWV3fG51bGwge1xuICBsZXQgZGlSZXNvbHZlcjogSW5qZWN0b3J8TFZpZXd8bnVsbCA9IG51bGw7XG5cbiAgaWYgKGluamVjdG9yID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZGlSZXNvbHZlcjtcbiAgfVxuXG4gIC8vIFdlIHVzZSB0aGUgTFZpZXcgYXMgdGhlIGRpUmVzb2x2ZXIgZm9yIE5vZGVJbmplY3RvcnMgYmVjYXVzZSB0aGV5XG4gIC8vIGRvIG5vdCBwZXJzaXN0IGFueXdoZXJlIGluIHRoZSBmcmFtZXdvcmsuIFRoZXkgYXJlIHNpbXBseSB3cmFwcGVycyBhcm91bmQgYW4gTFZpZXcgYW5kIGEgVE5vZGVcbiAgLy8gdGhhdCBkbyBwZXJzaXN0LiBCZWNhdXNlIG9mIHRoaXMsIHdlIHJlbHkgb24gdGhlIExWaWV3IG9mIHRoZSBOb2RlSW5qZWN0b3IgaW4gb3JkZXIgdG8gdXNlXG4gIC8vIGFzIGEgY29uY3JldGUga2V5IHRvIHJlcHJlc2VudCB0aGlzIGluamVjdG9yLiBJZiB3ZSBnZXQgdGhlIHNhbWUgTFZpZXcgYmFjayBsYXRlciwgd2Uga25vd1xuICAvLyB3ZSdyZSBsb29raW5nIGF0IHRoZSBzYW1lIGluamVjdG9yLlxuICBpZiAoaW5qZWN0b3IgaW5zdGFuY2VvZiBOb2RlSW5qZWN0b3IpIHtcbiAgICBkaVJlc29sdmVyID0gZ2V0Tm9kZUluamVjdG9yTFZpZXcoaW5qZWN0b3IpO1xuICB9XG4gIC8vIE90aGVyIGluamVjdG9ycyBjYW4gYmUgdXNlZCBhIGtleXMgZm9yIGEgbWFwIGJlY2F1c2UgdGhlaXIgaW5zdGFuY2VzXG4gIC8vIHBlcnNpc3RcbiAgZWxzZSB7XG4gICAgZGlSZXNvbHZlciA9IGluamVjdG9yO1xuICB9XG5cbiAgcmV0dXJuIGRpUmVzb2x2ZXI7XG59XG5cbi8vIGluc3BpcmVkIGJ5XG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi9tdWx0aXBhZ2UvZXhlY3V0YWJsZS1jb2RlLWFuZC1leGVjdXRpb24tY29udGV4dHMuaHRtbCNzZWMtY2FuYmVoZWxkd2Vha2x5XG5mdW5jdGlvbiBjYW5CZUhlbGRXZWFrbHkodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAvLyB3ZSBjaGVjayBmb3IgdmFsdWUgIT09IG51bGwgaGVyZSBiZWNhdXNlIHR5cGVvZiBudWxsID09PSAnb2JqZWN0XG4gIHJldHVybiB2YWx1ZSAhPT0gbnVsbCAmJlxuICAgICAgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3N5bWJvbCcpO1xufVxuIl19