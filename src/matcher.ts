import type { Result } from "./result";

type MatchCondition<TResult, TError> = (
  result: Result<TResult, TError>
) => boolean;

type MatchTransform<TResult, TError, TMatchResult> = (
  result: Result<TResult, TError>
) => TMatchResult;

type Matcher<TResult, TError, TMatchResult> = {
  condition: MatchCondition<TResult, TError>;
  transform: MatchTransform<TResult, TError, TMatchResult>;
};

export type { Matcher, MatchCondition, MatchTransform };
