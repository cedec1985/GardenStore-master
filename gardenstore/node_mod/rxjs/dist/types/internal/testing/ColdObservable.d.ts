import { Scheduler } from '../../../../src/internal/Scheduler';
import { Subscriber } from '../../../../src/internal/Subscriber';
import { SubscriptionLog } from '../../../../src/internal/testing/SubscriptionLog';
import { SubscriptionLoggable } from '../../../../src/internal/testing/SubscriptionLoggable';
import { TestMessage } from '../../../../src/internal/testing/TestMessage';
import { Observable } from '../Observable';
export declare class ColdObservable<T> extends Observable<T> implements SubscriptionLoggable {
    messages: TestMessage[];
    subscriptions: SubscriptionLog[];
    scheduler: Scheduler;
    logSubscribedFrame: () => number;
    logUnsubscribedFrame: (index: number) => void;
    constructor(messages: TestMessage[], scheduler: Scheduler);
    scheduleMessages(subscriber: Subscriber<any>): void;
}
//# sourceMappingURL=ColdObservable.d.ts.map