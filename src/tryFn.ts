import type { Result } from "./result";
import { Ok, Err } from "./result";

type AnyFunction = (...args: any[]) => any;

async function tryFn$<TError, TFunc extends AnyFunction>(
  fn: TFunc,
  ...args: Parameters<TFunc>
): Promise<Result<ReturnType<TFunc>, TError>> {
  try {
    const result: ReturnType<TFunc> = await fn(...args);
    return Ok(result);
  } catch (err) {
    return Err(err as TError);
  }
}

export default tryFn$;
