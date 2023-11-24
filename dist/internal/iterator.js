import { Subscription } from 'rxjs';
import { PendingPromise } from './pending-promise';
export class ObservableAsyncIteratorImpl {
    constructor(obs, PromiseCtor) {
        this.PromiseCtor = PromiseCtor;
        this.pendingPromises = [];
        this.subscription = new Subscription();
        const subscription = obs.subscribe({
            next: (value) => this.settlePending('resolve', value),
            error: (error) => this.settlePending('reject', error),
            complete: () => {
                this.subscription.unsubscribe();
                this.pendingPromises.push(PendingPromise.resolve(this.PromiseCtor));
            },
        });
        this.subscription.add(subscription);
    }
    [Symbol.asyncIterator]() {
        return this;
    }
    next() {
        const pending = this.poll();
        this.discardIfNeeded(pending);
        return pending.promise;
    }
    return() {
        this.subscription.unsubscribe();
        this.pendingPromises = [];
        return PendingPromise.resolve(this.PromiseCtor).promise;
    }
    poll() {
        const pending = this.pendingPromises[0] || this.queue();
        pending.polled = true;
        return pending;
    }
    queue() {
        const pending = new PendingPromise(this.PromiseCtor);
        this.pendingPromises.push(pending);
        return pending;
    }
    settlePending(method, value) {
        const { pendingPromises } = this;
        const lastPending = pendingPromises[pendingPromises.length - 1];
        const pending = lastPending && !lastPending.settled ? lastPending : this.queue();
        this.discardIfNeeded(pending[method](value));
    }
    discardIfNeeded(pending) {
        if (pending.settled && pending.polled) {
            const index = this.pendingPromises.indexOf(pending);
            this.pendingPromises.splice(index, 1);
        }
    }
}
