import type { Matcher } from "./matcher";
import TupleConstructor from "./tupleConstructor";
/**
 * A `Result` can either contain a result value or an error value.
 *
 * @sealed
 */
declare class Result<TResult, TError> extends TupleConstructor<TResult, TError> {
    private readonly containsAmbiguousError;
    /**
     * Get the result value.
     *
     * @returns The result value if it exists otherwise it will return `null`.
     */
    get res(): TResult | null;
    /**
     * Get the error value.
     *
     * @returns The error value if it exists otherwise it will return `null`.
     *
     */
    get err(): TError | null;
    /**
     * Creates an `Ok` `Result`.
     *
     * @param result - The result value.
     *
     * @returns A `Result` object containing the given result value.
     */
    static makeOk: <R, E>(result: R) => Result<R, E>;
    /**
     * Creates an `Err` `Result`.
     *
     * @param error - The error value.
     *
     * @returns A `Result` object containing the given error value.
     */
    static makeErr: <R, E>(error: E) => Result<R, E>;
    /**
     * Create a Result.
     *
     * @param options - The result initialization options.
     * @param options.result - The result value, should be left `null` in `Err` results.
     * @param options.error - The result error, should be left `null` in `Ok` results.
     *
     * @internal
     */
    private constructor();
    /**
     * Check if the `Result` has a value.
     *
     * @returns `true` if the result is `Ok`.
     */
    isOk: () => boolean;
    /**
     * Check if the `Result` has an error.
     *
     * @returns `true` if the result is `Err`.
     */
    isErr: () => boolean;
    /**
     * Get the result value.
     *
     * @returns The result value if it exists otherwise it will return `null`.
     */
    ok: () => TResult;
    /**
     * Get the error value.
     *
     * @returns The error value if it exists otherwise it will return `null`.
     */
    error: () => TError;
    /**
     * Returns the contained result value.
     *
     * @throws If value is an error it will throw it.
     *
     * @returns The result value.
     */
    unwrap: () => TResult;
    /**
     * Returns the contained error value.
     *
     * @throws If result is `Ok` it will throw the result value as an error.
     *
     * @returns The error value.
     */
    unwrapErr: () => TError;
    /**
     * Returns the contained result value or a provided default.
     *
     * @param defaultResult - The default value that gets returned in case of an `Err`.
     *
     * @returns The result value or provided default.
     */
    unwrapOr: (defaultResult: TResult) => TResult;
    /**
     * Returns the contained result value or computes it from a closure.
     *
     * @param defaultProvider - The closure that will provide the default value in case of an `Err`.
     *
     * @returns The result value or provided default via given closure.
     */
    unwrapOrElse: (defaultProvider: (error: TError) => TResult) => TResult;
    /**
     * Returns the `other` result if this is `Err`, otherwise it will return itself.
     *
     * @param other - The other `Result`.
     *
     * @returns The `other` result if this is `Err`, otherwise it will return itself.
     */
    or: (other: Result<TResult, TError>) => Result<TResult, TError>;
    /**
     * Returns the `other` result if this is `Ok`, otherwise returns the error value of itself.
     *
     * @param other - The other `Result`.
     *
     * @returns The `other` result if this is `Ok`, otherwise returns the error value of itself.
     */
    and: <TResultOther>(other: Result<TResultOther, TError>) => Result<TResultOther, TError>;
    /**
     * It will match the result with the given `Matcher`s and return the result.
     *
     * @param matchers - The given `Matcher`s for the pattern matching
     *
     * @returns Will find the first matching condition and uses that function to transform the result.
     *
     * @example
     * Here's a simple example:
     * ```
     * const result = await try$(itMayThrow());
     * return result.match(
     *  when(Ok, consumeResult),
     *  when(Err, handleError)
     * );
     * ```
     */
    match: <TMatchResult>(...matchers: Matcher<TResult, TError, TMatchResult>[]) => TMatchResult;
}
/**
 * Creates an `Ok` `Result`.
 *
 * @remarks
 *
 * This is just a public export of {@link Result.makeOk}
 *
 * @param result - The result value.
 *
 * @returns A `Result` object containing the given result value.
 */
declare const Ok: <R, E>(result: R) => Result<R, E>;
/**
 * Creates an `Err` `Result`.
 *
 * @remarks
 *
 * This is just a public export of {@link Result.makeErr}
 *
 * @param error - The error value.
 *
 * @returns A `Result` object containing the given error value.
 */
declare const Err: <R, E>(error: E) => Result<R, E>;
export type { Result };
export { Ok, Err };
//# sourceMappingURL=result.d.ts.map