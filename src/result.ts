class Result<TResult, TError> {
  #result: TResult | undefined;
  #error: TError | undefined;

  constructor({
    result = undefined,
    error = undefined,
  }: {
    result?: TResult | undefined;
    error?: TError | undefined;
  }) {
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

    this.#result = result;
    this.#error = error;
  }

  isOk = () => this.#result !== undefined;
  isErr = () => this.#error !== undefined;
  unwrap = () => {
    if (this.isOk()) {
      return this.#result!;
    } else {
      throw this.#error;
    }
  };
  unwrapErr = () => {
    if (this.isErr()) {
      return this.#error!;
    } else {
      throw this.#result;
    }
  };
  unwrapOr = (defaultResult: TResult) => {
    if (this.isErr()) {
      return defaultResult;
    } else {
      return this.#result!;
    }
  };
  unwrapOrElse = (defaultProvider: (error: TError) => TResult) => {
    if (this.isErr()) {
      return defaultProvider(this.#error!);
    } else {
      return this.#result!;
    }
  };
  ok = () => this.#result;
  error = () => this.#error;
}

function Ok<TResult, TError>(result: TResult): Result<TResult, TError> {
  return new Result({ result });
}

function Err<TResult, TError>(error: TError): Result<TResult, TError> {
  return new Result({ error });
}

export type { Result };
export { Ok, Err };
