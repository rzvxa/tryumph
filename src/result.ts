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

  isOk = (): boolean => this.#result !== undefined;
  isErr = (): boolean => this.#error !== undefined;

  ok = (): TResult => this.#result!;
  error = (): TError => this.#error!;

  unwrap = (): TResult => {
    if (this.isOk()) {
      return this.#result!;
    } else {
      throw this.#error;
    }
  };

  unwrapErr = (): TError => {
    if (this.isErr()) {
      return this.#error!;
    } else {
      throw this.#result;
    }
  };

  unwrapOr = (defaultResult: TResult): TResult => {
    if (this.isErr()) {
      return defaultResult;
    } else {
      return this.#result!;
    }
  };

  unwrapOrElse = (defaultProvider: (error: TError) => TResult): TResult => {
    if (this.isErr()) {
      return defaultProvider(this.#error!);
    } else {
      return this.#result!;
    }
  };
}

function Ok<TResult, TError>(result: TResult): Result<TResult, TError> {
  return new Result({ result });
}

function Err<TResult, TError>(error: TError): Result<TResult, TError> {
  return new Result({ error });
}

export type { Result };
export { Ok, Err };
