import { Observable } from 'rxjs';
import { ObservableAsyncIterator } from './types';
export declare class ObservableAsyncIteratorImpl<T> implements ObservableAsyncIterator<T> {
    private readonly PromiseCtor?;
    private pendingPromises;
    private subscription;
    constructor(obs: Observable<T>, PromiseCtor?: PromiseConstructorLike | undefined);
    [Symbol.asyncIterator](): AsyncIterableIterator<T>;
    next(): Promise<IteratorResult<T>>;
    return(): Promise<IteratorResult<T>>;
    private poll;
    private queue;
    private settlePending;
    private discardIfNeeded;
}
