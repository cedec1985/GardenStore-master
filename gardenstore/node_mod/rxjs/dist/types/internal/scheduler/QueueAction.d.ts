import { AsyncAction } from '../../../../src/internal/scheduler/AsyncAction';
import { QueueScheduler } from '../../../../src/internal/scheduler/QueueScheduler';
import { TimerHandle } from '../../../../src/internal/scheduler/timerHandle';
import { Subscription } from '../../../../src/internal/Subscription';
import { SchedulerAction } from '../types';
export declare class QueueAction<T> extends AsyncAction<T> {
    protected scheduler: QueueScheduler;
    protected work: (this: SchedulerAction<T>, state?: T) => void;
    constructor(scheduler: QueueScheduler, work: (this: SchedulerAction<T>, state?: T) => void);
    schedule(state?: T, delay?: number): Subscription;
    execute(state: T, delay: number): any;
    protected requestAsyncId(scheduler: QueueScheduler, id?: TimerHandle, delay?: number): TimerHandle;
}
//# sourceMappingURL=QueueAction.d.ts.map