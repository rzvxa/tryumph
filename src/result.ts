type Result<TResult, TError> = {
  isOk: () => boolean;
  isErr: () => boolean;
  unwrap: () => TResult;
  ok: () => TResult;
  error: () => TError;
};

function isOk<TResult, TError>(
  result: TResult | null,
  error: TError | null
): boolean {
  return result !== null;
}

function isErr<TResult, TError>(
  result: TResult | null,
  error: TError | null
): boolean {
  return error !== null;
}

function unwrap<TResult, TError>(
  result: TResult | null,
  error: TError | null
): TResult {
  if (isErr(result, error)) {
    throw error;
  } else {
    return result!;
  }
}

function getOk<TResult, TError>(
  result: TResult | null,
  error: TError | null
): TResult {
  if (isErr(result, error)) {
    throw "Illegal attempt to access result value on a Err result! Check if the result 'isOk' before calling this function.";
  } else {
    return result!;
  }
}

function getError<TResult, TError>(
  result: TResult | null,
  error: TError | null
): TError {
  if (isOk(result, error)) {
    throw "Illegal attempt to access error value on a Ok result! Check if the result 'isErr' before calling this function.";
  } else {
    return error!;
  }
}

function makeResult<TResult, TError>({
  result = null,
  error = null,
}: {
  result?: TResult | null;
  error?: TError | null;
}): Result<TResult, TError> {
  if (result === null && error === null) {
    throw Error(
      "No result nor error where provided, You should provide at least one in order to make a result"
    );
  }
  if (result && error) {
    throw Error(
      "Both result and error where provided, You should only pass one to the constructor"
    );
  }

  return {
    isOk: () => isOk(result, error),
    isErr: () => isErr(result, error),
    unwrap: () => unwrap(result, error),
    ok: () => getOk(result, error),
    error: () => getError(result, error),
  };
}

function Ok<TResult, TError>(result: TResult): Result<TResult, TError> {
  return makeResult({ result });
}

function Err<TResult, TError>(error: TError): Result<TResult, TError> {
  return makeResult({ error });
}

export type { Result };
export { Ok, Err };
