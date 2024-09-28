/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * This class wraps the platform Navigation API which allows server-specific and test
 * implementations.
 */
export class PlatformNavigation {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.6", ngImport: i0, type: PlatformNavigation, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.6", ngImport: i0, type: PlatformNavigation, providedIn: 'platform', useFactory: () => window.navigation }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.6", ngImport: i0, type: PlatformNavigation, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'platform', useFactory: () => window.navigation }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fbmF2aWdhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbW1vbi9zcmMvbmF2aWdhdGlvbi9wbGF0Zm9ybV9uYXZpZ2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBRXpDOzs7R0FHRztBQUVILE1BQU0sT0FBZ0Isa0JBQWtCO3lIQUFsQixrQkFBa0I7NkhBQWxCLGtCQUFrQixjQURmLFVBQVUsY0FBYyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVTs7c0dBQ2xELGtCQUFrQjtrQkFEdkMsVUFBVTttQkFBQyxFQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBUaGlzIGNsYXNzIHdyYXBzIHRoZSBwbGF0Zm9ybSBOYXZpZ2F0aW9uIEFQSSB3aGljaCBhbGxvd3Mgc2VydmVyLXNwZWNpZmljIGFuZCB0ZXN0XG4gKiBpbXBsZW1lbnRhdGlvbnMuXG4gKi9cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncGxhdGZvcm0nLCB1c2VGYWN0b3J5OiAoKSA9PiB3aW5kb3cubmF2aWdhdGlvbn0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUGxhdGZvcm1OYXZpZ2F0aW9uIGltcGxlbWVudHMgTmF2aWdhdGlvbiB7XG4gIGFic3RyYWN0IGVudHJpZXMoKTogTmF2aWdhdGlvbkhpc3RvcnlFbnRyeVtdO1xuICBhYnN0cmFjdCBjdXJyZW50RW50cnk6IE5hdmlnYXRpb25IaXN0b3J5RW50cnl8bnVsbDtcbiAgYWJzdHJhY3QgdXBkYXRlQ3VycmVudEVudHJ5KG9wdGlvbnM6IE5hdmlnYXRpb25VcGRhdGVDdXJyZW50RW50cnlPcHRpb25zKTogdm9pZDtcbiAgYWJzdHJhY3QgdHJhbnNpdGlvbjogTmF2aWdhdGlvblRyYW5zaXRpb258bnVsbDtcbiAgYWJzdHJhY3QgY2FuR29CYWNrOiBib29sZWFuO1xuICBhYnN0cmFjdCBjYW5Hb0ZvcndhcmQ6IGJvb2xlYW47XG4gIGFic3RyYWN0IG5hdmlnYXRlKHVybDogc3RyaW5nLCBvcHRpb25zPzogTmF2aWdhdGlvbk5hdmlnYXRlT3B0aW9uc3x1bmRlZmluZWQpOiBOYXZpZ2F0aW9uUmVzdWx0O1xuICBhYnN0cmFjdCByZWxvYWQob3B0aW9ucz86IE5hdmlnYXRpb25SZWxvYWRPcHRpb25zfHVuZGVmaW5lZCk6IE5hdmlnYXRpb25SZXN1bHQ7XG4gIGFic3RyYWN0IHRyYXZlcnNlVG8oa2V5OiBzdHJpbmcsIG9wdGlvbnM/OiBOYXZpZ2F0aW9uT3B0aW9uc3x1bmRlZmluZWQpOiBOYXZpZ2F0aW9uUmVzdWx0O1xuICBhYnN0cmFjdCBiYWNrKG9wdGlvbnM/OiBOYXZpZ2F0aW9uT3B0aW9uc3x1bmRlZmluZWQpOiBOYXZpZ2F0aW9uUmVzdWx0O1xuICBhYnN0cmFjdCBmb3J3YXJkKG9wdGlvbnM/OiBOYXZpZ2F0aW9uT3B0aW9uc3x1bmRlZmluZWQpOiBOYXZpZ2F0aW9uUmVzdWx0O1xuICBhYnN0cmFjdCBvbm5hdmlnYXRlOiAoKHRoaXM6IE5hdmlnYXRpb24sIGV2OiBOYXZpZ2F0ZUV2ZW50KSA9PiBhbnkpfG51bGw7XG4gIGFic3RyYWN0IG9ubmF2aWdhdGVzdWNjZXNzOiAoKHRoaXM6IE5hdmlnYXRpb24sIGV2OiBFdmVudCkgPT4gYW55KXxudWxsO1xuICBhYnN0cmFjdCBvbm5hdmlnYXRlZXJyb3I6ICgodGhpczogTmF2aWdhdGlvbiwgZXY6IEVycm9yRXZlbnQpID0+IGFueSl8bnVsbDtcbiAgYWJzdHJhY3Qgb25jdXJyZW50ZW50cnljaGFuZ2U6XG4gICAgICAoKHRoaXM6IE5hdmlnYXRpb24sIGV2OiBOYXZpZ2F0aW9uQ3VycmVudEVudHJ5Q2hhbmdlRXZlbnQpID0+IGFueSl8bnVsbDtcbiAgYWJzdHJhY3QgYWRkRXZlbnRMaXN0ZW5lcih0eXBlOiB1bmtub3duLCBsaXN0ZW5lcjogdW5rbm93biwgb3B0aW9ucz86IHVua25vd24pOiB2b2lkO1xuICBhYnN0cmFjdCByZW1vdmVFdmVudExpc3RlbmVyKHR5cGU6IHVua25vd24sIGxpc3RlbmVyOiB1bmtub3duLCBvcHRpb25zPzogdW5rbm93bik6IHZvaWQ7XG4gIGFic3RyYWN0IGRpc3BhdGNoRXZlbnQoZXZlbnQ6IEV2ZW50KTogYm9vbGVhbjtcbn1cbiJdfQ==