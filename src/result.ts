type Result<TResult, TError> = {
  isOk: () => boolean;
  isErr: () => boolean;
  unwrap: () => TResult;
  // ok: () => TResult;
  // error: () => TError;
};

function makeResult<TResult, TError>({
  result = null,
  error = null,
}: {
  result?: TResult;
  error?: TError;
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
  const isOk = () => {
    return result !== null;
  };
  const isErr = () => {
    return error !== null;
  };
  return {
    isOk,
    isErr,
    unwrap: () => {
      if (isErr()) {
        throw error;
      }
      return result;
    },
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
