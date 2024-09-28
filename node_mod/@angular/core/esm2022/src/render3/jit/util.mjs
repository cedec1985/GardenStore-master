/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { isForwardRef, resolveForwardRef } from '../../di/forward_ref';
import { getComponentDef, getDirectiveDef, getNgModuleDef, getPipeDef } from '../definition';
import { stringifyForError } from '../util/stringify_utils';
export function isModuleWithProviders(value) {
    return value.ngModule !== undefined;
}
export function isNgModule(value) {
    return !!getNgModuleDef(value);
}
export function isPipe(value) {
    return !!getPipeDef(value);
}
export function isDirective(value) {
    return !!getDirectiveDef(value);
}
export function isComponent(value) {
    return !!getComponentDef(value);
}
function getDependencyTypeForError(type) {
    if (getComponentDef(type))
        return 'component';
    if (getDirectiveDef(type))
        return 'directive';
    if (getPipeDef(type))
        return 'pipe';
    return 'type';
}
export function verifyStandaloneImport(depType, importingType) {
    if (isForwardRef(depType)) {
        depType = resolveForwardRef(depType);
        if (!depType) {
            throw new Error(`Expected forwardRef function, imported from "${stringifyForError(importingType)}", to return a standalone entity or NgModule but got "${stringifyForError(depType) || depType}".`);
        }
    }
    if (getNgModuleDef(depType) == null) {
        const def = getComponentDef(depType) || getDirectiveDef(depType) || getPipeDef(depType);
        if (def != null) {
            // if a component, directive or pipe is imported make sure that it is standalone
            if (!def.standalone) {
                throw new Error(`The "${stringifyForError(depType)}" ${getDependencyTypeForError(depType)}, imported from "${stringifyForError(importingType)}", is not standalone. Did you forget to add the standalone: true flag?`);
            }
        }
        else {
            // it can be either a module with provider or an unknown (not annotated) type
            if (isModuleWithProviders(depType)) {
                throw new Error(`A module with providers was imported from "${stringifyForError(importingType)}". Modules with providers are not supported in standalone components imports.`);
            }
            else {
                throw new Error(`The "${stringifyForError(depType)}" type, imported from "${stringifyForError(importingType)}", must be a standalone component / directive / pipe or an NgModule. Did you forget to add the required @Component / @Directive / @Pipe or @NgModule annotation?`);
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvaml0L3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBRSxpQkFBaUIsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBSXJFLE9BQU8sRUFBQyxlQUFlLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFM0YsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFFMUQsTUFBTSxVQUFVLHFCQUFxQixDQUFDLEtBQVU7SUFDOUMsT0FBUSxLQUEwQixDQUFDLFFBQVEsS0FBSyxTQUFTLENBQUM7QUFDNUQsQ0FBQztBQUVELE1BQU0sVUFBVSxVQUFVLENBQUksS0FBYztJQUMxQyxPQUFPLENBQUMsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDakMsQ0FBQztBQUVELE1BQU0sVUFBVSxNQUFNLENBQUksS0FBYztJQUN0QyxPQUFPLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDN0IsQ0FBQztBQUVELE1BQU0sVUFBVSxXQUFXLENBQUksS0FBYztJQUMzQyxPQUFPLENBQUMsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbEMsQ0FBQztBQUVELE1BQU0sVUFBVSxXQUFXLENBQUksS0FBYztJQUMzQyxPQUFPLENBQUMsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbEMsQ0FBQztBQUVELFNBQVMseUJBQXlCLENBQUMsSUFBZTtJQUNoRCxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUM7UUFBRSxPQUFPLFdBQVcsQ0FBQztJQUM5QyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUM7UUFBRSxPQUFPLFdBQVcsQ0FBQztJQUM5QyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFBRSxPQUFPLE1BQU0sQ0FBQztJQUNwQyxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRUQsTUFBTSxVQUFVLHNCQUFzQixDQUFDLE9BQXNCLEVBQUUsYUFBNEI7SUFDekYsSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDekIsT0FBTyxHQUFHLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixNQUFNLElBQUksS0FBSyxDQUFDLGdEQUNaLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyx5REFDaEMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQztTQUNoRDtLQUNGO0lBRUQsSUFBSSxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxFQUFFO1FBQ25DLE1BQU0sR0FBRyxHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hGLElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtZQUNmLGdGQUFnRjtZQUNoRixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRTtnQkFDbkIsTUFBTSxJQUFJLEtBQUssQ0FBQyxRQUFRLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxLQUM5Qyx5QkFBeUIsQ0FBQyxPQUFPLENBQUMsb0JBQ2xDLGlCQUFpQixDQUNiLGFBQWEsQ0FBQyx3RUFBd0UsQ0FBQyxDQUFDO2FBQ2pHO1NBQ0Y7YUFBTTtZQUNMLDZFQUE2RTtZQUM3RSxJQUFJLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNsQyxNQUFNLElBQUksS0FBSyxDQUFDLDhDQUNaLGlCQUFpQixDQUNiLGFBQWEsQ0FBQywrRUFBK0UsQ0FBQyxDQUFDO2FBQ3hHO2lCQUFNO2dCQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsUUFBUSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsMEJBQzlDLGlCQUFpQixDQUNiLGFBQWEsQ0FBQyxrS0FBa0ssQ0FBQyxDQUFDO2FBQzNMO1NBQ0Y7S0FDRjtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtpc0ZvcndhcmRSZWYsIHJlc29sdmVGb3J3YXJkUmVmfSBmcm9tICcuLi8uLi9kaS9mb3J3YXJkX3JlZic7XG5pbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnN9IGZyb20gJy4uLy4uL2RpL2ludGVyZmFjZS9wcm92aWRlcic7XG5pbXBvcnQge1R5cGV9IGZyb20gJy4uLy4uL2ludGVyZmFjZS90eXBlJztcbmltcG9ydCB7TmdNb2R1bGVEZWZ9IGZyb20gJy4uLy4uL21ldGFkYXRhL25nX21vZHVsZV9kZWYnO1xuaW1wb3J0IHtnZXRDb21wb25lbnREZWYsIGdldERpcmVjdGl2ZURlZiwgZ2V0TmdNb2R1bGVEZWYsIGdldFBpcGVEZWZ9IGZyb20gJy4uL2RlZmluaXRpb24nO1xuaW1wb3J0IHtDb21wb25lbnRUeXBlLCBEaXJlY3RpdmVUeXBlLCBQaXBlVHlwZX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9kZWZpbml0aW9uJztcbmltcG9ydCB7c3RyaW5naWZ5Rm9yRXJyb3J9IGZyb20gJy4uL3V0aWwvc3RyaW5naWZ5X3V0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGlzTW9kdWxlV2l0aFByb3ZpZGVycyh2YWx1ZTogYW55KTogdmFsdWUgaXMgTW9kdWxlV2l0aFByb3ZpZGVyczx7fT4ge1xuICByZXR1cm4gKHZhbHVlIGFzIHtuZ01vZHVsZT86IGFueX0pLm5nTW9kdWxlICE9PSB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc05nTW9kdWxlPFQ+KHZhbHVlOiBUeXBlPFQ+KTogdmFsdWUgaXMgVHlwZTxUPiZ7ybVtb2Q6IE5nTW9kdWxlRGVmPFQ+fSB7XG4gIHJldHVybiAhIWdldE5nTW9kdWxlRGVmKHZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUGlwZTxUPih2YWx1ZTogVHlwZTxUPik6IHZhbHVlIGlzIFBpcGVUeXBlPFQ+IHtcbiAgcmV0dXJuICEhZ2V0UGlwZURlZih2YWx1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RpcmVjdGl2ZTxUPih2YWx1ZTogVHlwZTxUPik6IHZhbHVlIGlzIERpcmVjdGl2ZVR5cGU8VD4ge1xuICByZXR1cm4gISFnZXREaXJlY3RpdmVEZWYodmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNDb21wb25lbnQ8VD4odmFsdWU6IFR5cGU8VD4pOiB2YWx1ZSBpcyBDb21wb25lbnRUeXBlPFQ+IHtcbiAgcmV0dXJuICEhZ2V0Q29tcG9uZW50RGVmKHZhbHVlKTtcbn1cblxuZnVuY3Rpb24gZ2V0RGVwZW5kZW5jeVR5cGVGb3JFcnJvcih0eXBlOiBUeXBlPGFueT4pIHtcbiAgaWYgKGdldENvbXBvbmVudERlZih0eXBlKSkgcmV0dXJuICdjb21wb25lbnQnO1xuICBpZiAoZ2V0RGlyZWN0aXZlRGVmKHR5cGUpKSByZXR1cm4gJ2RpcmVjdGl2ZSc7XG4gIGlmIChnZXRQaXBlRGVmKHR5cGUpKSByZXR1cm4gJ3BpcGUnO1xuICByZXR1cm4gJ3R5cGUnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdmVyaWZ5U3RhbmRhbG9uZUltcG9ydChkZXBUeXBlOiBUeXBlPHVua25vd24+LCBpbXBvcnRpbmdUeXBlOiBUeXBlPHVua25vd24+KSB7XG4gIGlmIChpc0ZvcndhcmRSZWYoZGVwVHlwZSkpIHtcbiAgICBkZXBUeXBlID0gcmVzb2x2ZUZvcndhcmRSZWYoZGVwVHlwZSk7XG4gICAgaWYgKCFkZXBUeXBlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGZvcndhcmRSZWYgZnVuY3Rpb24sIGltcG9ydGVkIGZyb20gXCIke1xuICAgICAgICAgIHN0cmluZ2lmeUZvckVycm9yKGltcG9ydGluZ1R5cGUpfVwiLCB0byByZXR1cm4gYSBzdGFuZGFsb25lIGVudGl0eSBvciBOZ01vZHVsZSBidXQgZ290IFwiJHtcbiAgICAgICAgICBzdHJpbmdpZnlGb3JFcnJvcihkZXBUeXBlKSB8fCBkZXBUeXBlfVwiLmApO1xuICAgIH1cbiAgfVxuXG4gIGlmIChnZXROZ01vZHVsZURlZihkZXBUeXBlKSA9PSBudWxsKSB7XG4gICAgY29uc3QgZGVmID0gZ2V0Q29tcG9uZW50RGVmKGRlcFR5cGUpIHx8IGdldERpcmVjdGl2ZURlZihkZXBUeXBlKSB8fCBnZXRQaXBlRGVmKGRlcFR5cGUpO1xuICAgIGlmIChkZWYgIT0gbnVsbCkge1xuICAgICAgLy8gaWYgYSBjb21wb25lbnQsIGRpcmVjdGl2ZSBvciBwaXBlIGlzIGltcG9ydGVkIG1ha2Ugc3VyZSB0aGF0IGl0IGlzIHN0YW5kYWxvbmVcbiAgICAgIGlmICghZGVmLnN0YW5kYWxvbmUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgXCIke3N0cmluZ2lmeUZvckVycm9yKGRlcFR5cGUpfVwiICR7XG4gICAgICAgICAgICBnZXREZXBlbmRlbmN5VHlwZUZvckVycm9yKGRlcFR5cGUpfSwgaW1wb3J0ZWQgZnJvbSBcIiR7XG4gICAgICAgICAgICBzdHJpbmdpZnlGb3JFcnJvcihcbiAgICAgICAgICAgICAgICBpbXBvcnRpbmdUeXBlKX1cIiwgaXMgbm90IHN0YW5kYWxvbmUuIERpZCB5b3UgZm9yZ2V0IHRvIGFkZCB0aGUgc3RhbmRhbG9uZTogdHJ1ZSBmbGFnP2ApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpdCBjYW4gYmUgZWl0aGVyIGEgbW9kdWxlIHdpdGggcHJvdmlkZXIgb3IgYW4gdW5rbm93biAobm90IGFubm90YXRlZCkgdHlwZVxuICAgICAgaWYgKGlzTW9kdWxlV2l0aFByb3ZpZGVycyhkZXBUeXBlKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEEgbW9kdWxlIHdpdGggcHJvdmlkZXJzIHdhcyBpbXBvcnRlZCBmcm9tIFwiJHtcbiAgICAgICAgICAgIHN0cmluZ2lmeUZvckVycm9yKFxuICAgICAgICAgICAgICAgIGltcG9ydGluZ1R5cGUpfVwiLiBNb2R1bGVzIHdpdGggcHJvdmlkZXJzIGFyZSBub3Qgc3VwcG9ydGVkIGluIHN0YW5kYWxvbmUgY29tcG9uZW50cyBpbXBvcnRzLmApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgXCIke3N0cmluZ2lmeUZvckVycm9yKGRlcFR5cGUpfVwiIHR5cGUsIGltcG9ydGVkIGZyb20gXCIke1xuICAgICAgICAgICAgc3RyaW5naWZ5Rm9yRXJyb3IoXG4gICAgICAgICAgICAgICAgaW1wb3J0aW5nVHlwZSl9XCIsIG11c3QgYmUgYSBzdGFuZGFsb25lIGNvbXBvbmVudCAvIGRpcmVjdGl2ZSAvIHBpcGUgb3IgYW4gTmdNb2R1bGUuIERpZCB5b3UgZm9yZ2V0IHRvIGFkZCB0aGUgcmVxdWlyZWQgQENvbXBvbmVudCAvIEBEaXJlY3RpdmUgLyBAUGlwZSBvciBATmdNb2R1bGUgYW5ub3RhdGlvbj9gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==