type Result<TResult, TError> = {
  result: TResult | null;
  error: TError | null;
};

function makeResult<TResult, TError>(
  result: TResult = null,
  error: TError = null
): Result<TResult, TError> {
  if (!result && !error) {
    throw Error(
      "No result nor error where provided, You should provide at least one in order to make a result"
    );
  }
  return {
    result: result || null,
    error: error || null,
  };
}

function Ok<TResult, TError>(result: TResult): Result<TResult, TError> {
  return makeResult(result);
}

function Err<TResult, TError>(error: TError): Result<TResult, TError> {
  return makeResult(null, error);
}

export type { Result };
export { Ok, Err };
