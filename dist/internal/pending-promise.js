import { config } from 'rxjs';
export class PendingPromise {
    constructor(promiseCtor) {
        this.polled = false;
        this.settled = false;
        promiseCtor = promiseCtor || config.Promise || Promise;
        if (!promiseCtor) {
            throw new Error('Promises are not supported!');
        }
        this.promise = new promiseCtor((resolve, reject) => {
            this.resolveFn = resolve;
            this.rejectFn = reject;
        });
    }
    static resolve(promiseCtor) {
        const pending = new PendingPromise(promiseCtor);
        pending.settled = true;
        pending.resolveFn({ done: true });
        return pending;
    }
    static reject(reason, promiseCtor) {
        return new PendingPromise(promiseCtor).reject(reason);
    }
    resolve(value) {
        this.settled = true;
        this.resolveFn({ done: false, value });
        return this;
    }
    reject(reason) {
        this.settled = true;
        this.rejectFn(reason);
        return this;
    }
}
