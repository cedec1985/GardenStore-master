import type { TimerHandle } from '../../../../src/internal/scheduler/timerHandle';
declare type SetImmediateFunction = (handler: () => void, ...args: any[]) => TimerHandle;
declare type ClearImmediateFunction = (handle: TimerHandle) => void;
interface ImmediateProvider {
    setImmediate: SetImmediateFunction;
    clearImmediate: ClearImmediateFunction;
    delegate: {
        setImmediate: SetImmediateFunction;
        clearImmediate: ClearImmediateFunction;
    } | undefined;
}
export declare const immediateProvider: ImmediateProvider;
export { };
//# sourceMappingURL=immediateProvider.d.ts.map