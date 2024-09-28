/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { setInjectImplementation } from '../di/inject_switch';
import { formatRuntimeError, RuntimeError } from '../errors';
import { setInjectorProfilerContext } from './debug/injector_profiler';
import { getFactoryDef } from './definition_factory';
import { NodeInjector, setIncludeViewProviders } from './di';
import { store, ɵɵdirectiveInject } from './instructions/all';
import { isHostComponentStandalone } from './instructions/element_validation';
import { CONTEXT, DECLARATION_COMPONENT_VIEW, HEADER_OFFSET, TVIEW } from './interfaces/view';
import { pureFunction1Internal, pureFunction2Internal, pureFunction3Internal, pureFunction4Internal, pureFunctionVInternal } from './pure_function';
import { getBindingRoot, getCurrentTNode, getLView, getTView } from './state';
import { load } from './util/view_utils';
/**
 * Create a pipe.
 *
 * @param index Pipe index where the pipe will be stored.
 * @param pipeName The name of the pipe
 * @returns T the instance of the pipe.
 *
 * @codeGenApi
 */
export function ɵɵpipe(index, pipeName) {
    const tView = getTView();
    let pipeDef;
    const adjustedIndex = index + HEADER_OFFSET;
    if (tView.firstCreatePass) {
        // The `getPipeDef` throws if a pipe with a given name is not found
        // (so we use non-null assertion below).
        pipeDef = getPipeDef(pipeName, tView.pipeRegistry);
        tView.data[adjustedIndex] = pipeDef;
        if (pipeDef.onDestroy) {
            (tView.destroyHooks ??= []).push(adjustedIndex, pipeDef.onDestroy);
        }
    }
    else {
        pipeDef = tView.data[adjustedIndex];
    }
    const pipeFactory = pipeDef.factory || (pipeDef.factory = getFactoryDef(pipeDef.type, true));
    let previousInjectorProfilerContext;
    if (ngDevMode) {
        previousInjectorProfilerContext = setInjectorProfilerContext({
            injector: new NodeInjector(getCurrentTNode(), getLView()),
            token: pipeDef.type
        });
    }
    const previousInjectImplementation = setInjectImplementation(ɵɵdirectiveInject);
    try {
        // DI for pipes is supposed to behave like directives when placed on a component
        // host node, which means that we have to disable access to `viewProviders`.
        const previousIncludeViewProviders = setIncludeViewProviders(false);
        const pipeInstance = pipeFactory();
        setIncludeViewProviders(previousIncludeViewProviders);
        store(tView, getLView(), adjustedIndex, pipeInstance);
        return pipeInstance;
    }
    finally {
        // we have to restore the injector implementation in finally, just in case the creation of the
        // pipe throws an error.
        setInjectImplementation(previousInjectImplementation);
        ngDevMode && setInjectorProfilerContext(previousInjectorProfilerContext);
    }
}
/**
 * Searches the pipe registry for a pipe with the given name. If one is found,
 * returns the pipe. Otherwise, an error is thrown because the pipe cannot be resolved.
 *
 * @param name Name of pipe to resolve
 * @param registry Full list of available pipes
 * @returns Matching PipeDef
 */
function getPipeDef(name, registry) {
    if (registry) {
        if (ngDevMode) {
            const pipes = registry.filter(pipe => pipe.name === name);
            // TODO: Throw an error in the next major
            if (pipes.length > 1) {
                console.warn(formatRuntimeError(313 /* RuntimeErrorCode.MULTIPLE_MATCHING_PIPES */, getMultipleMatchingPipesMessage(name)));
            }
        }
        for (let i = registry.length - 1; i >= 0; i--) {
            const pipeDef = registry[i];
            if (name === pipeDef.name) {
                return pipeDef;
            }
        }
    }
    if (ngDevMode) {
        throw new RuntimeError(-302 /* RuntimeErrorCode.PIPE_NOT_FOUND */, getPipeNotFoundErrorMessage(name));
    }
    return;
}
/**
 * Generates a helpful error message for the user when multiple pipes match the name.
 *
 * @param name Name of the pipe
 * @returns The error message
 */
function getMultipleMatchingPipesMessage(name) {
    const lView = getLView();
    const declarationLView = lView[DECLARATION_COMPONENT_VIEW];
    const context = declarationLView[CONTEXT];
    const hostIsStandalone = isHostComponentStandalone(lView);
    const componentInfoMessage = context ? ` in the '${context.constructor.name}' component` : '';
    const verifyMessage = `check ${hostIsStandalone ? '\'@Component.imports\' of this component' :
        'the imports of this module'}`;
    const errorMessage = `Multiple pipes match the name \`${name}\`${componentInfoMessage}. ${verifyMessage}`;
    return errorMessage;
}
/**
 * Generates a helpful error message for the user when a pipe is not found.
 *
 * @param name Name of the missing pipe
 * @returns The error message
 */
function getPipeNotFoundErrorMessage(name) {
    const lView = getLView();
    const declarationLView = lView[DECLARATION_COMPONENT_VIEW];
    const context = declarationLView[CONTEXT];
    const hostIsStandalone = isHostComponentStandalone(lView);
    const componentInfoMessage = context ? ` in the '${context.constructor.name}' component` : '';
    const verifyMessage = `Verify that it is ${hostIsStandalone ? 'included in the \'@Component.imports\' of this component' :
        'declared or imported in this module'}`;
    const errorMessage = `The pipe '${name}' could not be found${componentInfoMessage}. ${verifyMessage}`;
    return errorMessage;
}
/**
 * Invokes a pipe with 1 arguments.
 *
 * This instruction acts as a guard to {@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * @param index Pipe index where the pipe was stored on creation.
 * @param offset the binding offset
 * @param v1 1st argument to {@link PipeTransform#transform}.
 *
 * @codeGenApi
 */
