/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ERROR_DETAILS_PAGE_BASE_URL } from './error_details_base_url';
/**
 * Class that represents a runtime error.
 * Formats and outputs the error message in a consistent way.
 *
 * Example:
 * ```
 *  throw new RuntimeError(
 *    RuntimeErrorCode.INJECTOR_ALREADY_DESTROYED,
 *    ngDevMode && 'Injector has already been destroyed.');
 * ```
 *
 * Note: the `message` argument contains a descriptive error message as a string in development
 * mode (when the `ngDevMode` is defined). In production mode (after tree-shaking pass), the
 * `message` argument becomes `false`, thus we account for it in the typings and the runtime
 * logic.
 */
export class RuntimeError extends Error {
    constructor(code, message) {
        super(formatRuntimeError(code, message));
        this.code = code;
    }
}
/**
 * Called to format a runtime error.
 * See additional info on the `message` argument type in the `RuntimeError` class description.
 */
export function formatRuntimeError(code, message) {
    // Error code might be a negative number, which is a special marker that instructs the logic to
    // generate a link to the error details page on angular.io.
    // We also prepend `0` to non-compile-time errors.
    const fullCode = `NG0${Math.abs(code)}`;
    let errorMessage = `${fullCode}${message ? ': ' + message : ''}`;
    if (ngDevMode && code < 0) {
        const addPeriodSeparator = !errorMessage.match(/[.,;!?\n]$/);
        const separator = addPeriodSeparator ? '.' : '';
        errorMessage =
            `${errorMessage}${separator} Find more at ${ERROR_DETAILS_PAGE_BASE_URL}/${fullCode}`;
    }
    return errorMessage;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvZXJyb3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQywyQkFBMkIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBcUhyRTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxNQUFNLE9BQU8sWUFBa0QsU0FBUSxLQUFLO0lBQzFFLFlBQW1CLElBQU8sRUFBRSxPQUEwQjtRQUNwRCxLQUFLLENBQUMsa0JBQWtCLENBQUksSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFEM0IsU0FBSSxHQUFKLElBQUksQ0FBRztJQUUxQixDQUFDO0NBQ0Y7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsa0JBQWtCLENBQzlCLElBQU8sRUFBRSxPQUEwQjtJQUNyQywrRkFBK0Y7SUFDL0YsMkRBQTJEO0lBQzNELGtEQUFrRDtJQUNsRCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUV4QyxJQUFJLFlBQVksR0FBRyxHQUFHLFFBQVEsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBRWpFLElBQUksU0FBUyxJQUFJLElBQUksR0FBRyxDQUFDLEVBQUU7UUFDekIsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDN0QsTUFBTSxTQUFTLEdBQUcsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ2hELFlBQVk7WUFDUixHQUFHLFlBQVksR0FBRyxTQUFTLGlCQUFpQiwyQkFBMkIsSUFBSSxRQUFRLEVBQUUsQ0FBQztLQUMzRjtJQUNELE9BQU8sWUFBWSxDQUFDO0FBQ3RCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtFUlJPUl9ERVRBSUxTX1BBR0VfQkFTRV9VUkx9IGZyb20gJy4vZXJyb3JfZGV0YWlsc19iYXNlX3VybCc7XG5cbi8qKlxuICogVGhlIGxpc3Qgb2YgZXJyb3IgY29kZXMgdXNlZCBpbiBydW50aW1lIGNvZGUgb2YgdGhlIGBjb3JlYCBwYWNrYWdlLlxuICogUmVzZXJ2ZWQgZXJyb3IgY29kZSByYW5nZTogMTAwLTk5OS5cbiAqXG4gKiBOb3RlOiB0aGUgbWludXMgc2lnbiBkZW5vdGVzIHRoZSBmYWN0IHRoYXQgYSBwYXJ0aWN1bGFyIGNvZGUgaGFzIGEgZGV0YWlsZWQgZ3VpZGUgb25cbiAqIGFuZ3VsYXIuaW8uIFRoaXMgZXh0cmEgYW5ub3RhdGlvbiBpcyBuZWVkZWQgdG8gYXZvaWQgaW50cm9kdWNpbmcgYSBzZXBhcmF0ZSBzZXQgdG8gc3RvcmVcbiAqIGVycm9yIGNvZGVzIHdoaWNoIGhhdmUgZ3VpZGVzLCB3aGljaCBtaWdodCBsZWFrIGludG8gcnVudGltZSBjb2RlLlxuICpcbiAqIEZ1bGwgbGlzdCBvZiBhdmFpbGFibGUgZXJyb3IgZ3VpZGVzIGNhbiBiZSBmb3VuZCBhdCBodHRwczovL2FuZ3VsYXIuaW8vZXJyb3JzLlxuICpcbiAqIEVycm9yIGNvZGUgcmFuZ2VzIHBlciBwYWNrYWdlOlxuICogIC0gY29yZSAodGhpcyBwYWNrYWdlKTogMTAwLTk5OVxuICogIC0gZm9ybXM6IDEwMDAtMTk5OVxuICogIC0gY29tbW9uOiAyMDAwLTI5OTlcbiAqICAtIGFuaW1hdGlvbnM6IDMwMDAtMzk5OVxuICogIC0gcm91dGVyOiA0MDAwLTQ5OTlcbiAqICAtIHBsYXRmb3JtLWJyb3dzZXI6IDUwMDAtNTUwMFxuICovXG5leHBvcnQgY29uc3QgZW51bSBSdW50aW1lRXJyb3JDb2RlIHtcbiAgLy8gQ2hhbmdlIERldGVjdGlvbiBFcnJvcnNcbiAgRVhQUkVTU0lPTl9DSEFOR0VEX0FGVEVSX0NIRUNLRUQgPSAtMTAwLFxuICBSRUNVUlNJVkVfQVBQTElDQVRJT05fUkVGX1RJQ0sgPSAxMDEsXG4gIFJFQ1VSU0lWRV9BUFBMSUNBVElPTl9SRU5ERVIgPSAxMDIsXG4gIElORklOSVRFX0NIQU5HRV9ERVRFQ1RJT04gPSAxMDMsXG5cbiAgLy8gRGVwZW5kZW5jeSBJbmplY3Rpb24gRXJyb3JzXG4gIENZQ0xJQ19ESV9ERVBFTkRFTkNZID0gLTIwMCxcbiAgUFJPVklERVJfTk9UX0ZPVU5EID0gLTIwMSxcbiAgSU5WQUxJRF9GQUNUT1JZX0RFUEVOREVOQ1kgPSAyMDIsXG4gIE1JU1NJTkdfSU5KRUNUSU9OX0NPTlRFWFQgPSAtMjAzLFxuICBJTlZBTElEX0lOSkVDVElPTl9UT0tFTiA9IDIwNCxcbiAgSU5KRUNUT1JfQUxSRUFEWV9ERVNUUk9ZRUQgPSAyMDUsXG4gIFBST1ZJREVSX0lOX1dST05HX0NPTlRFWFQgPSAyMDcsXG4gIE1JU1NJTkdfSU5KRUNUSU9OX1RPS0VOID0gMjA4LFxuICBJTlZBTElEX01VTFRJX1BST1ZJREVSID0gLTIwOSxcbiAgTUlTU0lOR19ET0NVTUVOVCA9IDIxMCxcblxuICAvLyBUZW1wbGF0ZSBFcnJvcnNcbiAgTVVMVElQTEVfQ09NUE9ORU5UU19NQVRDSCA9IC0zMDAsXG4gIEVYUE9SVF9OT1RfRk9VTkQgPSAtMzAxLFxuICBQSVBFX05PVF9GT1VORCA9IC0zMDIsXG4gIFVOS05PV05fQklORElORyA9IDMwMyxcbiAgVU5LTk9XTl9FTEVNRU5UID0gMzA0LFxuICBURU1QTEFURV9TVFJVQ1RVUkVfRVJST1IgPSAzMDUsXG4gIElOVkFMSURfRVZFTlRfQklORElORyA9IDMwNixcbiAgSE9TVF9ESVJFQ1RJVkVfVU5SRVNPTFZBQkxFID0gMzA3LFxuICBIT1NUX0RJUkVDVElWRV9OT1RfU1RBTkRBTE9ORSA9IDMwOCxcbiAgRFVQTElDQVRFX0RJUkVDVElWRSA9IDMwOSxcbiAgSE9TVF9ESVJFQ1RJVkVfQ09NUE9ORU5UID0gMzEwLFxuICBIT1NUX0RJUkVDVElWRV9VTkRFRklORURfQklORElORyA9IDMxMSxcbiAgSE9TVF9ESVJFQ1RJVkVfQ09ORkxJQ1RJTkdfQUxJQVMgPSAzMTIsXG4gIE1VTFRJUExFX01BVENISU5HX1BJUEVTID0gMzEzLFxuXG4gIC8vIEJvb3RzdHJhcCBFcnJvcnNcbiAgTVVMVElQTEVfUExBVEZPUk1TID0gNDAwLFxuICBQTEFURk9STV9OT1RfRk9VTkQgPSA0MDEsXG4gIE1JU1NJTkdfUkVRVUlSRURfSU5KRUNUQUJMRV9JTl9CT09UU1RSQVAgPSA0MDIsXG4gIEJPT1RTVFJBUF9DT01QT05FTlRTX05PVF9GT1VORCA9IC00MDMsXG4gIFBMQVRGT1JNX0FMUkVBRFlfREVTVFJPWUVEID0gNDA0LFxuICBBU1lOQ19JTklUSUFMSVpFUlNfU1RJTExfUlVOTklORyA9IDQwNSxcbiAgQVBQTElDQVRJT05fUkVGX0FMUkVBRFlfREVTVFJPWUVEID0gNDA2LFxuICBSRU5ERVJFUl9OT1RfRk9VTkQgPSA0MDcsXG5cbiAgLy8gSHlkcmF0aW9uIEVycm9yc1xuICBIWURSQVRJT05fTk9ERV9NSVNNQVRDSCA9IC01MDAsXG4gIEhZRFJBVElPTl9NSVNTSU5HX1NJQkxJTkdTID0gLTUwMSxcbiAgSFlEUkFUSU9OX01JU1NJTkdfTk9ERSA9IC01MDIsXG4gIFVOU1VQUE9SVEVEX1BST0pFQ1RJT05fRE9NX05PREVTID0gLTUwMyxcbiAgSU5WQUxJRF9TS0lQX0hZRFJBVElPTl9IT1NUID0gLTUwNCxcbiAgTUlTU0lOR19IWURSQVRJT05fQU5OT1RBVElPTlMgPSAtNTA1LFxuICBIWURSQVRJT05fU1RBQkxFX1RJTUVET1VUID0gLTUwNixcbiAgTUlTU0lOR19TU1JfQ09OVEVOVF9JTlRFR1JJVFlfTUFSS0VSID0gLTUwNyxcblxuICAvLyBTaWduYWwgRXJyb3JzXG4gIFNJR05BTF9XUklURV9GUk9NX0lMTEVHQUxfQ09OVEVYVCA9IDYwMCxcbiAgUkVRVUlSRV9TWU5DX1dJVEhPVVRfU1lOQ19FTUlUID0gNjAxLFxuICBBU1NFUlRJT05fTk9UX0lOU0lERV9SRUFDVElWRV9DT05URVhUID0gLTYwMixcblxuICAvLyBTdHlsaW5nIEVycm9yc1xuXG4gIC8vIERlY2xhcmF0aW9ucyBFcnJvcnNcblxuICAvLyBpMThuIEVycm9yc1xuICBJTlZBTElEX0kxOE5fU1RSVUNUVVJFID0gNzAwLFxuICBNSVNTSU5HX0xPQ0FMRV9EQVRBID0gNzAxLFxuXG4gIC8vIERlZmVyIGVycm9ycyAoNzUwLTc5OSByYW5nZSlcbiAgREVGRVJfTE9BRElOR19GQUlMRUQgPSA3NTAsXG5cbiAgLy8gc3RhbmRhbG9uZSBlcnJvcnNcbiAgSU1QT1JUX1BST1ZJREVSU19GUk9NX1NUQU5EQUxPTkUgPSA4MDAsXG5cbiAgLy8gSklUIENvbXBpbGF0aW9uIEVycm9yc1xuICAvLyBPdGhlclxuICBJTlZBTElEX0RJRkZFUl9JTlBVVCA9IDkwMCxcbiAgTk9fU1VQUE9SVElOR19ESUZGRVJfRkFDVE9SWSA9IDkwMSxcbiAgVklFV19BTFJFQURZX0FUVEFDSEVEID0gOTAyLFxuICBJTlZBTElEX0lOSEVSSVRBTkNFID0gOTAzLFxuICBVTlNBRkVfVkFMVUVfSU5fUkVTT1VSQ0VfVVJMID0gOTA0LFxuICBVTlNBRkVfVkFMVUVfSU5fU0NSSVBUID0gOTA1LFxuICBNSVNTSU5HX0dFTkVSQVRFRF9ERUYgPSA5MDYsXG4gIFRZUEVfSVNfTk9UX1NUQU5EQUxPTkUgPSA5MDcsXG4gIE1JU1NJTkdfWk9ORUpTID0gOTA4LFxuICBVTkVYUEVDVEVEX1pPTkVfU1RBVEUgPSA5MDksXG4gIFVOU0FGRV9JRlJBTUVfQVRUUlMgPSAtOTEwLFxuICBWSUVXX0FMUkVBRFlfREVTVFJPWUVEID0gOTExLFxuICBDT01QT05FTlRfSURfQ09MTElTSU9OID0gLTkxMixcbiAgSU1BR0VfUEVSRk9STUFOQ0VfV0FSTklORyA9IC05MTMsXG5cbiAgLy8gUnVudGltZSBkZXBlbmRlbmN5IHRyYWNrZXIgZXJyb3JzXG4gIFJVTlRJTUVfREVQU19JTlZBTElEX0lNUE9SVEVEX1RZUEUgPSAxMDAwLFxuICBSVU5USU1FX0RFUFNfT1JQSEFOX0NPTVBPTkVOVCA9IDEwMDEsXG59XG5cblxuLyoqXG4gKiBDbGFzcyB0aGF0IHJlcHJlc2VudHMgYSBydW50aW1lIGVycm9yLlxuICogRm9ybWF0cyBhbmQgb3V0cHV0cyB0aGUgZXJyb3IgbWVzc2FnZSBpbiBhIGNvbnNpc3RlbnQgd2F5LlxuICpcbiAqIEV4YW1wbGU6XG4gKiBgYGBcbiAqICB0aHJvdyBuZXcgUnVudGltZUVycm9yKFxuICogICAgUnVudGltZUVycm9yQ29kZS5JTkpFQ1RPUl9BTFJFQURZX0RFU1RST1lFRCxcbiAqICAgIG5nRGV2TW9kZSAmJiAnSW5qZWN0b3IgaGFzIGFscmVhZHkgYmVlbiBkZXN0cm95ZWQuJyk7XG4gKiBgYGBcbiAqXG4gKiBOb3RlOiB0aGUgYG1lc3NhZ2VgIGFyZ3VtZW50IGNvbnRhaW5zIGEgZGVzY3JpcHRpdmUgZXJyb3IgbWVzc2FnZSBhcyBhIHN0cmluZyBpbiBkZXZlbG9wbWVudFxuICogbW9kZSAod2hlbiB0aGUgYG5nRGV2TW9kZWAgaXMgZGVmaW5lZCkuIEluIHByb2R1Y3Rpb24gbW9kZSAoYWZ0ZXIgdHJlZS1zaGFraW5nIHBhc3MpLCB0aGVcbiAqIGBtZXNzYWdlYCBhcmd1bWVudCBiZWNvbWVzIGBmYWxzZWAsIHRodXMgd2UgYWNjb3VudCBmb3IgaXQgaW4gdGhlIHR5cGluZ3MgYW5kIHRoZSBydW50aW1lXG4gKiBsb2dpYy5cbiAqL1xuZXhwb3J0IGNsYXNzIFJ1bnRpbWVFcnJvcjxUIGV4dGVuZHMgbnVtYmVyID0gUnVudGltZUVycm9yQ29kZT4gZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb2RlOiBULCBtZXNzYWdlOiBudWxsfGZhbHNlfHN0cmluZykge1xuICAgIHN1cGVyKGZvcm1hdFJ1bnRpbWVFcnJvcjxUPihjb2RlLCBtZXNzYWdlKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBDYWxsZWQgdG8gZm9ybWF0IGEgcnVudGltZSBlcnJvci5cbiAqIFNlZSBhZGRpdGlvbmFsIGluZm8gb24gdGhlIGBtZXNzYWdlYCBhcmd1bWVudCB0eXBlIGluIHRoZSBgUnVudGltZUVycm9yYCBjbGFzcyBkZXNjcmlwdGlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdFJ1bnRpbWVFcnJvcjxUIGV4dGVuZHMgbnVtYmVyID0gUnVudGltZUVycm9yQ29kZT4oXG4gICAgY29kZTogVCwgbWVzc2FnZTogbnVsbHxmYWxzZXxzdHJpbmcpOiBzdHJpbmcge1xuICAvLyBFcnJvciBjb2RlIG1pZ2h0IGJlIGEgbmVnYXRpdmUgbnVtYmVyLCB3aGljaCBpcyBhIHNwZWNpYWwgbWFya2VyIHRoYXQgaW5zdHJ1Y3RzIHRoZSBsb2dpYyB0b1xuICAvLyBnZW5lcmF0ZSBhIGxpbmsgdG8gdGhlIGVycm9yIGRldGFpbHMgcGFnZSBvbiBhbmd1bGFyLmlvLlxuICAvLyBXZSBhbHNvIHByZXBlbmQgYDBgIHRvIG5vbi1jb21waWxlLXRpbWUgZXJyb3JzLlxuICBjb25zdCBmdWxsQ29kZSA9IGBORzAke01hdGguYWJzKGNvZGUpfWA7XG5cbiAgbGV0IGVycm9yTWVzc2FnZSA9IGAke2Z1bGxDb2RlfSR7bWVzc2FnZSA/ICc6ICcgKyBtZXNzYWdlIDogJyd9YDtcblxuICBpZiAobmdEZXZNb2RlICYmIGNvZGUgPCAwKSB7XG4gICAgY29uc3QgYWRkUGVyaW9kU2VwYXJhdG9yID0gIWVycm9yTWVzc2FnZS5tYXRjaCgvWy4sOyE/XFxuXSQvKTtcbiAgICBjb25zdCBzZXBhcmF0b3IgPSBhZGRQZXJpb2RTZXBhcmF0b3IgPyAnLicgOiAnJztcbiAgICBlcnJvck1lc3NhZ2UgPVxuICAgICAgICBgJHtlcnJvck1lc3NhZ2V9JHtzZXBhcmF0b3J9IEZpbmQgbW9yZSBhdCAke0VSUk9SX0RFVEFJTFNfUEFHRV9CQVNFX1VSTH0vJHtmdWxsQ29kZX1gO1xuICB9XG4gIHJldHVybiBlcnJvck1lc3NhZ2U7XG59XG4iXX0=