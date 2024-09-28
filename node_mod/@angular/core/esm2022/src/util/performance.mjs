/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const markedFeatures = new Set();
// tslint:disable:ban
/**
 * A guarded `performance.mark` for feature marking.
 *
 * This method exists because while all supported browser and node.js version supported by Angular
 * support performance.mark API. This is not the case for other environments such as JSDOM and
 * Cloudflare workers.
 */
export function performanceMarkFeature(feature) {
    if (markedFeatures.has(feature)) {
        return;
    }
    markedFeatures.add(feature);
    performance?.mark?.('mark_use_counter', { detail: { feature } });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyZm9ybWFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy91dGlsL3BlcmZvcm1hbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE1BQU0sY0FBYyxHQUFHLElBQUksR0FBRyxFQUFVLENBQUM7QUFFekMscUJBQXFCO0FBQ3JCOzs7Ozs7R0FNRztBQUNILE1BQU0sVUFBVSxzQkFBc0IsQ0FBQyxPQUFlO0lBQ3BELElBQUksY0FBYyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUMvQixPQUFPO0tBQ1I7SUFDRCxjQUFjLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzVCLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxFQUFDLE1BQU0sRUFBRSxFQUFDLE9BQU8sRUFBQyxFQUFDLENBQUMsQ0FBQztBQUMvRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmNvbnN0IG1hcmtlZEZlYXR1cmVzID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cbi8vIHRzbGludDpkaXNhYmxlOmJhblxuLyoqXG4gKiBBIGd1YXJkZWQgYHBlcmZvcm1hbmNlLm1hcmtgIGZvciBmZWF0dXJlIG1hcmtpbmcuXG4gKlxuICogVGhpcyBtZXRob2QgZXhpc3RzIGJlY2F1c2Ugd2hpbGUgYWxsIHN1cHBvcnRlZCBicm93c2VyIGFuZCBub2RlLmpzIHZlcnNpb24gc3VwcG9ydGVkIGJ5IEFuZ3VsYXJcbiAqIHN1cHBvcnQgcGVyZm9ybWFuY2UubWFyayBBUEkuIFRoaXMgaXMgbm90IHRoZSBjYXNlIGZvciBvdGhlciBlbnZpcm9ubWVudHMgc3VjaCBhcyBKU0RPTSBhbmRcbiAqIENsb3VkZmxhcmUgd29ya2Vycy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBlcmZvcm1hbmNlTWFya0ZlYXR1cmUoZmVhdHVyZTogc3RyaW5nKTogdm9pZCB7XG4gIGlmIChtYXJrZWRGZWF0dXJlcy5oYXMoZmVhdHVyZSkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgbWFya2VkRmVhdHVyZXMuYWRkKGZlYXR1cmUpO1xuICBwZXJmb3JtYW5jZT8ubWFyaz8uKCdtYXJrX3VzZV9jb3VudGVyJywge2RldGFpbDoge2ZlYXR1cmV9fSk7XG59XG4iXX0=