import { Observable } from 'rxjs';
import { ObservableAsyncIterable } from './types';
export declare function toAsyncIterable<T>(obs: Observable<T>, promiseCtor?: PromiseConstructorLike): ObservableAsyncIterable<T>;
