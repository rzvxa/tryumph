import type { Result } from "./result";
/**
 * Generic type for referencing any function with its included arguments and return type.
 */
type AnyFunction = (...args: any[]) => any;
/**
 * It will execute a function with the given arguments,
 * And will return its result or the error it may have thrown.
 *
 * @param fn - The function which is going to get executed safely.
 *
 * @returns A `Result` containing the result of `fn` or the error it may have thrown.
 */
declare function tryFn$<TError, TFunc extends AnyFunction>(fn: TFunc, ...args: Parameters<TFunc>): Result<ReturnType<TFunc>, TError>;
export default tryFn$;
//# sourceMappingURL=tryFn.d.ts.map