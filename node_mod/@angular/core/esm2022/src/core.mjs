/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point from which you should import all public core APIs.
 */
export * from './metadata';
export * from './version';
export * from './di';
export { createPlatform, assertPlatform, destroyPlatform, getPlatform, PlatformRef, ApplicationRef, provideZoneChangeDetection, createPlatformFactory, NgProbeToken, APP_BOOTSTRAP_LISTENER } from './application_ref';
export { enableProdMode, isDevMode } from './util/is_dev_mode';
export { APP_ID, PACKAGE_ROOT_URL, PLATFORM_INITIALIZER, PLATFORM_ID, ANIMATION_MODULE_TYPE, CSP_NONCE } from './application_tokens';
export { APP_INITIALIZER, ApplicationInitStatus } from './application_init';
export * from './zone';
export * from './render';
export * from './linker';
export * from './linker/ng_module_factory_loader_impl';
export { DebugElement, DebugEventListener, DebugNode, asNativeElements, getDebugNode } from './debug/debug_node';
export { Testability, TestabilityRegistry, setTestabilityGetter } from './testability/testability';
export * from './change_detection';
export * from './platform_core_providers';
export { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID, DEFAULT_CURRENCY_CODE, MissingTranslationStrategy } from './i18n/tokens';
export { ApplicationModule } from './application_module';
export { Type } from './interface/type';
export { EventEmitter } from './event_emitter';
export { ErrorHandler } from './error_handler';
export * from './core_private_export';
export * from './core_render3_private_export';
export * from './core_reactivity_export';
export { SecurityContext } from './sanitization/security';
export { Sanitizer } from './sanitization/sanitizer';
export { createNgModule, createNgModuleRef, createEnvironmentInjector } from './render3/ng_module_ref';
export { createComponent, reflectComponentType } from './render3/component';
export { isStandalone } from './render3/definition';
export { AfterRenderPhase, afterRender, afterNextRender } from './render3/after_render_hooks';
export { mergeApplicationConfig } from './application_config';
export { makeStateKey, TransferState } from './transfer_state';
export { booleanAttribute, numberAttribute } from './util/coercion';
import { global } from './util/global';
if (typeof ngDevMode !== 'undefined' && ngDevMode) {
    // This helper is to give a reasonable error message to people upgrading to v9 that have not yet
    // installed `@angular/localize` in their app.
    // tslint:disable-next-line: no-toplevel-property-access
    global.$localize ??= function () {
        throw new Error('It looks like your application or one of its dependencies is using i18n.\n' +
            'Angular 9 introduced a global `$localize()` function that needs to be loaded.\n' +
            'Please run `ng add @angular/localize` from the Angular CLI.\n' +
            '(For non-CLI projects, add `import \'@angular/localize/init\';` to your `polyfills.ts` file.\n' +
            'For server-side rendering applications add the import to your `main.server.ts` file.)');
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2NvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUg7Ozs7R0FJRztBQUNILGNBQWMsWUFBWSxDQUFDO0FBQzNCLGNBQWMsV0FBVyxDQUFDO0FBRTFCLGNBQWMsTUFBTSxDQUFDO0FBQ3JCLE9BQU8sRUFBQyxjQUFjLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQW1DLFdBQVcsRUFBRSxjQUFjLEVBQUUsMEJBQTBCLEVBQUUscUJBQXFCLEVBQUUsWUFBWSxFQUFFLHNCQUFzQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDdFAsT0FBTyxFQUFDLGNBQWMsRUFBRSxTQUFTLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUM3RCxPQUFPLEVBQUMsTUFBTSxFQUFFLGdCQUFnQixFQUFFLG9CQUFvQixFQUFFLFdBQVcsRUFBRSxxQkFBcUIsRUFBRSxTQUFTLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNuSSxPQUFPLEVBQUMsZUFBZSxFQUFFLHFCQUFxQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDMUUsY0FBYyxRQUFRLENBQUM7QUFDdkIsY0FBYyxVQUFVLENBQUM7QUFDekIsY0FBYyxVQUFVLENBQUM7QUFDekIsY0FBYyx3Q0FBd0MsQ0FBQztBQUN2RCxPQUFPLEVBQUMsWUFBWSxFQUFFLGtCQUFrQixFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQVksTUFBTSxvQkFBb0IsQ0FBQztBQUMxSCxPQUFPLEVBQWlCLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxvQkFBb0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ2pILGNBQWMsb0JBQW9CLENBQUM7QUFDbkMsY0FBYywyQkFBMkIsQ0FBQztBQUMxQyxPQUFPLEVBQUMsWUFBWSxFQUFFLG1CQUFtQixFQUFFLFNBQVMsRUFBRSxxQkFBcUIsRUFBRSwwQkFBMEIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM5SCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RCxPQUFPLEVBQWUsSUFBSSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDcEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxjQUFjLHVCQUF1QixDQUFDO0FBQ3RDLGNBQWMsK0JBQStCLENBQUM7QUFDOUMsY0FBYywwQkFBMEIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDeEQsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxjQUFjLEVBQUUsaUJBQWlCLEVBQUUseUJBQXlCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUNyRyxPQUFPLEVBQUMsZUFBZSxFQUFFLG9CQUFvQixFQUFrQixNQUFNLHFCQUFxQixDQUFDO0FBQzNGLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQXFDLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUNoSSxPQUFPLEVBQW9CLHNCQUFzQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDL0UsT0FBTyxFQUFDLFlBQVksRUFBWSxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUN2RSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsZUFBZSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFbEUsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyQyxJQUFJLE9BQU8sU0FBUyxLQUFLLFdBQVcsSUFBSSxTQUFTLEVBQUU7SUFDakQsZ0dBQWdHO0lBQ2hHLDhDQUE4QztJQUM5Qyx3REFBd0Q7SUFDeEQsTUFBTSxDQUFDLFNBQVMsS0FBSztRQUNuQixNQUFNLElBQUksS0FBSyxDQUNYLDRFQUE0RTtZQUM1RSxpRkFBaUY7WUFDakYsK0RBQStEO1lBQy9ELGdHQUFnRztZQUNoRyx1RkFBdUYsQ0FBQyxDQUFDO0lBQy9GLENBQUMsQ0FBQztDQUNIIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8qKlxuICogQG1vZHVsZVxuICogQGRlc2NyaXB0aW9uXG4gKiBFbnRyeSBwb2ludCBmcm9tIHdoaWNoIHlvdSBzaG91bGQgaW1wb3J0IGFsbCBwdWJsaWMgY29yZSBBUElzLlxuICovXG5leHBvcnQgKiBmcm9tICcuL21ldGFkYXRhJztcbmV4cG9ydCAqIGZyb20gJy4vdmVyc2lvbic7XG5leHBvcnQge1R5cGVEZWNvcmF0b3J9IGZyb20gJy4vdXRpbC9kZWNvcmF0b3JzJztcbmV4cG9ydCAqIGZyb20gJy4vZGknO1xuZXhwb3J0IHtjcmVhdGVQbGF0Zm9ybSwgYXNzZXJ0UGxhdGZvcm0sIGRlc3Ryb3lQbGF0Zm9ybSwgZ2V0UGxhdGZvcm0sIEJvb3RzdHJhcE9wdGlvbnMsIE5nWm9uZU9wdGlvbnMsIFBsYXRmb3JtUmVmLCBBcHBsaWNhdGlvblJlZiwgcHJvdmlkZVpvbmVDaGFuZ2VEZXRlY3Rpb24sIGNyZWF0ZVBsYXRmb3JtRmFjdG9yeSwgTmdQcm9iZVRva2VuLCBBUFBfQk9PVFNUUkFQX0xJU1RFTkVSfSBmcm9tICcuL2FwcGxpY2F0aW9uX3JlZic7XG5leHBvcnQge2VuYWJsZVByb2RNb2RlLCBpc0Rldk1vZGV9IGZyb20gJy4vdXRpbC9pc19kZXZfbW9kZSc7XG5leHBvcnQge0FQUF9JRCwgUEFDS0FHRV9ST09UX1VSTCwgUExBVEZPUk1fSU5JVElBTElaRVIsIFBMQVRGT1JNX0lELCBBTklNQVRJT05fTU9EVUxFX1RZUEUsIENTUF9OT05DRX0gZnJvbSAnLi9hcHBsaWNhdGlvbl90b2tlbnMnO1xuZXhwb3J0IHtBUFBfSU5JVElBTElaRVIsIEFwcGxpY2F0aW9uSW5pdFN0YXR1c30gZnJvbSAnLi9hcHBsaWNhdGlvbl9pbml0JztcbmV4cG9ydCAqIGZyb20gJy4vem9uZSc7XG5leHBvcnQgKiBmcm9tICcuL3JlbmRlcic7XG5leHBvcnQgKiBmcm9tICcuL2xpbmtlcic7XG5leHBvcnQgKiBmcm9tICcuL2xpbmtlci9uZ19tb2R1bGVfZmFjdG9yeV9sb2FkZXJfaW1wbCc7XG5leHBvcnQge0RlYnVnRWxlbWVudCwgRGVidWdFdmVudExpc3RlbmVyLCBEZWJ1Z05vZGUsIGFzTmF0aXZlRWxlbWVudHMsIGdldERlYnVnTm9kZSwgUHJlZGljYXRlfSBmcm9tICcuL2RlYnVnL2RlYnVnX25vZGUnO1xuZXhwb3J0IHtHZXRUZXN0YWJpbGl0eSwgVGVzdGFiaWxpdHksIFRlc3RhYmlsaXR5UmVnaXN0cnksIHNldFRlc3RhYmlsaXR5R2V0dGVyfSBmcm9tICcuL3Rlc3RhYmlsaXR5L3Rlc3RhYmlsaXR5JztcbmV4cG9ydCAqIGZyb20gJy4vY2hhbmdlX2RldGVjdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL3BsYXRmb3JtX2NvcmVfcHJvdmlkZXJzJztcbmV4cG9ydCB7VFJBTlNMQVRJT05TLCBUUkFOU0xBVElPTlNfRk9STUFULCBMT0NBTEVfSUQsIERFRkFVTFRfQ1VSUkVOQ1lfQ09ERSwgTWlzc2luZ1RyYW5zbGF0aW9uU3RyYXRlZ3l9IGZyb20gJy4vaTE4bi90b2tlbnMnO1xuZXhwb3J0IHtBcHBsaWNhdGlvbk1vZHVsZX0gZnJvbSAnLi9hcHBsaWNhdGlvbl9tb2R1bGUnO1xuZXhwb3J0IHtBYnN0cmFjdFR5cGUsIFR5cGV9IGZyb20gJy4vaW50ZXJmYWNlL3R5cGUnO1xuZXhwb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gJy4vZXZlbnRfZW1pdHRlcic7XG5leHBvcnQge0Vycm9ySGFuZGxlcn0gZnJvbSAnLi9lcnJvcl9oYW5kbGVyJztcbmV4cG9ydCAqIGZyb20gJy4vY29yZV9wcml2YXRlX2V4cG9ydCc7XG5leHBvcnQgKiBmcm9tICcuL2NvcmVfcmVuZGVyM19wcml2YXRlX2V4cG9ydCc7XG5leHBvcnQgKiBmcm9tICcuL2NvcmVfcmVhY3Rpdml0eV9leHBvcnQnO1xuZXhwb3J0IHtTZWN1cml0eUNvbnRleHR9IGZyb20gJy4vc2FuaXRpemF0aW9uL3NlY3VyaXR5JztcbmV4cG9ydCB7U2FuaXRpemVyfSBmcm9tICcuL3Nhbml0aXphdGlvbi9zYW5pdGl6ZXInO1xuZXhwb3J0IHtjcmVhdGVOZ01vZHVsZSwgY3JlYXRlTmdNb2R1bGVSZWYsIGNyZWF0ZUVudmlyb25tZW50SW5qZWN0b3J9IGZyb20gJy4vcmVuZGVyMy9uZ19tb2R1bGVfcmVmJztcbmV4cG9ydCB7Y3JlYXRlQ29tcG9uZW50LCByZWZsZWN0Q29tcG9uZW50VHlwZSwgQ29tcG9uZW50TWlycm9yfSBmcm9tICcuL3JlbmRlcjMvY29tcG9uZW50JztcbmV4cG9ydCB7aXNTdGFuZGFsb25lfSBmcm9tICcuL3JlbmRlcjMvZGVmaW5pdGlvbic7XG5leHBvcnQge0FmdGVyUmVuZGVyUmVmLCBBZnRlclJlbmRlck9wdGlvbnMsIEFmdGVyUmVuZGVyUGhhc2UsIGFmdGVyUmVuZGVyLCBhZnRlck5leHRSZW5kZXJ9IGZyb20gJy4vcmVuZGVyMy9hZnRlcl9yZW5kZXJfaG9va3MnO1xuZXhwb3J0IHtBcHBsaWNhdGlvbkNvbmZpZywgbWVyZ2VBcHBsaWNhdGlvbkNvbmZpZ30gZnJvbSAnLi9hcHBsaWNhdGlvbl9jb25maWcnO1xuZXhwb3J0IHttYWtlU3RhdGVLZXksIFN0YXRlS2V5LCBUcmFuc2ZlclN0YXRlfSBmcm9tICcuL3RyYW5zZmVyX3N0YXRlJztcbmV4cG9ydCB7Ym9vbGVhbkF0dHJpYnV0ZSwgbnVtYmVyQXR0cmlidXRlfSBmcm9tICcuL3V0aWwvY29lcmNpb24nO1xuXG5pbXBvcnQge2dsb2JhbH0gZnJvbSAnLi91dGlsL2dsb2JhbCc7XG5pZiAodHlwZW9mIG5nRGV2TW9kZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbmdEZXZNb2RlKSB7XG4gIC8vIFRoaXMgaGVscGVyIGlzIHRvIGdpdmUgYSByZWFzb25hYmxlIGVycm9yIG1lc3NhZ2UgdG8gcGVvcGxlIHVwZ3JhZGluZyB0byB2OSB0aGF0IGhhdmUgbm90IHlldFxuICAvLyBpbnN0YWxsZWQgYEBhbmd1bGFyL2xvY2FsaXplYCBpbiB0aGVpciBhcHAuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tdG9wbGV2ZWwtcHJvcGVydHktYWNjZXNzXG4gIGdsb2JhbC4kbG9jYWxpemUgPz89IGZ1bmN0aW9uKCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0l0IGxvb2tzIGxpa2UgeW91ciBhcHBsaWNhdGlvbiBvciBvbmUgb2YgaXRzIGRlcGVuZGVuY2llcyBpcyB1c2luZyBpMThuLlxcbicgK1xuICAgICAgICAnQW5ndWxhciA5IGludHJvZHVjZWQgYSBnbG9iYWwgYCRsb2NhbGl6ZSgpYCBmdW5jdGlvbiB0aGF0IG5lZWRzIHRvIGJlIGxvYWRlZC5cXG4nICtcbiAgICAgICAgJ1BsZWFzZSBydW4gYG5nIGFkZCBAYW5ndWxhci9sb2NhbGl6ZWAgZnJvbSB0aGUgQW5ndWxhciBDTEkuXFxuJyArXG4gICAgICAgICcoRm9yIG5vbi1DTEkgcHJvamVjdHMsIGFkZCBgaW1wb3J0IFxcJ0Bhbmd1bGFyL2xvY2FsaXplL2luaXRcXCc7YCB0byB5b3VyIGBwb2x5ZmlsbHMudHNgIGZpbGUuXFxuJyArXG4gICAgICAgICdGb3Igc2VydmVyLXNpZGUgcmVuZGVyaW5nIGFwcGxpY2F0aW9ucyBhZGQgdGhlIGltcG9ydCB0byB5b3VyIGBtYWluLnNlcnZlci50c2AgZmlsZS4pJyk7XG4gIH07XG59XG4iXX0=