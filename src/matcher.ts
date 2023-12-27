import type { Result } from "./result";

/**
 * Match condition function signature.
 * */
type MatchCondition<TResult, TError> = (
  result: Result<TResult, TError>
) => boolean;

/**
 * Match transform function signature.
 * */
type MatchTransform<TResult, TError, TMatchResult> = (
  result: Result<TResult, TError>
) => TMatchResult;

/**
 * Matcher object type.
 * */
type Matcher<TResult, TError, TMatchResult> = {
  /**
   * Determines if this `Matcher` is a match with the given result or not.
   */
  condition: MatchCondition<TResult, TError>;

  /**
   * Transforms the given `Result` to the `TMatchResult`.
   */
  transform: MatchTransform<TResult, TError, TMatchResult>;
};

export type { Matcher, MatchCondition, MatchTransform };