export function ɵɵpipeBind1(index, offset, v1) {
    const adjustedIndex = index + HEADER_OFFSET;
    const lView = getLView();
    const pipeInstance = load(lView, adjustedIndex);
    return isPure(lView, adjustedIndex) ?
        pureFunction1Internal(lView, getBindingRoot(), offset, pipeInstance.transform, v1, pipeInstance) :
        pipeInstance.transform(v1);
}
/**
 * Invokes a pipe with 2 arguments.
 *
 * This instruction acts as a guard to {@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * @param index Pipe index where the pipe was stored on creation.
 * @param slotOffset the offset in the reserved slot space
 * @param v1 1st argument to {@link PipeTransform#transform}.
 * @param v2 2nd argument to {@link PipeTransform#transform}.
 *
 * @codeGenApi
 */
export function ɵɵpipeBind2(index, slotOffset, v1, v2) {
    const adjustedIndex = index + HEADER_OFFSET;
    const lView = getLView();
    const pipeInstance = load(lView, adjustedIndex);
    return isPure(lView, adjustedIndex) ?
        pureFunction2Internal(lView, getBindingRoot(), slotOffset, pipeInstance.transform, v1, v2, pipeInstance) :
        pipeInstance.transform(v1, v2);
}
/**
 * Invokes a pipe with 3 arguments.
 *
 * This instruction acts as a guard to {@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * @param index Pipe index where the pipe was stored on creation.
 * @param slotOffset the offset in the reserved slot space
 * @param v1 1st argument to {@link PipeTransform#transform}.
 * @param v2 2nd argument to {@link PipeTransform#transform}.
 * @param v3 4rd argument to {@link PipeTransform#transform}.
 *
 * @codeGenApi
 */
export function ɵɵpipeBind3(index, slotOffset, v1, v2, v3) {
    const adjustedIndex = index + HEADER_OFFSET;
    const lView = getLView();
    const pipeInstance = load(lView, adjustedIndex);
    return isPure(lView, adjustedIndex) ?
        pureFunction3Internal(lView, getBindingRoot(), slotOffset, pipeInstance.transform, v1, v2, v3, pipeInstance) :
        pipeInstance.transform(v1, v2, v3);
}
/**
 * Invokes a pipe with 4 arguments.
 *
 * This instruction acts as a guard to {@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * @param index Pipe index where the pipe was stored on creation.
 * @param slotOffset the offset in the reserved slot space
 * @param v1 1st argument to {@link PipeTransform#transform}.
 * @param v2 2nd argument to {@link PipeTransform#transform}.
 * @param v3 3rd argument to {@link PipeTransform#transform}.
 * @param v4 4th argument to {@link PipeTransform#transform}.
 *
 * @codeGenApi
 */
export function ɵɵpipeBind4(index, slotOffset, v1, v2, v3, v4) {
    const adjustedIndex = index + HEADER_OFFSET;
    const lView = getLView();
    const pipeInstance = load(lView, adjustedIndex);
    return isPure(lView, adjustedIndex) ? pureFunction4Internal(lView, getBindingRoot(), slotOffset, pipeInstance.transform, v1, v2, v3, v4, pipeInstance) :
        pipeInstance.transform(v1, v2, v3, v4);
}
/**
 * Invokes a pipe with variable number of arguments.
 *
 * This instruction acts as a guard to {@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * @param index Pipe index where the pipe was stored on creation.
 * @param slotOffset the offset in the reserved slot space
 * @param values Array of arguments to pass to {@link PipeTransform#transform} method.
 *
 * @codeGenApi
 */
