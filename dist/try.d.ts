import type { Result } from "./result";
/**
 * It will try and catch the possible errors during execution of the given `Promise`,
 * And then it will return the resulting value or the thrown error.
 *
 * @param promise - The `Promise` to be executed safely.
 *
 * @returns A `Promise` to a `Result` containing the result of `promise` or the error it may have thrown.
 */
declare function try$<TResult, TError>(promise: Promise<TResult>): Promise<Result<TResult, TError>>;
export default try$;
//# sourceMappingURL=try.d.ts.map