import type { Matcher } from "./matcher";

const tupleConstructor: new <T, Y>(...p: [T | null, Y | null]) => [
  T | null,
  Y | null
] = Array as any;

class Result<TResult, TError> extends tupleConstructor<TResult, TError> {
  public get res(): TResult | null {
    return this[0];
  }

  public get err(): TError | null {
    return this[1];
  }

  constructor({
    result = null,
    error = null,
  }: {
    result?: TResult | null;
    error?: TError | null;
  }) {
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

    super(result, error);
    (this as any).__proto__ = Result.prototype;
  }

  isOk = (): boolean => this.res !== null;
  isErr = (): boolean => this.err !== null;

  ok = (): TResult => this.res!;
  error = (): TError => this.err!;

  unwrap = (): TResult => {
    if (this.isOk()) {
      return this.res!;
    } else {
      throw this.err;
    }
  };

  unwrapErr = (): TError => {
    if (this.isErr()) {
      return this.err!;
    } else {
      throw this.res;
    }
  };

  unwrapOr = (defaultResult: TResult): TResult => {
    if (this.isErr()) {
      return defaultResult;
    } else {
      return this.res!;
    }
  };

  unwrapOrElse = (defaultProvider: (error: TError) => TResult): TResult => {
    if (this.isErr()) {
      return defaultProvider(this.err!);
    } else {
      return this.res!;
    }
  };

  or = (other: Result<TResult, TError>): Result<TResult, TError> => {
    if (this.isOk()) {
      return this;
    } else {
      return other;
    }
  };

  and = <TResult>(other: Result<TResult, TError>): Result<TResult, TError> => {
    if (this.isErr()) {
      return this as unknown as Result<TResult, TError>;
    } else {
      return other;
    }
  };

  match = <TMatchResult>(
    ...matchers: Matcher<TResult, TError, TMatchResult>[]
  ): TMatchResult => {
    const match = matchers.find((matcher) => matcher.condition(this));
    if (match) {
      return match.transform(this);
    } else {
      throw "Non exhaustive pattern matching is not allowed!";
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
