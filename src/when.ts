import { Ok, Err } from "./result";
import type { Result } from "./result";
import type { Matcher, MatchTransform } from "./matcher";

function when<TResult, TError, TMatchResult>(
  pattern: typeof Ok | typeof Err,
  transform: MatchTransform<TResult, TError, TMatchResult>
): Matcher<TResult, TError, TMatchResult> {
  return {
    condition: <TResult, TError>(result: Result<TResult, TError>): boolean => {
      if (pattern === Ok && result.isOk()) {
        return true;
      } else if (pattern == Err && result.isErr()) {
        return false;
      } else {
        throw "This shouldn't happen!";
      }
    },
    transform,
  };
}

export default when;
