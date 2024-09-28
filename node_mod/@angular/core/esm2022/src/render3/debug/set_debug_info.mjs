/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { getComponentDef } from '../definition';
/**
 * Sets the debug info for an Angular class.
 *
 * This runtime is guarded by ngDevMode flag.
 */
export function ɵsetClassDebugInfo(type, debugInfo) {
    const def = getComponentDef(type);
    if (def !== null) {
        def.debugInfo = debugInfo;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0X2RlYnVnX2luZm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL2RlYnVnL3NldF9kZWJ1Z19pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUdILE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFHOUM7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxJQUFlLEVBQUUsU0FBeUI7SUFDM0UsTUFBTSxHQUFHLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLElBQUksR0FBRyxLQUFLLElBQUksRUFBRTtRQUNoQixHQUFHLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztLQUMzQjtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtUeXBlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvdHlwZSc7XG5pbXBvcnQge2dldENvbXBvbmVudERlZn0gZnJvbSAnLi4vZGVmaW5pdGlvbic7XG5pbXBvcnQge0NsYXNzRGVidWdJbmZvfSBmcm9tICcuLi9pbnRlcmZhY2VzL2RlZmluaXRpb24nO1xuXG4vKipcbiAqIFNldHMgdGhlIGRlYnVnIGluZm8gZm9yIGFuIEFuZ3VsYXIgY2xhc3MuXG4gKlxuICogVGhpcyBydW50aW1lIGlzIGd1YXJkZWQgYnkgbmdEZXZNb2RlIGZsYWcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtXNldENsYXNzRGVidWdJbmZvKHR5cGU6IFR5cGU8YW55PiwgZGVidWdJbmZvOiBDbGFzc0RlYnVnSW5mbyk6IHZvaWQge1xuICBjb25zdCBkZWYgPSBnZXRDb21wb25lbnREZWYodHlwZSk7XG4gIGlmIChkZWYgIT09IG51bGwpIHtcbiAgICBkZWYuZGVidWdJbmZvID0gZGVidWdJbmZvO1xuICB9XG59XG4iXX0=