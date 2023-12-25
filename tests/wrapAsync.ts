async function wrapValue<TResult>(value: TResult) {
  return value;
}

async function wrapError<TResult>(error: TResult) {
  throw error;
}

export { wrapValue, wrapError };
