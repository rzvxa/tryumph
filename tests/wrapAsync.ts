async function wrapValue<TResult>(value: TResult): Promise<TResult> {
  return value;
}

async function wrapError<TError>(error: TError): Promise<unknown> {
  throw error;
}

export { wrapValue, wrapError };
