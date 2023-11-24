import { ObservableAsyncIteratorImpl } from './iterator';
export function toAsyncIterable(obs, promiseCtor) {
    return {
        [Symbol.asyncIterator]() {
            return new ObservableAsyncIteratorImpl(obs, promiseCtor);
        },
    };
}
