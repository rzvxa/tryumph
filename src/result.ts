type Result<TResult, TError> = {
  isOk: () => boolean;
  isErr: () => boolean;
  unwrap: () => TResult;
  unwrapErr: () => TError;
  unwrapOr: (defaultResult: TResult) => TResult;
  unwrapOrElse: (defaultProvider: (error: TError) => TResult) => TResult;
  ok: () => TResult | undefined;
  error: () => TError | undefined;
};

function makeResult<TResult, TError>({
  result = undefined,
  error = undefined,
}: {
  result?: TResult | undefined;
  error?: TError | undefined;
}): Result<TResult, TError> {
  if (result === undefined && error === undefined) {
    throw Error(
      "No result nor error where provided, You should provide at least one in order to make a result"
    );
  }
  if (result && error) {
    throw Error(
      "Both result and error where provided, You should only pass one to the constructor"
    );
  }

  const isOk = () => result !== undefined;
  const isErr = () => error !== undefined;

  return {
    isOk,
    isErr,
    unwrap: () => {
      if (isOk()) {
        return result!;
      } else {
        throw error;
      }
    },
    unwrapErr: () => {
      if (isErr()) {
        return error!;
      } else {
        throw result;
      }
    },
    unwrapOr: (defaultResult: TResult) => {
      if (isErr()) {
        return defaultResult;
      } else {
        return result!;
      }
    },
    unwrapOrElse: (defaultProvider: (error: TError) => TResult) => {
      if (isErr()) {
        return defaultProvider(error!);
      } else {
        return result!;
      }
    },
    ok: () => result,
    error: () => error,
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
