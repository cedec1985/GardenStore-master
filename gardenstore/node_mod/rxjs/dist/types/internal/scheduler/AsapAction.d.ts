import { AsapScheduler } from '../../../../src/internal/scheduler/AsapScheduler';
import { AsyncAction } from '../../../../src/internal/scheduler/AsyncAction';
import { TimerHandle } from '../../../../src/internal/scheduler/timerHandle';
import { SchedulerAction } from '../types';
export declare class AsapAction<T> extends AsyncAction<T> {
    protected scheduler: AsapScheduler;
    protected work: (this: SchedulerAction<T>, state?: T) => void;
    constructor(scheduler: AsapScheduler, work: (this: SchedulerAction<T>, state?: T) => void);
    protected requestAsyncId(scheduler: AsapScheduler, id?: TimerHandle, delay?: number): TimerHandle;
    protected recycleAsyncId(scheduler: AsapScheduler, id?: TimerHandle, delay?: number): TimerHandle | undefined;
}
//# sourceMappingURL=AsapAction.d.ts.map