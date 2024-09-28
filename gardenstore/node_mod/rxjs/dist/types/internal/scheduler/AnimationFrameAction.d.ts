import { AnimationFrameScheduler } from '../../../../src/internal/scheduler/AnimationFrameScheduler';
import { AsyncAction } from '../../../../src/internal/scheduler/AsyncAction';
import { TimerHandle } from '../../../../src/internal/scheduler/timerHandle';
import { SchedulerAction } from '../types';
export declare class AnimationFrameAction<T> extends AsyncAction<T> {
    protected scheduler: AnimationFrameScheduler;
    protected work: (this: SchedulerAction<T>, state?: T) => void;
    constructor(scheduler: AnimationFrameScheduler, work: (this: SchedulerAction<T>, state?: T) => void);
    protected requestAsyncId(scheduler: AnimationFrameScheduler, id?: TimerHandle, delay?: number): TimerHandle;
    protected recycleAsyncId(scheduler: AnimationFrameScheduler, id?: TimerHandle, delay?: number): TimerHandle | undefined;
}
//# sourceMappingURL=AnimationFrameAction.d.ts.map