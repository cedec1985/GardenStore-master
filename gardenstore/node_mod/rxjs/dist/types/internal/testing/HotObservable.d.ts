import { Scheduler } from '../../../../src/internal/Scheduler';
import { Subject } from '../../../../src/internal/Subject';
import { SubscriptionLog } from '../../../../src/internal/testing/SubscriptionLog';
import { SubscriptionLoggable } from '../../../../src/internal/testing/SubscriptionLoggable';
import { TestMessage } from '../../../../src/internal/testing/TestMessage';
export declare class HotObservable<T> extends Subject<T> implements SubscriptionLoggable {
    messages: TestMessage[];
    subscriptions: SubscriptionLog[];
    scheduler: Scheduler;
    logSubscribedFrame: () => number;
    logUnsubscribedFrame: (index: number) => void;
    constructor(messages: TestMessage[], scheduler: Scheduler);
    setup(): void;
}
//# sourceMappingURL=HotObservable.d.ts.map