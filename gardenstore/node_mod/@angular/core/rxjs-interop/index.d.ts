/**
 * @license Angular v17.0.6
 * (c) 2010-2022 Google LLC. https://angular.io/
 * License: MIT
 */


import { DestroyRef } from '@angular/core';
import { Injector } from '@angular/core';
import { MonoTypeOperatorFunction } from 'rxjs';
import { Observable } from 'rxjs';
import { Signal } from '@angular/core';
import { Subscribable } from 'rxjs';

/**
 * Operator which completes the Observable when the calling context (component, directive, service,
 * etc) is destroyed.
 *
 * @param destroyRef optionally, the `DestroyRef` representing the current context. This can be
 *     passed explicitly to use `takeUntilDestroyed` outside of an [injection
 * context](guide/dependency-injection-context). Otherwise, the current `DestroyRef` is injected.
 *
 * @developerPreview
 */
export declare function takeUntilDestroyed<T>(destroyRef?: DestroyRef): MonoTypeOperatorFunction<T>;

/**
 * Exposes the value of an Angular `Signal` as an RxJS `Observable`.
 *
 * The signal's value will be propagated into the `Observable`'s subscribers using an `effect`.
 *
 * `toObservable` must be called in an injection context unless an injector is provided via options.
 *
 * @developerPreview
 */
export declare function toObservable<T>(source: Signal<T>, options?: ToObservableOptions): Observable<T>;

/**
 * Options for `toObservable`.
 *
 * @developerPreview
 */
export declare interface ToObservableOptions {
    /**
     * The `Injector` to use when creating the underlying `effect` which watches the signal.
     *
     * If this isn't specified, the current [injection context](guide/dependency-injection-context)
     * will be used.
     */
    injector?: Injector;
}

export declare function toSignal<T>(source: Observable<T> | Subscribable<T>): Signal<T | undefined>;

export declare function toSignal<T>(source: Observable<T> | Subscribable<T>, options: ToSignalOptions & {
    initialValue?: undefined;
    requireSync?: false;
}): Signal<T | undefined>;

export declare function toSignal<T>(source: Observable<T> | Subscribable<T>, options: ToSignalOptions & {
    initialValue?: null;
    requireSync?: false;
}): Signal<T | null>;

export declare function toSignal<T>(source: Observable<T> | Subscribable<T>, options: ToSignalOptions & {
    initialValue?: undefined;
    requireSync: true;
}): Signal<T>;

export declare function toSignal<T, const U extends T>(source: Observable<T> | Subscribable<T>, options: ToSignalOptions & {
    initialValue: U;
    requireSync?: false;
}): Signal<T | U>;

/**
 * Options for `toSignal`.
 *
 * @publicApi
 */
export declare interface ToSignalOptions {
    /**
     * Initial value for the signal produced by `toSignal`.
     *
     * This will be the value of the signal until the observable emits its first value.
     */
    initialValue?: unknown;
    /**
     * Whether to require that the observable emits synchronously when `toSignal` subscribes.
     *
     * If this is `true`, `toSignal` will assert that the observable produces a value immediately upon
     * subscription. Setting this option removes the need to either deal with `undefined` in the
     * signal type or provide an `initialValue`, at the cost of a runtime error if this requirement is
     * not met.
     */
    requireSync?: boolean;
    /**
     * `Injector` which will provide the `DestroyRef` used to clean up the Observable subscription.
     *
     * If this is not provided, a `DestroyRef` will be retrieved from the current [injection
     * context](/guide/dependency-injection-context), unless manual cleanup is requested.
     */
    injector?: Injector;
    /**
     * Whether the subscription should be automatically cleaned up (via `DestroyRef`) when
     * `toObservable`'s creation context is destroyed.
     *
     * If manual cleanup is enabled, then `DestroyRef` is not used, and the subscription will persist
     * until the `Observable` itself completes.
     */
    manualCleanup?: boolean;
    /**
     * Whether `toSignal` should throw errors from the Observable error channel back to RxJS, where
     * they'll be processed as uncaught exceptions.
     *
     * In practice, this means that the signal returned by `toSignal` will keep returning the last
     * good value forever, as Observables which error produce no further values. This option emulates
     * the behavior of the `async` pipe.
     */
    rejectErrors?: boolean;
}

export { }
