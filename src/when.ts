import { Ok, Err } from "./result";
import type { Result } from "./result";
import type { Matcher, MatchTransform } from "./matcher";

/**
 * Creates a matcher that will match to either `Ok` or `Err` `Result`s.
 *
 * @remarks
 * See {@link Result.match | the Result matching} for more details.
 *
 * @param pattern - The pattern can be either `Ok` or `Err` functions.
 * @param transform - The transform function will take the result value or error value and will return the result of the match function.
 *
 * @returns A matcher that can be used in the `Result` `match` function.
 *
 * @example:
 * Here's a simple example:
 * ```
 * const result = await try$(primeAsync());
 * const message = result.match(
 *  when(Ok, (num) => `${num} is prime!`),
 *  when(Err, (err) => `Failed to make a prime number with Error: ${err}`)
 * );
 * console.log(message);
 * ```
 */
function when<TResult, TError, TMatchResult>(
  pattern: typeof Ok | typeof Err,
  transform: MatchTransform<TResult, TError, TMatchResult>
): Matcher<TResult, TError, TMatchResult> {
  return {
    condition: <TResult, TError>(result: Result<TResult, TError>): boolean => {
      if (pattern === Ok && result.isOk()) {
        return true;
      } else if (pattern == Err && result.isErr()) {
        return true;
      } else {
        return false;
      }
    },
    transform,
  };
}

export default when;