export function ɵɵpipeBindV(index, slotOffset, values) {
    const adjustedIndex = index + HEADER_OFFSET;
    const lView = getLView();
    const pipeInstance = load(lView, adjustedIndex);
    return isPure(lView, adjustedIndex) ?
        pureFunctionVInternal(lView, getBindingRoot(), slotOffset, pipeInstance.transform, values, pipeInstance) :
        pipeInstance.transform.apply(pipeInstance, values);
}
function isPure(lView, index) {
    return lView[TVIEW].data[index].pure;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvcGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFHSCxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsa0JBQWtCLEVBQUUsWUFBWSxFQUFtQixNQUFNLFdBQVcsQ0FBQztBQUc3RSxPQUFPLEVBQTBCLDBCQUEwQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDOUYsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxZQUFZLEVBQUUsdUJBQXVCLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDM0QsT0FBTyxFQUFDLEtBQUssRUFBRSxpQkFBaUIsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzVELE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBRzVFLE9BQU8sRUFBQyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsYUFBYSxFQUFTLEtBQUssRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ25HLE9BQU8sRUFBQyxxQkFBcUIsRUFBRSxxQkFBcUIsRUFBRSxxQkFBcUIsRUFBRSxxQkFBcUIsRUFBRSxxQkFBcUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ2xKLE9BQU8sRUFBQyxjQUFjLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDNUUsT0FBTyxFQUFDLElBQUksRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBSXZDOzs7Ozs7OztHQVFHO0FBQ0gsTUFBTSxVQUFVLE1BQU0sQ0FBQyxLQUFhLEVBQUUsUUFBZ0I7SUFDcEQsTUFBTSxLQUFLLEdBQUcsUUFBUSxFQUFFLENBQUM7SUFDekIsSUFBSSxPQUFxQixDQUFDO0lBQzFCLE1B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QUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQzNELFlBQVksQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDL0UsQ0FBQztBQUVEOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsTUFBTSxVQUFVLFdBQVcsQ0FBQyxLQUFhLEVBQUUsVUFBa0IsRUFBRSxNQUF1QjtJQUNwRixNQUFNLGFBQWEsR0FBRyxLQUFLLEdBQUcsYUFBYSxDQUFDO0lBQzVDLE1BQU0sS0FBSyxHQUFHLFFBQVEsRUFBRSxDQUFDO0lBQ3pCLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBZ0IsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQy9ELE9BQU8sTUFBTSxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLHFCQUFxQixDQUNqQixLQUFLLEVBQUUsY0FBYyxFQUFFLEVBQUUsVUFBVSxFQUFFLFlBQVksQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFDeEYsWUFBWSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3pELENBQUM7QUFFRCxTQUFTLE1BQU0sQ0FBQyxLQUFZLEVBQUUsS0FBYTtJQUN6QyxPQUFzQixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBRSxDQUFDLElBQUksQ0FBQztBQUN2RCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7UGlwZVRyYW5zZm9ybX0gZnJvbSAnLi4vY2hhbmdlX2RldGVjdGlvbi9waXBlX3RyYW5zZm9ybSc7XG5pbXBvcnQge3NldEluamVjdEltcGxlbWVudGF0aW9ufSBmcm9tICcuLi9kaS9pbmplY3Rfc3dpdGNoJztcbmltcG9ydCB7Zm9ybWF0UnVudGltZUVycm9yLCBSdW50aW1lRXJyb3IsIFJ1bnRpbWVFcnJvckNvZGV9IGZyb20gJy4uL2Vycm9ycyc7XG5pbXBvcnQge1R5cGV9IGZyb20gJy4uL2ludGVyZmFjZS90eXBlJztcblxuaW1wb3J0IHtJbmplY3RvclByb2ZpbGVyQ29udGV4dCwgc2V0SW5qZWN0b3JQcm9maWxlckNvbnRleHR9IGZyb20gJy4vZGVidWcvaW5qZWN0b3JfcHJvZmlsZXInO1xuaW1wb3J0IHtnZXRGYWN0b3J5RGVmfSBmcm9tICcuL2RlZmluaXRpb25fZmFjdG9yeSc7XG5pbXBvcnQge05vZGVJbmplY3Rvciwgc2V0SW5jbHVkZVZpZXdQcm92aWRlcnN9IGZyb20gJy4vZGknO1xuaW1wb3J0IHtzdG9yZSwgybXJtWRpcmVjdGl2ZUluamVjdH0gZnJvbSAnLi9pbnN0cnVjdGlvbnMvYWxsJztcbmltcG9ydCB7aXNIb3N0Q29tcG9uZW50U3RhbmRhbG9uZX0gZnJvbSAnLi9pbnN0cnVjdGlvbnMvZWxlbWVudF92YWxpZGF0aW9uJztcbmltcG9ydCB7UGlwZURlZiwgUGlwZURlZkxpc3R9IGZyb20gJy4vaW50ZXJmYWNlcy9kZWZpbml0aW9uJztcbmltcG9ydCB7VFRleHROb2RlfSBmcm9tICcuL2ludGVyZmFjZXMvbm9kZSc7XG5pbXBvcnQge0NPTlRFWFQsIERFQ0xBUkFUSU9OX0NPTVBPTkVOVF9WSUVXLCBIRUFERVJfT0ZGU0VULCBMVmlldywgVFZJRVd9IGZyb20gJy4vaW50ZXJmYWNlcy92aWV3JztcbmltcG9ydCB7cHVyZUZ1bmN0aW9uMUludGVybmFsLCBwdXJlRnVuY3Rpb24ySW50ZXJuYWwsIHB1cmVGdW5jdGlvbjNJbnRlcm5hbCwgcHVyZUZ1bmN0aW9uNEludGVybmFsLCBwdXJlRnVuY3Rpb25WSW50ZXJuYWx9IGZyb20gJy4vcHVyZV9mdW5jdGlvbic7XG5pbXBvcnQge2dldEJpbmRpbmdSb290LCBnZXRDdXJyZW50VE5vZGUsIGdldExWaWV3LCBnZXRUVmlld30gZnJvbSAnLi9zdGF0ZSc7XG5pbXBvcnQge2xvYWR9IGZyb20gJy4vdXRpbC92aWV3X3V0aWxzJztcblxuXG5cbi8qKlxuICogQ3JlYXRlIGEgcGlwZS5cbiAqXG4gKiBAcGFyYW0gaW5kZXggUGlwZSBpbmRleCB3aGVyZSB0aGUgcGlwZSB3aWxsIGJlIHN0b3JlZC5cbiAqIEBwYXJhbSBwaXBlTmFtZSBUaGUgbmFtZSBvZiB0aGUgcGlwZVxuICogQHJldHVybnMgVCB0aGUgaW5zdGFuY2Ugb2YgdGhlIHBpcGUuXG4gKlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVwaXBlKGluZGV4OiBudW1iZXIsIHBpcGVOYW1lOiBzdHJpbmcpOiBhbnkge1xuICBjb25zdCB0VmlldyA9IGdldFRWaWV3KCk7XG4gIGxldCBwaXBlRGVmOiBQaXBlRGVmPGFueT47XG4gIGNvbnN0IGFkanVzdGVkSW5kZXggPSBpbmRleCArIEhFQURFUl9PRkZTRVQ7XG5cbiAgaWYgKHRWaWV3LmZpcnN0Q3JlYXRlUGFzcykge1xuICAgIC8vIFRoZSBgZ2V0UGlwZURlZmAgdGhyb3dzIGlmIGEgcGlwZSB3aXRoIGEgZ2l2ZW4gbmFtZSBpcyBub3QgZm91bmRcbiAgICAvLyAoc28gd2UgdXNlIG5vbi1udWxsIGFzc2VydGlvbiBiZWxvdykuXG4gICAgcGlwZURlZiA9IGdldFBpcGVEZWYocGlwZU5hbWUsIHRWaWV3LnBpcGVSZWdpc3RyeSkhO1xuICAgIHRWaWV3LmRhdGFbYWRqdXN0ZWRJbmRleF0gPSBwaXBlRGVmO1xuICAgIGlmIChwaXBlRGVmLm9uRGVzdHJveSkge1xuICAgICAgKHRWaWV3LmRlc3Ryb3lIb29rcyA/Pz0gW10pLnB1c2goYWRqdXN0ZWRJbmRleCwgcGlwZURlZi5vbkRlc3Ryb3kpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBwaXBlRGVmID0gdFZpZXcuZGF0YVthZGp1c3RlZEluZGV4XSBhcyBQaXBlRGVmPGFueT47XG4gIH1cblxuICBjb25zdCBwaXBlRmFjdG9yeSA9IHBpcGVEZWYuZmFjdG9yeSB8fCAocGlwZURlZi5mYWN0b3J5ID0gZ2V0RmFjdG9yeURlZihwaXBlRGVmLnR5cGUsIHRydWUpKTtcblxuICBsZXQgcHJldmlvdXNJbmplY3RvclByb2ZpbGVyQ29udGV4dDogSW5qZWN0b3JQcm9maWxlckNvbnRleHQ7XG4gIGlmIChuZ0Rldk1vZGUpIHtcbiAgICBwcmV2aW91c0luamVjdG9yUHJvZmlsZXJDb250ZXh0ID0gc2V0SW5qZWN0b3JQcm9maWxlckNvbnRleHQoe1xuICAgICAgaW5qZWN0b3I6IG5ldyBOb2RlSW5qZWN0b3IoZ2V0Q3VycmVudFROb2RlKCkgYXMgVFRleHROb2RlLCBnZXRMVmlldygpKSxcbiAgICAgIHRva2VuOiBwaXBlRGVmLnR5cGVcbiAgICB9KTtcbiAgfVxuICBjb25zdCBwcmV2aW91c0luamVjdEltcGxlbWVudGF0aW9uID0gc2V0SW5qZWN0SW1wbGVtZW50YXRpb24oybXJtWRpcmVjdGl2ZUluamVjdCk7XG4gIHRyeSB7XG4gICAgLy8gREkgZm9yIHBpcGVzIGlzIHN1cHBvc2VkIHRvIGJlaGF2ZSBsaWtlIGRpcmVjdGl2ZXMgd2hlbiBwbGFjZWQgb24gYSBjb21wb25lbnRcbiAgICAvLyBob3N0IG5vZGUsIHdoaWNoIG1lYW5zIHRoYXQgd2UgaGF2ZSB0byBkaXNhYmxlIGFjY2VzcyB0byBgdmlld1Byb3ZpZGVyc2AuXG4gICAgY29uc3QgcHJldmlvdXNJbmNsdWRlVmlld1Byb3ZpZGVycyA9IHNldEluY2x1ZGVWaWV3UHJvdmlkZXJzKGZhbHNlKTtcbiAgICBjb25zdCBwaXBlSW5zdGFuY2UgPSBwaXBlRmFjdG9yeSgpO1xuICAgIHNldEluY2x1ZGVWaWV3UHJvdmlkZXJzKHByZXZpb3VzSW5jbHVkZVZpZXdQcm92aWRlcnMpO1xuICAgIHN0b3JlKHRWaWV3LCBnZXRMVmlldygpLCBhZGp1c3RlZEluZGV4LCBwaXBlSW5zdGFuY2UpO1xuICAgIHJldHVybiBwaXBlSW5zdGFuY2U7XG4gIH0gZmluYWxseSB7XG4gICAgLy8gd2UgaGF2ZSB0byByZXN0b3JlIHRoZSBpbmplY3RvciBpbXBsZW1lbnRhdGlvbiBpbiBmaW5hbGx5LCBqdXN0IGluIGNhc2UgdGhlIGNyZWF0aW9uIG9mIHRoZVxuICAgIC8vIHBpcGUgdGhyb3dzIGFuIGVycm9yLlxuICAgIHNldEluamVjdEltcGxlbWVudGF0aW9uKHByZXZpb3VzSW5qZWN0SW1wbGVtZW50YXRpb24pO1xuICAgIG5nRGV2TW9kZSAmJiBzZXRJbmplY3RvclByb2ZpbGVyQ29udGV4dChwcmV2aW91c0luamVjdG9yUHJvZmlsZXJDb250ZXh0ISk7XG4gIH1cbn1cblxuLyoqXG4gKiBTZWFyY2hlcyB0aGUgcGlwZSByZWdpc3RyeSBmb3IgYSBwaXBlIHdpdGggdGhlIGdpdmVuIG5hbWUuIElmIG9uZSBpcyBmb3VuZCxcbiAqIHJldHVybnMgdGhlIHBpcGUuIE90aGVyd2lzZSwgYW4gZXJyb3IgaXMgdGhyb3duIGJlY2F1c2UgdGhlIHBpcGUgY2Fubm90IGJlIHJlc29sdmVkLlxuICpcbiAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgcGlwZSB0byByZXNvbHZlXG4gKiBAcGFyYW0gcmVnaXN0cnkgRnVsbCBsaXN0IG9mIGF2YWlsYWJsZSBwaXBlc1xuICogQHJldHVybnMgTWF0Y2hpbmcgUGlwZURlZlxuICovXG5mdW5jdGlvbiBnZXRQaXBlRGVmKG5hbWU6IHN0cmluZywgcmVnaXN0cnk6IFBpcGVEZWZMaXN0fG51bGwpOiBQaXBlRGVmPGFueT58dW5kZWZpbmVkIHtcbiAgaWYgKHJlZ2lzdHJ5KSB7XG4gICAgaWYgKG5nRGV2TW9kZSkge1xuICAgICAgY29uc3QgcGlwZXMgPSByZWdpc3RyeS5maWx0ZXIocGlwZSA9PiBwaXBlLm5hbWUgPT09IG5hbWUpO1xuICAgICAgLy8gVE9ETzogVGhyb3cgYW4gZXJyb3IgaW4gdGhlIG5leHQgbWFqb3JcbiAgICAgIGlmIChwaXBlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGNvbnNvbGUud2Fybihmb3JtYXRSdW50aW1lRXJyb3IoXG4gICAgICAgICAgICBSdW50aW1lRXJyb3JDb2RlLk1VTFRJUExFX01BVENISU5HX1BJUEVTLCBnZXRNdWx0aXBsZU1hdGNoaW5nUGlwZXNNZXNzYWdlKG5hbWUpKSk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSByZWdpc3RyeS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgY29uc3QgcGlwZURlZiA9IHJlZ2lzdHJ5W2ldO1xuICAgICAgaWYgKG5hbWUgPT09IHBpcGVEZWYubmFtZSkge1xuICAgICAgICByZXR1cm4gcGlwZURlZjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKG5nRGV2TW9kZSkge1xuICAgIHRocm93IG5ldyBSdW50aW1lRXJyb3IoUnVudGltZUVycm9yQ29kZS5QSVBFX05PVF9GT1VORCwgZ2V0UGlwZU5vdEZvdW5kRXJyb3JNZXNzYWdlKG5hbWUpKTtcbiAgfVxuICByZXR1cm47XG59XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgaGVscGZ1bCBlcnJvciBtZXNzYWdlIGZvciB0aGUgdXNlciB3aGVuIG11bHRpcGxlIHBpcGVzIG1hdGNoIHRoZSBuYW1lLlxuICpcbiAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIHBpcGVcbiAqIEByZXR1cm5zIFRoZSBlcnJvciBtZXNzYWdlXG4gKi9cbmZ1bmN0aW9uIGdldE11bHRpcGxlTWF0Y2hpbmdQaXBlc01lc3NhZ2UobmFtZTogc3RyaW5nKSB7XG4gIGNvbnN0IGxWaWV3ID0gZ2V0TFZpZXcoKTtcbiAgY29uc3QgZGVjbGFyYXRpb25MVmlldyA9IGxWaWV3W0RFQ0xBUkFUSU9OX0NPTVBPTkVOVF9WSUVXXSBhcyBMVmlldzxUeXBlPHVua25vd24+PjtcbiAgY29uc3QgY29udGV4dCA9IGRlY2xhcmF0aW9uTFZpZXdbQ09OVEVYVF07XG4gIGNvbnN0IGhvc3RJc1N0YW5kYWxvbmUgPSBpc0hvc3RDb21wb25lbnRTdGFuZGFsb25lKGxWaWV3KTtcbiAgY29uc3QgY29tcG9uZW50SW5mb01lc3NhZ2UgPSBjb250ZXh0ID8gYCBpbiB0aGUgJyR7Y29udGV4dC5jb25zdHJ1Y3Rvci5uYW1lfScgY29tcG9uZW50YCA6ICcnO1xuICBjb25zdCB2ZXJpZnlNZXNzYWdlID0gYGNoZWNrICR7XG4gICAgICBob3N0SXNTdGFuZGFsb25lID8gJ1xcJ0BDb21wb25lbnQuaW1wb3J0c1xcJyBvZiB0aGlzIGNvbXBvbmVudCcgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICd0aGUgaW1wb3J0cyBvZiB0aGlzIG1vZHVsZSd9YDtcbiAgY29uc3QgZXJyb3JNZXNzYWdlID1cbiAgICAgIGBNdWx0aXBsZSBwaXBlcyBtYXRjaCB0aGUgbmFtZSBcXGAke25hbWV9XFxgJHtjb21wb25lbnRJbmZvTWVzc2FnZX0uICR7dmVyaWZ5TWVzc2FnZX1gO1xuICByZXR1cm4gZXJyb3JNZXNzYWdlO1xufVxuXG4vKipcbiAqIEdlbmVyYXRlcyBhIGhlbHBmdWwgZXJyb3IgbWVzc2FnZSBmb3IgdGhlIHVzZXIgd2hlbiBhIHBpcGUgaXMgbm90IGZvdW5kLlxuICpcbiAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIG1pc3NpbmcgcGlwZVxuICogQHJldHVybnMgVGhlIGVycm9yIG1lc3NhZ2VcbiAqL1xuZnVuY3Rpb24gZ2V0UGlwZU5vdEZvdW5kRXJyb3JNZXNzYWdlKG5hbWU6IHN0cmluZykge1xuICBjb25zdCBsVmlldyA9IGdldExWaWV3KCk7XG4gIGNvbnN0IGRlY2xhcmF0aW9uTFZpZXcgPSBsVmlld1tERUNMQVJBVElPTl9DT01QT05FTlRfVklFV10gYXMgTFZpZXc8VHlwZTx1bmtub3duPj47XG4gIGNvbnN0IGNvbnRleHQgPSBkZWNsYXJhdGlvbkxWaWV3W0NPTlRFWFRdO1xuICBjb25zdCBob3N0SXNTdGFuZGFsb25lID0gaXNIb3N0Q29tcG9uZW50U3RhbmRhbG9uZShsVmlldyk7XG4gIGNvbnN0IGNvbXBvbmVudEluZm9NZXNzYWdlID0gY29udGV4dCA/IGAgaW4gdGhlICcke2NvbnRleHQuY29uc3RydWN0b3IubmFtZX0nIGNvbXBvbmVudGAgOiAnJztcbiAgY29uc3QgdmVyaWZ5TWVzc2FnZSA9IGBWZXJpZnkgdGhhdCBpdCBpcyAke1xuICAgICAgaG9zdElzU3RhbmRhbG9uZSA/ICdpbmNsdWRlZCBpbiB0aGUgXFwnQENvbXBvbmVudC5pbXBvcnRzXFwnIG9mIHRoaXMgY29tcG9uZW50JyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgJ2RlY2xhcmVkIG9yIGltcG9ydGVkIGluIHRoaXMgbW9kdWxlJ31gO1xuICBjb25zdCBlcnJvck1lc3NhZ2UgPVxuICAgICAgYFRoZSBwaXBlICcke25hbWV9JyBjb3VsZCBub3QgYmUgZm91bmQke2NvbXBvbmVudEluZm9NZXNzYWdlfS4gJHt2ZXJpZnlNZXNzYWdlfWA7XG4gIHJldHVybiBlcnJvck1lc3NhZ2U7XG59XG5cbi8qKlxuICogSW52b2tlcyBhIHBpcGUgd2l0aCAxIGFyZ3VtZW50cy5cbiAqXG4gKiBUaGlzIGluc3RydWN0aW9uIGFjdHMgYXMgYSBndWFyZCB0byB7QGxpbmsgUGlwZVRyYW5zZm9ybSN0cmFuc2Zvcm19IGludm9raW5nXG4gKiB0aGUgcGlwZSBvbmx5IHdoZW4gYW4gaW5wdXQgdG8gdGhlIHBpcGUgY2hhbmdlcy5cbiAqXG4gKiBAcGFyYW0gaW5kZXggUGlwZSBpbmRleCB3aGVyZSB0aGUgcGlwZSB3YXMgc3RvcmVkIG9uIGNyZWF0aW9uLlxuICogQHBhcmFtIG9mZnNldCB0aGUgYmluZGluZyBvZmZzZXRcbiAqIEBwYXJhbSB2MSAxc3QgYXJndW1lbnQgdG8ge0BsaW5rIFBpcGVUcmFuc2Zvcm0jdHJhbnNmb3JtfS5cbiAqXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtXBpcGVCaW5kMShpbmRleDogbnVtYmVyLCBvZmZzZXQ6IG51bWJlciwgdjE6IGFueSk6IGFueSB7XG4gIGNvbnN0IGFkanVzdGVkSW5kZXggPSBpbmRleCArIEhFQURFUl9PRkZTRVQ7XG4gIGNvbnN0IGxWaWV3ID0gZ2V0TFZpZXcoKTtcbiAgY29uc3QgcGlwZUluc3RhbmNlID0gbG9hZDxQaXBlVHJhbnNmb3JtPihsVmlldywgYWRqdXN0ZWRJbmRleCk7XG4gIHJldHVybiBpc1B1cmUobFZpZXcsIGFkanVzdGVkSW5kZXgpID9cbiAgICAgIHB1cmVGdW5jdGlvbjFJbnRlcm5hbChcbiAgICAgICAgICBsVmlldywgZ2V0QmluZGluZ1Jvb3QoKSwgb2Zmc2V0LCBwaXBlSW5zdGFuY2UudHJhbnNmb3JtLCB2MSwgcGlwZUluc3RhbmNlKSA6XG4gICAgICBwaXBlSW5zdGFuY2UudHJhbnNmb3JtKHYxKTtcbn1cblxuLyoqXG4gKiBJbnZva2VzIGEgcGlwZSB3aXRoIDIgYXJndW1lbnRzLlxuICpcbiAqIFRoaXMgaW5zdHJ1Y3Rpb24gYWN0cyBhcyBhIGd1YXJkIHRvIHtAbGluayBQaXBlVHJhbnNmb3JtI3RyYW5zZm9ybX0gaW52b2tpbmdcbiAqIHRoZSBwaXBlIG9ubHkgd2hlbiBhbiBpbnB1dCB0byB0aGUgcGlwZSBjaGFuZ2VzLlxuICpcbiAqIEBwYXJhbSBpbmRleCBQaXBlIGluZGV4IHdoZXJlIHRoZSBwaXBlIHdhcyBzdG9yZWQgb24gY3JlYXRpb24uXG4gKiBAcGFyYW0gc2xvdE9mZnNldCB0aGUgb2Zmc2V0IGluIHRoZSByZXNlcnZlZCBzbG90IHNwYWNlXG4gKiBAcGFyYW0gdjEgMXN0IGFyZ3VtZW50IHRvIHtAbGluayBQaXBlVHJhbnNmb3JtI3RyYW5zZm9ybX0uXG4gKiBAcGFyYW0gdjIgMm5kIGFyZ3VtZW50IHRvIHtAbGluayBQaXBlVHJhbnNmb3JtI3RyYW5zZm9ybX0uXG4gKlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVwaXBlQmluZDIoaW5kZXg6IG51bWJlciwgc2xvdE9mZnNldDogbnVtYmVyLCB2MTogYW55LCB2MjogYW55KTogYW55IHtcbiAgY29uc3QgYWRqdXN0ZWRJbmRleCA9IGluZGV4ICsgSEVBREVSX09GRlNFVDtcbiAgY29uc3QgbFZpZXcgPSBnZXRMVmlldygpO1xuICBjb25zdCBwaXBlSW5zdGFuY2UgPSBsb2FkPFBpcGVUcmFuc2Zvcm0+KGxWaWV3LCBhZGp1c3RlZEluZGV4KTtcbiAgcmV0dXJuIGlzUHVyZShsVmlldywgYWRqdXN0ZWRJbmRleCkgP1xuICAgICAgcHVyZUZ1bmN0aW9uMkludGVybmFsKFxuICAgICAgICAgIGxWaWV3LCBnZXRCaW5kaW5nUm9vdCgpLCBzbG90T2Zmc2V0LCBwaXBlSW5zdGFuY2UudHJhbnNmb3JtLCB2MSwgdjIsIHBpcGVJbnN0YW5jZSkgOlxuICAgICAgcGlwZUluc3RhbmNlLnRyYW5zZm9ybSh2MSwgdjIpO1xufVxuXG4vKipcbiAqIEludm9rZXMgYSBwaXBlIHdpdGggMyBhcmd1bWVudHMuXG4gKlxuICogVGhpcyBpbnN0cnVjdGlvbiBhY3RzIGFzIGEgZ3VhcmQgdG8ge0BsaW5rIFBpcGVUcmFuc2Zvcm0jdHJhbnNmb3JtfSBpbnZva2luZ1xuICogdGhlIHBpcGUgb25seSB3aGVuIGFuIGlucHV0IHRvIHRoZSBwaXBlIGNoYW5nZXMuXG4gKlxuICogQHBhcmFtIGluZGV4IFBpcGUgaW5kZXggd2hlcmUgdGhlIHBpcGUgd2FzIHN0b3JlZCBvbiBjcmVhdGlvbi5cbiAqIEBwYXJhbSBzbG90T2Zmc2V0IHRoZSBvZmZzZXQgaW4gdGhlIHJlc2VydmVkIHNsb3Qgc3BhY2VcbiAqIEBwYXJhbSB2MSAxc3QgYXJndW1lbnQgdG8ge0BsaW5rIFBpcGVUcmFuc2Zvcm0jdHJhbnNmb3JtfS5cbiAqIEBwYXJhbSB2MiAybmQgYXJndW1lbnQgdG8ge0BsaW5rIFBpcGVUcmFuc2Zvcm0jdHJhbnNmb3JtfS5cbiAqIEBwYXJhbSB2MyA0cmQgYXJndW1lbnQgdG8ge0BsaW5rIFBpcGVUcmFuc2Zvcm0jdHJhbnNmb3JtfS5cbiAqXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtXBpcGVCaW5kMyhpbmRleDogbnVtYmVyLCBzbG90T2Zmc2V0OiBudW1iZXIsIHYxOiBhbnksIHYyOiBhbnksIHYzOiBhbnkpOiBhbnkge1xuICBjb25zdCBhZGp1c3RlZEluZGV4ID0gaW5kZXggKyBIRUFERVJfT0ZGU0VUO1xuICBjb25zdCBsVmlldyA9IGdldExWaWV3KCk7XG4gIGNvbnN0IHBpcGVJbnN0YW5jZSA9IGxvYWQ8UGlwZVRyYW5zZm9ybT4obFZpZXcsIGFkanVzdGVkSW5kZXgpO1xuICByZXR1cm4gaXNQdXJlKGxWaWV3LCBhZGp1c3RlZEluZGV4KSA/XG4gICAgICBwdXJlRnVuY3Rpb24zSW50ZXJuYWwoXG4gICAgICAgICAgbFZpZXcsIGdldEJpbmRpbmdSb290KCksIHNsb3RPZmZzZXQsIHBpcGVJbnN0YW5jZS50cmFuc2Zvcm0sIHYxLCB2MiwgdjMsIHBpcGVJbnN0YW5jZSkgOlxuICAgICAgcGlwZUluc3RhbmNlLnRyYW5zZm9ybSh2MSwgdjIsIHYzKTtcbn1cblxuLyoqXG4gKiBJbnZva2VzIGEgcGlwZSB3aXRoIDQgYXJndW1lbnRzLlxuICpcbiAqIFRoaXMgaW5zdHJ1Y3Rpb24gYWN0cyBhcyBhIGd1YXJkIHRvIHtAbGluayBQaXBlVHJhbnNmb3JtI3RyYW5zZm9ybX0gaW52b2tpbmdcbiAqIHRoZSBwaXBlIG9ubHkgd2hlbiBhbiBpbnB1dCB0byB0aGUgcGlwZSBjaGFuZ2VzLlxuICpcbiAqIEBwYXJhbSBpbmRleCBQaXBlIGluZGV4IHdoZXJlIHRoZSBwaXBlIHdhcyBzdG9yZWQgb24gY3JlYXRpb24uXG4gKiBAcGFyYW0gc2xvdE9mZnNldCB0aGUgb2Zmc2V0IGluIHRoZSByZXNlcnZlZCBzbG90IHNwYWNlXG4gKiBAcGFyYW0gdjEgMXN0IGFyZ3VtZW50IHRvIHtAbGluayBQaXBlVHJhbnNmb3JtI3RyYW5zZm9ybX0uXG4gKiBAcGFyYW0gdjIgMm5kIGFyZ3VtZW50IHRvIHtAbGluayBQaXBlVHJhbnNmb3JtI3RyYW5zZm9ybX0uXG4gKiBAcGFyYW0gdjMgM3JkIGFyZ3VtZW50IHRvIHtAbGluayBQaXBlVHJhbnNmb3JtI3RyYW5zZm9ybX0uXG4gKiBAcGFyYW0gdjQgNHRoIGFyZ3VtZW50IHRvIHtAbGluayBQaXBlVHJhbnNmb3JtI3RyYW5zZm9ybX0uXG4gKlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVwaXBlQmluZDQoXG4gICAgaW5kZXg6IG51bWJlciwgc2xvdE9mZnNldDogbnVtYmVyLCB2MTogYW55LCB2MjogYW55LCB2MzogYW55LCB2NDogYW55KTogYW55IHtcbiAgY29uc3QgYWRqdXN0ZWRJbmRleCA9IGluZGV4ICsgSEVBREVSX09GRlNFVDtcbiAgY29uc3QgbFZpZXcgPSBnZXRMVmlldygpO1xuICBjb25zdCBwaXBlSW5zdGFuY2UgPSBsb2FkPFBpcGVUcmFuc2Zvcm0+KGxWaWV3LCBhZGp1c3RlZEluZGV4KTtcbiAgcmV0dXJuIGlzUHVyZShsVmlldywgYWRqdXN0ZWRJbmRleCkgPyBwdXJlRnVuY3Rpb240SW50ZXJuYWwoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxWaWV3LCBnZXRCaW5kaW5nUm9vdCgpLCBzbG90T2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaXBlSW5zdGFuY2UudHJhbnNmb3JtLCB2MSwgdjIsIHYzLCB2NCwgcGlwZUluc3RhbmNlKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGlwZUluc3RhbmNlLnRyYW5zZm9ybSh2MSwgdjIsIHYzLCB2NCk7XG59XG5cbi8qKlxuICogSW52b2tlcyBhIHBpcGUgd2l0aCB2YXJpYWJsZSBudW1iZXIgb2YgYXJndW1lbnRzLlxuICpcbiAqIFRoaXMgaW5zdHJ1Y3Rpb24gYWN0cyBhcyBhIGd1YXJkIHRvIHtAbGluayBQaXBlVHJhbnNmb3JtI3RyYW5zZm9ybX0gaW52b2tpbmdcbiAqIHRoZSBwaXBlIG9ubHkgd2hlbiBhbiBpbnB1dCB0byB0aGUgcGlwZSBjaGFuZ2VzLlxuICpcbiAqIEBwYXJhbSBpbmRleCBQaXBlIGluZGV4IHdoZXJlIHRoZSBwaXBlIHdhcyBzdG9yZWQgb24gY3JlYXRpb24uXG4gKiBAcGFyYW0gc2xvdE9mZnNldCB0aGUgb2Zmc2V0IGluIHRoZSByZXNlcnZlZCBzbG90IHNwYWNlXG4gKiBAcGFyYW0gdmFsdWVzIEFycmF5IG9mIGFyZ3VtZW50cyB0byBwYXNzIHRvIHtAbGluayBQaXBlVHJhbnNmb3JtI3RyYW5zZm9ybX0gbWV0aG9kLlxuICpcbiAqIEBjb2RlR2VuQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtcm1cGlwZUJpbmRWKGluZGV4OiBudW1iZXIsIHNsb3RPZmZzZXQ6IG51bWJlciwgdmFsdWVzOiBbYW55LCAuLi5hbnlbXV0pOiBhbnkge1xuICBjb25zdCBhZGp1c3RlZEluZGV4ID0gaW5kZXggKyBIRUFERVJfT0ZGU0VUO1xuICBjb25zdCBsVmlldyA9IGdldExWaWV3KCk7XG4gIGNvbnN0IHBpcGVJbnN0YW5jZSA9IGxvYWQ8UGlwZVRyYW5zZm9ybT4obFZpZXcsIGFkanVzdGVkSW5kZXgpO1xuICByZXR1cm4gaXNQdXJlKGxWaWV3LCBhZGp1c3RlZEluZGV4KSA/XG4gICAgICBwdXJlRnVuY3Rpb25WSW50ZXJuYWwoXG4gICAgICAgICAgbFZpZXcsIGdldEJpbmRpbmdSb290KCksIHNsb3RPZmZzZXQsIHBpcGVJbnN0YW5jZS50cmFuc2Zvcm0sIHZhbHVlcywgcGlwZUluc3RhbmNlKSA6XG4gICAgICBwaXBlSW5zdGFuY2UudHJhbnNmb3JtLmFwcGx5KHBpcGVJbnN0YW5jZSwgdmFsdWVzKTtcbn1cblxuZnVuY3Rpb24gaXNQdXJlKGxWaWV3OiBMVmlldywgaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICByZXR1cm4gKDxQaXBlRGVmPGFueT4+bFZpZXdbVFZJRVddLmRhdGFbaW5kZXhdKS5wdXJlO1xufVxuIl19