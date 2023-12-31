import dwait from "dwait";

import type { Result } from "./result";
import type Dwaitable from "./Dwaitable";
import { Ok, Err } from "./result";

/**
 * It will try and catch the possible errors during execution of the given `Promise`,
 * And then it will return the resulting value or the thrown error.
 *
 * @param promise - The `Promise` to be executed safely.
 *
 * @returns A `Promise` to a `Result` containing the result of `promise` or the error it may have thrown.
 */
function try$<TResult, TError = any>( // eslint-disable-line @typescript-eslint/no-explicit-any
  promise: Promise<TResult>
): Promise<Result<TResult, TError>> & Dwaitable<Result<TResult, TError>> {
  const task = Promise.resolve(promise)
    .then((result) => Ok<TResult, TError>(result))
    .catch((err) => Err(err as TError));
  // @ts-expect-error adding dwait to the result promise
  task.dwait = () => dwait(task);
  return task as Promise<Result<TResult, TError>> &
    Dwaitable<Result<TResult, TError>>;
}

export default try$;
