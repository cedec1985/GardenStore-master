/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { assertInInjectionContext, assertNotInReactiveContext, computed, DestroyRef, inject, signal, ɵRuntimeError } from '@angular/core';
/**
 * Get the current value of an `Observable` as a reactive `Signal`.
 *
 * `toSignal` returns a `Signal` which provides synchronous reactive access to values produced
 * by the given `Observable`, by subscribing to that `Observable`. The returned `Signal` will always
 * have the most recent value emitted by the subscription, and will throw an error if the
 * `Observable` errors.
 *
 * With `requireSync` set to `true`, `toSignal` will assert that the `Observable` produces a value
 * immediately upon subscription. No `initialValue` is needed in this case, and the returned signal
 * does not include an `undefined` type.
 *
 * By default, the subscription will be automatically cleaned up when the current [injection
 * context](/guide/dependency-injection-context) is destroyed. For example, when `toObservable` is
 * called during the construction of a component, the subscription will be cleaned up when the
 * component is destroyed. If an injection context is not available, an explicit `Injector` can be
 * passed instead.
 *
 * If the subscription should persist until the `Observable` itself completes, the `manualCleanup`
 * option can be specified instead, which disables the automatic subscription teardown. No injection
 * context is needed in this configuration as well.
 *
 * @developerPreview
 */
