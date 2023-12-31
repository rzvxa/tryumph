import type { Matcher } from "./matcher";
import TupleConstructor from "./tupleConstructor";

/**
 * A `Result` can either contain a result value or an error value.
 *
 * @sealed
 */
class Result<TResult, TError> extends TupleConstructor<TResult, TError> {
  private readonly containsAmbiguousError!: boolean;

  /**
   * Get the result value.
   *
   * @returns The result value if it exists otherwise it will return `null`.
   */
  public get res(): TResult | null {
    return this[0];
  }

  /**
   * Get the error value.
   *
   * @returns The error value if it exists otherwise it will return `null`.
   *
   */
  public get err(): TError | null {
    return this[1];
  }

  /**
   * Creates an `Ok` `Result`.
   *
   * @param result - The result value.
   *
   * @returns A `Result` object containing the given result value.
   */
  static makeOk = <R, E>(result: R): Result<R, E> => {
    return new Result<R, E>({ result });
  };

  /**
   * Creates an `Err` `Result`.
   *
   * @param error - The error value.
   *
   * @returns A `Result` object containing the given error value.
   */
  static makeErr = <R, E>(error: E): Result<R, E> => {
    const self = new Result<R, E>({ error });
    if (!error) {
      // @ts-expect-error this field is supposed to be set by makeErr function
      self.containsAmbiguousError = true;
    }
    return self;
  };

  /**
   * Create a Result.
   *
   * @param options - The result initialization options.
   * @param options.result - The result value, should be left `null` in `Err` results.
   * @param options.error - The result error, should be left `null` in `Ok` results.
   *
   * @internal
   */
  private constructor({
    result = null,
    error = null,
  }: {
    result?: TResult | null;
    error?: TError | null;
  }) {
    super(result, error);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this as any).__proto__ = Result.prototype;
  }

  /**
   * Check if the `Result` has a value.
   *
   * @returns `true` if the result is `Ok`.
   */
  isOk = (): boolean => this.err === null;

  /**
   * Check if the `Result` has an error.
   *
   * @returns `true` if the result is `Err`.
   */
  isErr = (): boolean =>
    this.err !== null || this.containsAmbiguousError || this.isOk === null;

  /**
   * Get the result value.
   *
   * @returns The result value if it exists otherwise it will return `null`.
   */
  ok = (): TResult => this.res!;

  /**
   * Get the error value.
   *
   * @returns The error value if it exists otherwise it will return `null`.
   */
  error = (): TError => this.err!;

  /**
   * Returns the contained result value.
   *
   * @throws If value is an error it will throw it.
   *
   * @returns The result value.
   */
  unwrap = (): TResult => {
    if (this.isOk()) {
      return this.res!;
    } else {
      throw this.err;
    }
  };

  /**
   * Returns the contained error value.
   *
   * @throws If result is `Ok` it will throw the result value as an error.
   *
   * @returns The error value.
   */
  unwrapErr = (): TError => {
    if (this.isErr()) {
      return this.err!;
    } else {
      throw this.res;
    }
  };

  /**
   * Returns the contained result value or a provided default.
   *
   * @param defaultResult - The default value that gets returned in case of an `Err`.
   *
   * @returns The result value or provided default.
   */
  unwrapOr = (defaultResult: TResult): TResult => {
    if (this.isErr()) {
      return defaultResult;
    } else {
      return this.res!;
    }
  };

  /**
   * Returns the contained result value or computes it from a closure.
   *
   * @param defaultProvider - The closure that will provide the default value in case of an `Err`.
   *
   * @returns The result value or provided default via given closure.
   */
  unwrapOrElse = (defaultProvider: (error: TError) => TResult): TResult => {
    if (this.isErr()) {
      return defaultProvider(this.err!);
    } else {
      return this.res!;
    }
  };

  /**
   * Returns the `other` result if this is `Err`, otherwise it will return itself.
   *
   * @param other - The other `Result`.
   *
   * @returns The `other` result if this is `Err`, otherwise it will return itself.
   */
  or = (other: Result<TResult, TError>): Result<TResult, TError> => {
    if (this.isOk()) {
      return this;
    } else {
      return other;
    }
  };

  /**
   * Returns the result of `transform` function if this is `Err`, otherwise it will return itself.
   *
   * @param transform - The function to generate the other `Result`.
   *
   * @returns The the result of `transform` function if this is `Err`, otherwise it will return itself.
   */
  orThen = (
    transform: (res: Result<TResult, TError>) => Result<TResult, TError>
  ): Result<TResult, TError> => {
    if (this.isOk()) {
      return this;
    } else {
      return transform(this);
    }
  };

  /**
   * Returns the `other` result if this is `Ok`, otherwise returns the error value of itself.
   *
   * @param other - The other `Result`.
   *
   * @returns The `other` result if this is `Ok`, otherwise returns the error value of itself.
   */
  and = <TNewResult>(
    other: Result<TNewResult, TError>
  ): Result<TNewResult, TError> => {
    if (this.isErr()) {
      return this as unknown as Result<TNewResult, TError>;
    } else {
      return other;
    }
  };

  /**
   * Returns the result of the `transform` function if this is `Ok`, otherwise returns the error value of itself.
   *
   * @param transform - The function to generate the other `Result`.
   *
   * @returns The result of the `transform` function if this is `Ok`, otherwise returns the error value of itself.
   */
  andThen = <TNewResult>(
    transform: (res: Result<TResult, TError>) => Result<TNewResult, TError>
  ): Result<TNewResult, TError> => {
    if (this.isErr()) {
      return this as unknown as Result<TNewResult, TError>;
    } else {
      return transform(this);
    }
  };

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
  match = <TMatchResult>(
    ...matchers: Matcher<TResult, TError, TMatchResult>[]
  ): TMatchResult => {
    const match = matchers.find((matcher) => matcher.condition(this));
    if (match) {
      return match.transform(this);
    } else {
      throw "Non exhaustive pattern matching is not allowed!";
    }
  };
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
const Ok = Result.makeOk;

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
const Err = Result.makeErr;

export type { Result };
export { Ok, Err };
