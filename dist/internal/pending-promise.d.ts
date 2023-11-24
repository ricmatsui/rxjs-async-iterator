export declare class PendingPromise<T> {
    static resolve<U>(promiseCtor?: PromiseConstructorLike): PendingPromise<U>;
    static reject<U>(reason?: any, promiseCtor?: PromiseConstructorLike): PendingPromise<U>;
    readonly promise: Promise<IteratorResult<T>>;
    polled: boolean;
    settled: boolean;
    private resolveFn;
    private rejectFn;
    constructor(promiseCtor?: PromiseConstructorLike);
    resolve(value: T): this;
    reject(reason?: any): this;
}
