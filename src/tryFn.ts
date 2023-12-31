import type { Result } from "./result";
import { Ok, Err } from "./result";

/**
 * Generic type for referencing any function with its included arguments and return type.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any;

/**
 * It will execute a function with the given arguments,
 * And will return its result or the error it may have thrown.
 *
 * @param fn - The function which is going to get executed safely.
 *
 * @returns A `Result` containing the result of `fn` or the error it may have thrown.
 */
function tryFn$<TFunc extends AnyFunction, TError = any>( // eslint-disable-line @typescript-eslint/no-explicit-any
  fn: TFunc,
  ...args: Parameters<TFunc>
): Result<ReturnType<TFunc>, TError> {
  try {
    const result: ReturnType<TFunc> = fn(...args);
    return Ok(result);
  } catch (err) {
    return Err(err as TError);
  }
}

export default tryFn$;
