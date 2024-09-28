import { Subscription } from '../../../../src/internal/Subscription';
import { SchedulerLike } from '../types';
export declare function executeSchedule(parentSubscription: Subscription, scheduler: SchedulerLike, work: () => void, delay: number, repeat: true): void;
export declare function executeSchedule(parentSubscription: Subscription, scheduler: SchedulerLike, work: () => void, delay?: number, repeat?: false): Subscription;
//# sourceMappingURL=executeSchedule.d.ts.map