export function toSignal(source, options) {
    ngDevMode &&
        assertNotInReactiveContext(toSignal, 'Invoking `toSignal` causes new subscriptions every time. ' +
            'Consider moving `toSignal` outside of the reactive context and read the signal value where needed.');
    const requiresCleanup = !options?.manualCleanup;
    requiresCleanup && !options?.injector && assertInInjectionContext(toSignal);
    const cleanupRef = requiresCleanup ? options?.injector?.get(DestroyRef) ?? inject(DestroyRef) : null;
    // Note: T is the Observable value type, and U is the initial value type. They don't have to be
    // the same - the returned signal gives values of type `T`.
    let state;
    if (options?.requireSync) {
        // Initially the signal is in a `NoValue` state.
        state = signal({ kind: 0 /* StateKind.NoValue */ });
    }
    else {
        // If an initial value was passed, use it. Otherwise, use `undefined` as the initial value.
        state = signal({ kind: 1 /* StateKind.Value */, value: options?.initialValue });
    }
    // Note: This code cannot run inside a reactive context (see assertion above). If we'd support
    // this, we would subscribe to the observable outside of the current reactive context, avoiding
    // that side-effect signal reads/writes are attribute to the current consumer. The current
    // consumer only needs to be notified when the `state` signal changes through the observable
    // subscription. Additional context (related to async pipe):
    // https://github.com/angular/angular/pull/50522.
    const sub = source.subscribe({
        next: value => state.set({ kind: 1 /* StateKind.Value */, value }),
        error: error => {
            if (options?.rejectErrors) {
                // Kick the error back to RxJS. It will be caught and rethrown in a macrotask, which causes
                // the error to end up as an uncaught exception.
                throw error;
            }
            state.set({ kind: 2 /* StateKind.Error */, error });
        },
        // Completion of the Observable is meaningless to the signal. Signals don't have a concept of
        // "complete".
    });
    if (ngDevMode && options?.requireSync && state().kind === 0 /* StateKind.NoValue */) {
        throw new ɵRuntimeError(601 /* ɵRuntimeErrorCode.REQUIRE_SYNC_WITHOUT_SYNC_EMIT */, '`toSignal()` called with `requireSync` but `Observable` did not emit synchronously.');
    }
    // Unsubscribe when the current context is destroyed, if requested.
    cleanupRef?.onDestroy(sub.unsubscribe.bind(sub));
    // The actual returned signal is a `computed` of the `State` signal, which maps the various states
    // to either values or errors.
    return computed(() => {
        const current = state();
        switch (current.kind) {
            case 1 /* StateKind.Value */:
                return current.value;
            case 2 /* StateKind.Error */:
                throw current.error;
            case 0 /* StateKind.NoValue */:
                // This shouldn't really happen because the error is thrown on creation.
                // TODO(alxhub): use a RuntimeError when we finalize the error semantics
                throw new ɵRuntimeError(601 /* ɵRuntimeErrorCode.REQUIRE_SYNC_WITHOUT_SYNC_EMIT */, '`toSignal()` called with `requireSync` but `Observable` did not emit synchronously.');
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9fc2lnbmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9yeGpzLWludGVyb3Avc3JjL3RvX3NpZ25hbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsd0JBQXdCLEVBQUUsMEJBQTBCLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQVksTUFBTSxFQUEwQixhQUFhLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBeUU3TDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxNQUFNLFVBQVUsUUFBUSxDQUNwQixNQUFxQyxFQUNyQyxPQUE0QztJQUM5QyxTQUFTO1FBQ0wsMEJBQTBCLENBQ3RCLFFBQVEsRUFDUiwyREFBMkQ7WUFDdkQsb0dBQW9HLENBQUMsQ0FBQztJQUVsSCxNQUFNLGVBQWUsR0FBRyxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUM7SUFDaEQsZUFBZSxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsSUFBSSx3QkFBd0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1RSxNQUFNLFVBQVUsR0FDWixlQUFlLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBRXRGLCtGQUErRjtJQUMvRiwyREFBMkQ7SUFDM0QsSUFBSSxLQUFpQyxDQUFDO0lBQ3RDLElBQUksT0FBTyxFQUFFLFdBQVcsRUFBRTtRQUN4QixnREFBZ0Q7UUFDaEQsS0FBSyxHQUFHLE1BQU0sQ0FBQyxFQUFDLElBQUksMkJBQW1CLEVBQUMsQ0FBQyxDQUFDO0tBQzNDO1NBQU07UUFDTCwyRkFBMkY7UUFDM0YsS0FBSyxHQUFHLE1BQU0sQ0FBYSxFQUFDLElBQUkseUJBQWlCLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxZQUFpQixFQUFDLENBQUMsQ0FBQztLQUN4RjtJQUVELDhGQUE4RjtJQUM5RiwrRkFBK0Y7SUFDL0YsMEZBQTBGO0lBQzFGLDRGQUE0RjtJQUM1Riw0REFBNEQ7SUFDNUQsaURBQWlEO0lBQ2pELE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDM0IsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFDLElBQUkseUJBQWlCLEVBQUUsS0FBSyxFQUFDLENBQUM7UUFDeEQsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFO1lBQ2IsSUFBSSxPQUFPLEVBQUUsWUFBWSxFQUFFO2dCQUN6QiwyRkFBMkY7Z0JBQzNGLGdEQUFnRDtnQkFDaEQsTUFBTSxLQUFLLENBQUM7YUFDYjtZQUNELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBQyxJQUFJLHlCQUFpQixFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7UUFDNUMsQ0FBQztRQUNELDZGQUE2RjtRQUM3RixjQUFjO0tBQ2YsQ0FBQyxDQUFDO0lBRUgsSUFBSSxTQUFTLElBQUksT0FBTyxFQUFFLFdBQVcsSUFBSSxLQUFLLEVBQUUsQ0FBQyxJQUFJLDhCQUFzQixFQUFFO1FBQzNFLE1BQU0sSUFBSSxhQUFhLDZEQUVuQixxRkFBcUYsQ0FBQyxDQUFDO0tBQzVGO0lBRUQsbUVBQW1FO0lBQ25FLFVBQVUsRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUVqRCxrR0FBa0c7SUFDbEcsOEJBQThCO0lBQzlCLE9BQU8sUUFBUSxDQUFDLEdBQUcsRUFBRTtRQUNuQixNQUFNLE9BQU8sR0FBRyxLQUFLLEVBQUUsQ0FBQztRQUN4QixRQUFRLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDcEI7Z0JBQ0UsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQ3ZCO2dCQUNFLE1BQU0sT0FBTyxDQUFDLEtBQUssQ0FBQztZQUN0QjtnQkFDRSx3RUFBd0U7Z0JBQ3hFLHdFQUF3RTtnQkFDeEUsTUFBTSxJQUFJLGFBQWEsNkRBRW5CLHFGQUFxRixDQUFDLENBQUM7U0FDOUY7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHthc3NlcnRJbkluamVjdGlvbkNvbnRleHQsIGFzc2VydE5vdEluUmVhY3RpdmVDb250ZXh0LCBjb21wdXRlZCwgRGVzdHJveVJlZiwgaW5qZWN0LCBJbmplY3Rvciwgc2lnbmFsLCBTaWduYWwsIFdyaXRhYmxlU2lnbmFsLCDJtVJ1bnRpbWVFcnJvciwgybVSdW50aW1lRXJyb3JDb2RlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaWJhYmxlfSBmcm9tICdyeGpzJztcblxuLyoqXG4gKiBPcHRpb25zIGZvciBgdG9TaWduYWxgLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUb1NpZ25hbE9wdGlvbnMge1xuICAvKipcbiAgICogSW5pdGlhbCB2YWx1ZSBmb3IgdGhlIHNpZ25hbCBwcm9kdWNlZCBieSBgdG9TaWduYWxgLlxuICAgKlxuICAgKiBUaGlzIHdpbGwgYmUgdGhlIHZhbHVlIG9mIHRoZSBzaWduYWwgdW50aWwgdGhlIG9ic2VydmFibGUgZW1pdHMgaXRzIGZpcnN0IHZhbHVlLlxuICAgKi9cbiAgaW5pdGlhbFZhbHVlPzogdW5rbm93bjtcblxuICAvKipcbiAgICogV2hldGhlciB0byByZXF1aXJlIHRoYXQgdGhlIG9ic2VydmFibGUgZW1pdHMgc3luY2hyb25vdXNseSB3aGVuIGB0b1NpZ25hbGAgc3Vic2NyaWJlcy5cbiAgICpcbiAgICogSWYgdGhpcyBpcyBgdHJ1ZWAsIGB0b1NpZ25hbGAgd2lsbCBhc3NlcnQgdGhhdCB0aGUgb2JzZXJ2YWJsZSBwcm9kdWNlcyBhIHZhbHVlIGltbWVkaWF0ZWx5IHVwb25cbiAgICogc3Vic2NyaXB0aW9uLiBTZXR0aW5nIHRoaXMgb3B0aW9uIHJlbW92ZXMgdGhlIG5lZWQgdG8gZWl0aGVyIGRlYWwgd2l0aCBgdW5kZWZpbmVkYCBpbiB0aGVcbiAgICogc2lnbmFsIHR5cGUgb3IgcHJvdmlkZSBhbiBgaW5pdGlhbFZhbHVlYCwgYXQgdGhlIGNvc3Qgb2YgYSBydW50aW1lIGVycm9yIGlmIHRoaXMgcmVxdWlyZW1lbnQgaXNcbiAgICogbm90IG1ldC5cbiAgICovXG4gIHJlcXVpcmVTeW5jPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogYEluamVjdG9yYCB3aGljaCB3aWxsIHByb3ZpZGUgdGhlIGBEZXN0cm95UmVmYCB1c2VkIHRvIGNsZWFuIHVwIHRoZSBPYnNlcnZhYmxlIHN1YnNjcmlwdGlvbi5cbiAgICpcbiAgICogSWYgdGhpcyBpcyBub3QgcHJvdmlkZWQsIGEgYERlc3Ryb3lSZWZgIHdpbGwgYmUgcmV0cmlldmVkIGZyb20gdGhlIGN1cnJlbnQgW2luamVjdGlvblxuICAgKiBjb250ZXh0XSgvZ3VpZGUvZGVwZW5kZW5jeS1pbmplY3Rpb24tY29udGV4dCksIHVubGVzcyBtYW51YWwgY2xlYW51cCBpcyByZXF1ZXN0ZWQuXG4gICAqL1xuICBpbmplY3Rvcj86IEluamVjdG9yO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBzdWJzY3JpcHRpb24gc2hvdWxkIGJlIGF1dG9tYXRpY2FsbHkgY2xlYW5lZCB1cCAodmlhIGBEZXN0cm95UmVmYCkgd2hlblxuICAgKiBgdG9PYnNlcnZhYmxlYCdzIGNyZWF0aW9uIGNvbnRleHQgaXMgZGVzdHJveWVkLlxuICAgKlxuICAgKiBJZiBtYW51YWwgY2xlYW51cCBpcyBlbmFibGVkLCB0aGVuIGBEZXN0cm95UmVmYCBpcyBub3QgdXNlZCwgYW5kIHRoZSBzdWJzY3JpcHRpb24gd2lsbCBwZXJzaXN0XG4gICAqIHVudGlsIHRoZSBgT2JzZXJ2YWJsZWAgaXRzZWxmIGNvbXBsZXRlcy5cbiAgICovXG4gIG1hbnVhbENsZWFudXA/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIGB0b1NpZ25hbGAgc2hvdWxkIHRocm93IGVycm9ycyBmcm9tIHRoZSBPYnNlcnZhYmxlIGVycm9yIGNoYW5uZWwgYmFjayB0byBSeEpTLCB3aGVyZVxuICAgKiB0aGV5J2xsIGJlIHByb2Nlc3NlZCBhcyB1bmNhdWdodCBleGNlcHRpb25zLlxuICAgKlxuICAgKiBJbiBwcmFjdGljZSwgdGhpcyBtZWFucyB0aGF0IHRoZSBzaWduYWwgcmV0dXJuZWQgYnkgYHRvU2lnbmFsYCB3aWxsIGtlZXAgcmV0dXJuaW5nIHRoZSBsYXN0XG4gICAqIGdvb2QgdmFsdWUgZm9yZXZlciwgYXMgT2JzZXJ2YWJsZXMgd2hpY2ggZXJyb3IgcHJvZHVjZSBubyBmdXJ0aGVyIHZhbHVlcy4gVGhpcyBvcHRpb24gZW11bGF0ZXNcbiAgICogdGhlIGJlaGF2aW9yIG9mIHRoZSBgYXN5bmNgIHBpcGUuXG4gICAqL1xuICByZWplY3RFcnJvcnM/OiBib29sZWFuO1xufVxuXG4vLyBCYXNlIGNhc2U6IG5vIG9wdGlvbnMgLT4gYHVuZGVmaW5lZGAgaW4gdGhlIHJlc3VsdCB0eXBlLlxuZXhwb3J0IGZ1bmN0aW9uIHRvU2lnbmFsPFQ+KHNvdXJjZTogT2JzZXJ2YWJsZTxUPnxTdWJzY3JpYmFibGU8VD4pOiBTaWduYWw8VHx1bmRlZmluZWQ+O1xuLy8gT3B0aW9ucyB3aXRoIGB1bmRlZmluZWRgIGluaXRpYWwgdmFsdWUgYW5kIG5vIGByZXF1aXJlZFN5bmNgIC0+IGB1bmRlZmluZWRgLlxuZXhwb3J0IGZ1bmN0aW9uIHRvU2lnbmFsPFQ+KFxuICAgIHNvdXJjZTogT2JzZXJ2YWJsZTxUPnxTdWJzY3JpYmFibGU8VD4sXG4gICAgb3B0aW9uczogVG9TaWduYWxPcHRpb25zJntpbml0aWFsVmFsdWU/OiB1bmRlZmluZWQsIHJlcXVpcmVTeW5jPzogZmFsc2V9KTogU2lnbmFsPFR8dW5kZWZpbmVkPjtcbi8vIE9wdGlvbnMgd2l0aCBgbnVsbGAgaW5pdGlhbCB2YWx1ZSAtPiBgbnVsbGAuXG5leHBvcnQgZnVuY3Rpb24gdG9TaWduYWw8VD4oXG4gICAgc291cmNlOiBPYnNlcnZhYmxlPFQ+fFN1YnNjcmliYWJsZTxUPixcbiAgICBvcHRpb25zOiBUb1NpZ25hbE9wdGlvbnMme2luaXRpYWxWYWx1ZT86IG51bGwsIHJlcXVpcmVTeW5jPzogZmFsc2V9KTogU2lnbmFsPFR8bnVsbD47XG4vLyBPcHRpb25zIHdpdGggYHVuZGVmaW5lZGAgaW5pdGlhbCB2YWx1ZSBhbmQgYHJlcXVpcmVkU3luY2AgLT4gc3RyaWN0IHJlc3VsdCB0eXBlLlxuZXhwb3J0IGZ1bmN0aW9uIHRvU2lnbmFsPFQ+KFxuICAgIHNvdXJjZTogT2JzZXJ2YWJsZTxUPnxTdWJzY3JpYmFibGU8VD4sXG4gICAgb3B0aW9uczogVG9TaWduYWxPcHRpb25zJntpbml0aWFsVmFsdWU/OiB1bmRlZmluZWQsIHJlcXVpcmVTeW5jOiB0cnVlfSk6IFNpZ25hbDxUPjtcbi8vIE9wdGlvbnMgd2l0aCBhIG1vcmUgc3BlY2lmaWMgaW5pdGlhbCB2YWx1ZSB0eXBlLlxuZXhwb3J0IGZ1bmN0aW9uIHRvU2lnbmFsPFQsIGNvbnN0IFUgZXh0ZW5kcyBUPihcbiAgICBzb3VyY2U6IE9ic2VydmFibGU8VD58U3Vic2NyaWJhYmxlPFQ+LFxuICAgIG9wdGlvbnM6IFRvU2lnbmFsT3B0aW9ucyZ7aW5pdGlhbFZhbHVlOiBVLCByZXF1aXJlU3luYz86IGZhbHNlfSk6IFNpZ25hbDxUfFU+O1xuXG4vKipcbiAqIEdldCB0aGUgY3VycmVudCB2YWx1ZSBvZiBhbiBgT2JzZXJ2YWJsZWAgYXMgYSByZWFjdGl2ZSBgU2lnbmFsYC5cbiAqXG4gKiBgdG9TaWduYWxgIHJldHVybnMgYSBgU2lnbmFsYCB3aGljaCBwcm92aWRlcyBzeW5jaHJvbm91cyByZWFjdGl2ZSBhY2Nlc3MgdG8gdmFsdWVzIHByb2R1Y2VkXG4gKiBieSB0aGUgZ2l2ZW4gYE9ic2VydmFibGVgLCBieSBzdWJzY3JpYmluZyB0byB0aGF0IGBPYnNlcnZhYmxlYC4gVGhlIHJldHVybmVkIGBTaWduYWxgIHdpbGwgYWx3YXlzXG4gKiBoYXZlIHRoZSBtb3N0IHJlY2VudCB2YWx1ZSBlbWl0dGVkIGJ5IHRoZSBzdWJzY3JpcHRpb24sIGFuZCB3aWxsIHRocm93IGFuIGVycm9yIGlmIHRoZVxuICogYE9ic2VydmFibGVgIGVycm9ycy5cbiAqXG4gKiBXaXRoIGByZXF1aXJlU3luY2Agc2V0IHRvIGB0cnVlYCwgYHRvU2lnbmFsYCB3aWxsIGFzc2VydCB0aGF0IHRoZSBgT2JzZXJ2YWJsZWAgcHJvZHVjZXMgYSB2YWx1ZVxuICogaW1tZWRpYXRlbHkgdXBvbiBzdWJzY3JpcHRpb24uIE5vIGBpbml0aWFsVmFsdWVgIGlzIG5lZWRlZCBpbiB0aGlzIGNhc2UsIGFuZCB0aGUgcmV0dXJuZWQgc2lnbmFsXG4gKiBkb2VzIG5vdCBpbmNsdWRlIGFuIGB1bmRlZmluZWRgIHR5cGUuXG4gKlxuICogQnkgZGVmYXVsdCwgdGhlIHN1YnNjcmlwdGlvbiB3aWxsIGJlIGF1dG9tYXRpY2FsbHkgY2xlYW5lZCB1cCB3aGVuIHRoZSBjdXJyZW50IFtpbmplY3Rpb25cbiAqIGNvbnRleHRdKC9ndWlkZS9kZXBlbmRlbmN5LWluamVjdGlvbi1jb250ZXh0KSBpcyBkZXN0cm95ZWQuIEZvciBleGFtcGxlLCB3aGVuIGB0b09ic2VydmFibGVgIGlzXG4gKiBjYWxsZWQgZHVyaW5nIHRoZSBjb25zdHJ1Y3Rpb24gb2YgYSBjb21wb25lbnQsIHRoZSBzdWJzY3JpcHRpb24gd2lsbCBiZSBjbGVhbmVkIHVwIHdoZW4gdGhlXG4gKiBjb21wb25lbnQgaXMgZGVzdHJveWVkLiBJZiBhbiBpbmplY3Rpb24gY29udGV4dCBpcyBub3QgYXZhaWxhYmxlLCBhbiBleHBsaWNpdCBgSW5qZWN0b3JgIGNhbiBiZVxuICogcGFzc2VkIGluc3RlYWQuXG4gKlxuICogSWYgdGhlIHN1YnNjcmlwdGlvbiBzaG91bGQgcGVyc2lzdCB1bnRpbCB0aGUgYE9ic2VydmFibGVgIGl0c2VsZiBjb21wbGV0ZXMsIHRoZSBgbWFudWFsQ2xlYW51cGBcbiAqIG9wdGlvbiBjYW4gYmUgc3BlY2lmaWVkIGluc3RlYWQsIHdoaWNoIGRpc2FibGVzIHRoZSBhdXRvbWF0aWMgc3Vic2NyaXB0aW9uIHRlYXJkb3duLiBObyBpbmplY3Rpb25cbiAqIGNvbnRleHQgaXMgbmVlZGVkIGluIHRoaXMgY29uZmlndXJhdGlvbiBhcyB3ZWxsLlxuICpcbiAqIEBkZXZlbG9wZXJQcmV2aWV3XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b1NpZ25hbDxULCBVID0gdW5kZWZpbmVkPihcbiAgICBzb3VyY2U6IE9ic2VydmFibGU8VD58U3Vic2NyaWJhYmxlPFQ+LFxuICAgIG9wdGlvbnM/OiBUb1NpZ25hbE9wdGlvbnMme2luaXRpYWxWYWx1ZT86IFV9KTogU2lnbmFsPFR8VT4ge1xuICBuZ0Rldk1vZGUgJiZcbiAgICAgIGFzc2VydE5vdEluUmVhY3RpdmVDb250ZXh0KFxuICAgICAgICAgIHRvU2lnbmFsLFxuICAgICAgICAgICdJbnZva2luZyBgdG9TaWduYWxgIGNhdXNlcyBuZXcgc3Vic2NyaXB0aW9ucyBldmVyeSB0aW1lLiAnICtcbiAgICAgICAgICAgICAgJ0NvbnNpZGVyIG1vdmluZyBgdG9TaWduYWxgIG91dHNpZGUgb2YgdGhlIHJlYWN0aXZlIGNvbnRleHQgYW5kIHJlYWQgdGhlIHNpZ25hbCB2YWx1ZSB3aGVyZSBuZWVkZWQuJyk7XG5cbiAgY29uc3QgcmVxdWlyZXNDbGVhbnVwID0gIW9wdGlvbnM/Lm1hbnVhbENsZWFudXA7XG4gIHJlcXVpcmVzQ2xlYW51cCAmJiAhb3B0aW9ucz8uaW5qZWN0b3IgJiYgYXNzZXJ0SW5JbmplY3Rpb25Db250ZXh0KHRvU2lnbmFsKTtcbiAgY29uc3QgY2xlYW51cFJlZiA9XG4gICAgICByZXF1aXJlc0NsZWFudXAgPyBvcHRpb25zPy5pbmplY3Rvcj8uZ2V0KERlc3Ryb3lSZWYpID8/IGluamVjdChEZXN0cm95UmVmKSA6IG51bGw7XG5cbiAgLy8gTm90ZTogVCBpcyB0aGUgT2JzZXJ2YWJsZSB2YWx1ZSB0eXBlLCBhbmQgVSBpcyB0aGUgaW5pdGlhbCB2YWx1ZSB0eXBlLiBUaGV5IGRvbid0IGhhdmUgdG8gYmVcbiAgLy8gdGhlIHNhbWUgLSB0aGUgcmV0dXJuZWQgc2lnbmFsIGdpdmVzIHZhbHVlcyBvZiB0eXBlIGBUYC5cbiAgbGV0IHN0YXRlOiBXcml0YWJsZVNpZ25hbDxTdGF0ZTxUfFU+PjtcbiAgaWYgKG9wdGlvbnM/LnJlcXVpcmVTeW5jKSB7XG4gICAgLy8gSW5pdGlhbGx5IHRoZSBzaWduYWwgaXMgaW4gYSBgTm9WYWx1ZWAgc3RhdGUuXG4gICAgc3RhdGUgPSBzaWduYWwoe2tpbmQ6IFN0YXRlS2luZC5Ob1ZhbHVlfSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gSWYgYW4gaW5pdGlhbCB2YWx1ZSB3YXMgcGFzc2VkLCB1c2UgaXQuIE90aGVyd2lzZSwgdXNlIGB1bmRlZmluZWRgIGFzIHRoZSBpbml0aWFsIHZhbHVlLlxuICAgIHN0YXRlID0gc2lnbmFsPFN0YXRlPFR8VT4+KHtraW5kOiBTdGF0ZUtpbmQuVmFsdWUsIHZhbHVlOiBvcHRpb25zPy5pbml0aWFsVmFsdWUgYXMgVX0pO1xuICB9XG5cbiAgLy8gTm90ZTogVGhpcyBjb2RlIGNhbm5vdCBydW4gaW5zaWRlIGEgcmVhY3RpdmUgY29udGV4dCAoc2VlIGFzc2VydGlvbiBhYm92ZSkuIElmIHdlJ2Qgc3VwcG9ydFxuICAvLyB0aGlzLCB3ZSB3b3VsZCBzdWJzY3JpYmUgdG8gdGhlIG9ic2VydmFibGUgb3V0c2lkZSBvZiB0aGUgY3VycmVudCByZWFjdGl2ZSBjb250ZXh0LCBhdm9pZGluZ1xuICAvLyB0aGF0IHNpZGUtZWZmZWN0IHNpZ25hbCByZWFkcy93cml0ZXMgYXJlIGF0dHJpYnV0ZSB0byB0aGUgY3VycmVudCBjb25zdW1lci4gVGhlIGN1cnJlbnRcbiAgLy8gY29uc3VtZXIgb25seSBuZWVkcyB0byBiZSBub3RpZmllZCB3aGVuIHRoZSBgc3RhdGVgIHNpZ25hbCBjaGFuZ2VzIHRocm91Z2ggdGhlIG9ic2VydmFibGVcbiAgLy8gc3Vic2NyaXB0aW9uLiBBZGRpdGlvbmFsIGNvbnRleHQgKHJlbGF0ZWQgdG8gYXN5bmMgcGlwZSk6XG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvcHVsbC81MDUyMi5cbiAgY29uc3Qgc3ViID0gc291cmNlLnN1YnNjcmliZSh7XG4gICAgbmV4dDogdmFsdWUgPT4gc3RhdGUuc2V0KHtraW5kOiBTdGF0ZUtpbmQuVmFsdWUsIHZhbHVlfSksXG4gICAgZXJyb3I6IGVycm9yID0+IHtcbiAgICAgIGlmIChvcHRpb25zPy5yZWplY3RFcnJvcnMpIHtcbiAgICAgICAgLy8gS2ljayB0aGUgZXJyb3IgYmFjayB0byBSeEpTLiBJdCB3aWxsIGJlIGNhdWdodCBhbmQgcmV0aHJvd24gaW4gYSBtYWNyb3Rhc2ssIHdoaWNoIGNhdXNlc1xuICAgICAgICAvLyB0aGUgZXJyb3IgdG8gZW5kIHVwIGFzIGFuIHVuY2F1Z2h0IGV4Y2VwdGlvbi5cbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG4gICAgICBzdGF0ZS5zZXQoe2tpbmQ6IFN0YXRlS2luZC5FcnJvciwgZXJyb3J9KTtcbiAgICB9LFxuICAgIC8vIENvbXBsZXRpb24gb2YgdGhlIE9ic2VydmFibGUgaXMgbWVhbmluZ2xlc3MgdG8gdGhlIHNpZ25hbC4gU2lnbmFscyBkb24ndCBoYXZlIGEgY29uY2VwdCBvZlxuICAgIC8vIFwiY29tcGxldGVcIi5cbiAgfSk7XG5cbiAgaWYgKG5nRGV2TW9kZSAmJiBvcHRpb25zPy5yZXF1aXJlU3luYyAmJiBzdGF0ZSgpLmtpbmQgPT09IFN0YXRlS2luZC5Ob1ZhbHVlKSB7XG4gICAgdGhyb3cgbmV3IMm1UnVudGltZUVycm9yKFxuICAgICAgICDJtVJ1bnRpbWVFcnJvckNvZGUuUkVRVUlSRV9TWU5DX1dJVEhPVVRfU1lOQ19FTUlULFxuICAgICAgICAnYHRvU2lnbmFsKClgIGNhbGxlZCB3aXRoIGByZXF1aXJlU3luY2AgYnV0IGBPYnNlcnZhYmxlYCBkaWQgbm90IGVtaXQgc3luY2hyb25vdXNseS4nKTtcbiAgfVxuXG4gIC8vIFVuc3Vic2NyaWJlIHdoZW4gdGhlIGN1cnJlbnQgY29udGV4dCBpcyBkZXN0cm95ZWQsIGlmIHJlcXVlc3RlZC5cbiAgY2xlYW51cFJlZj8ub25EZXN0cm95KHN1Yi51bnN1YnNjcmliZS5iaW5kKHN1YikpO1xuXG4gIC8vIFRoZSBhY3R1YWwgcmV0dXJuZWQgc2lnbmFsIGlzIGEgYGNvbXB1dGVkYCBvZiB0aGUgYFN0YXRlYCBzaWduYWwsIHdoaWNoIG1hcHMgdGhlIHZhcmlvdXMgc3RhdGVzXG4gIC8vIHRvIGVpdGhlciB2YWx1ZXMgb3IgZXJyb3JzLlxuICByZXR1cm4gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnQgPSBzdGF0ZSgpO1xuICAgIHN3aXRjaCAoY3VycmVudC5raW5kKSB7XG4gICAgICBjYXNlIFN0YXRlS2luZC5WYWx1ZTpcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQudmFsdWU7XG4gICAgICBjYXNlIFN0YXRlS2luZC5FcnJvcjpcbiAgICAgICAgdGhyb3cgY3VycmVudC5lcnJvcjtcbiAgICAgIGNhc2UgU3RhdGVLaW5kLk5vVmFsdWU6XG4gICAgICAgIC8vIFRoaXMgc2hvdWxkbid0IHJlYWxseSBoYXBwZW4gYmVjYXVzZSB0aGUgZXJyb3IgaXMgdGhyb3duIG9uIGNyZWF0aW9uLlxuICAgICAgICAvLyBUT0RPKGFseGh1Yik6IHVzZSBhIFJ1bnRpbWVFcnJvciB3aGVuIHdlIGZpbmFsaXplIHRoZSBlcnJvciBzZW1hbnRpY3NcbiAgICAgICAgdGhyb3cgbmV3IMm1UnVudGltZUVycm9yKFxuICAgICAgICAgICAgybVSdW50aW1lRXJyb3JDb2RlLlJFUVVJUkVfU1lOQ19XSVRIT1VUX1NZTkNfRU1JVCxcbiAgICAgICAgICAgICdgdG9TaWduYWwoKWAgY2FsbGVkIHdpdGggYHJlcXVpcmVTeW5jYCBidXQgYE9ic2VydmFibGVgIGRpZCBub3QgZW1pdCBzeW5jaHJvbm91c2x5LicpO1xuICAgIH1cbiAgfSk7XG59XG5cbmNvbnN0IGVudW0gU3RhdGVLaW5kIHtcbiAgTm9WYWx1ZSxcbiAgVmFsdWUsXG4gIEVycm9yLFxufVxuXG5pbnRlcmZhY2UgTm9WYWx1ZVN0YXRlIHtcbiAga2luZDogU3RhdGVLaW5kLk5vVmFsdWU7XG59XG5cbmludGVyZmFjZSBWYWx1ZVN0YXRlPFQ+IHtcbiAga2luZDogU3RhdGVLaW5kLlZhbHVlO1xuICB2YWx1ZTogVDtcbn1cblxuaW50ZXJmYWNlIEVycm9yU3RhdGUge1xuICBraW5kOiBTdGF0ZUtpbmQuRXJyb3I7XG4gIGVycm9yOiB1bmtub3duO1xufVxuXG50eXBlIFN0YXRlPFQ+ID0gTm9WYWx1ZVN0YXRlfFZhbHVlU3RhdGU8VD58RXJyb3JTdGF0ZTtcbiJdfQ==