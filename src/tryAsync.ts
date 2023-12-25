import type { Result } from "./result";
import { Ok, Err } from "./result";

async function tryAsync<TResult, TError>(
  promise: Promise<TResult>
): Promise<Result<TResult, TError>> {
  try {
    const result = await promise;
    return Ok(result);
  } catch (err) {
    return Err(err);
  }
}

export default tryAsync;
