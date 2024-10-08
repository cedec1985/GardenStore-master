import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class TerminalService {
    commandSource = new Subject();
    responseSource = new Subject();
    commandHandler = this.commandSource.asObservable();
    responseHandler = this.responseSource.asObservable();
    sendCommand(command) {
        if (command) {
            this.commandSource.next(command);
        }
    }
    sendResponse(response) {
        if (response) {
            this.responseSource.next(response);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: TerminalService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: TerminalService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.5", ngImport: i0, type: TerminalService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVybWluYWxzZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL3Rlcm1pbmFsL3Rlcm1pbmFsc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBRy9CLE1BQU0sT0FBTyxlQUFlO0lBQ2hCLGFBQWEsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO0lBQ3RDLGNBQWMsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO0lBRS9DLGNBQWMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ25ELGVBQWUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBRXJELFdBQVcsQ0FBQyxPQUFlO1FBQ3ZCLElBQUksT0FBTyxFQUFFO1lBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDcEM7SUFDTCxDQUFDO0lBRUQsWUFBWSxDQUFDLFFBQWdCO1FBQ3pCLElBQUksUUFBUSxFQUFFO1lBQ1YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDdEM7SUFDTCxDQUFDO3VHQWpCUSxlQUFlOzJHQUFmLGVBQWU7OzJGQUFmLGVBQWU7a0JBRDNCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUZXJtaW5hbFNlcnZpY2Uge1xuICAgIHByaXZhdGUgY29tbWFuZFNvdXJjZSA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgICBwcml2YXRlIHJlc3BvbnNlU291cmNlID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXG4gICAgY29tbWFuZEhhbmRsZXIgPSB0aGlzLmNvbW1hbmRTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XG4gICAgcmVzcG9uc2VIYW5kbGVyID0gdGhpcy5yZXNwb25zZVNvdXJjZS5hc09ic2VydmFibGUoKTtcblxuICAgIHNlbmRDb21tYW5kKGNvbW1hbmQ6IHN0cmluZykge1xuICAgICAgICBpZiAoY29tbWFuZCkge1xuICAgICAgICAgICAgdGhpcy5jb21tYW5kU291cmNlLm5leHQoY29tbWFuZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZW5kUmVzcG9uc2UocmVzcG9uc2U6IHN0cmluZykge1xuICAgICAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHRoaXMucmVzcG9uc2VTb3VyY2UubmV4dChyZXNwb25zZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=