import { Ok, Err } from "../src/result";

describe("Ok Result Tests", () => {
  test("should return a Result reporting isOk status", () => {
    expect(Ok("").isOk()).toBe(true);
  });

  test("should return a Result not reporting isErr status", () => {
    expect(Ok("").isErr()).toBe(false);
  });

  test("should return a Result which can be unwraped to get 'OK' value", () => {
    expect(Ok("OK").unwrap()).toBe("OK");
  });

  test("should return a Result with ok value equal to 'OK'", () => {
    expect(Ok("OK").ok()).toBe("OK");
  });

  test("should return a Result which has null  error value", () => {
    expect(Ok("OK").error()).toBeNull();
  });

  test("calling unwrapErr on Ok Result should throw original value", () => {
    expect(Ok("OK").unwrapErr).toThrow("OK");
  });

  test("calling unwrapOr on Ok Result should return original value", () => {
    expect(Ok("OK").unwrapOr("DEFAULT")).toBe("OK");
  });

  test("calling unwrapOrElse on Ok Result should return original value", () => {
    expect(Ok("OK").unwrapOrElse(() => "DEFAULT")).toBe("OK");
  });

  test("calling unwrapOrElse on Ok Result should not endup with a call to the given closure", () => {
    const closure = jest.fn();
    expect(Ok("OK").unwrapOrElse(closure)).toBe("OK");
    expect(closure).toHaveBeenCalledTimes(0);
  });
});

describe("Result 'or' function Tests", () => {
  const firstOk = Ok<unknown, unknown>("FIRST_OK");
  const secondOk = Ok<unknown, unknown>("SECOND_OK");

  const firstErr = Err<unknown, unknown>("FIRST_ERR");
  const secondErr = Err<unknown, unknown>("SECOND_ERR");

  test("should return first Result if first Result is Ok", () => {
    expect(firstOk.or(secondOk)).toBe(firstOk);
  });

  test("should return second Result if first Result is Err", () => {
    expect(firstErr.or(secondOk)).toBe(secondOk);
  });

  test("should return second Err Result if both Results are Err", () => {
    expect(firstErr.or(secondErr).isErr()).toBe(true);
  });

  test("should return first Ok Result if both Results are Ok", () => {
    expect(firstOk.or(secondOk).isOk()).toBe(true);
  });
});

describe("Result 'and' function Tests", () => {
  const firstOk = Ok<unknown, unknown>("FIRST_OK");
  const secondOk = Ok<unknown, unknown>("SECOND_OK");

  const firstErr = Err<unknown, unknown>("FIRST_ERR");
  const secondErr = Err<unknown, unknown>("SECOND_ERR");

  test("should return second result if first one is Ok", () => {
    expect(firstOk.and(secondErr)).toBe(secondErr);
  });

  test("should return first result if it is Err", () => {
    expect(firstErr.and(secondOk)).toBe(firstErr);
  });

  test("should return first result if both are Err", () => {
    expect(firstErr.and(secondErr)).toBe(firstErr);
  });

  test("should return second result if both are Ok", () => {
    expect(firstOk.and(secondOk)).toBe(secondOk);
  });
});

describe("Err Result Tests", () => {
  test("should return a Result not reporting isOk status", () => {
    expect(Err("").isOk()).toBe(false);
  });

  test("should return a Result reporting isErr status", () => {
    expect(Err("").isErr()).toBe(true);
  });

  test("should return a Result which throw 'ERROR' on being unwraped", () => {
    expect(Err("ERROR").unwrap).toThrow("ERROR");
  });

  test("should return a Result with error value equal to 'ERROR'", () => {
    expect(Err("ERROR").error()).toBe("ERROR");
  });

  test("should return a Result which has null ok value", () => {
    expect(Err("OK").ok()).toBeNull();
  });

  test("should return a Result with error value equal to 'ERROR'", () => {
    expect(Err("ERROR").error()).toBe("ERROR");
  });

  test("calling unwrapErr on Err Result should return error value", () => {
    expect(Err("ERROR").unwrapErr()).toBe("ERROR");
  });

  test("calling unwrapOr on Err Result should return default value", () => {
    expect(Err("ERROR").unwrapOr("DEFAULT")).toBe("DEFAULT");
  });

  test("calling unwrapOrElse on Err Result should return default value provided by closure", () => {
    expect(Err("ERROR").unwrapOrElse(() => "DEFAULT")).toBe("DEFAULT");
  });

  test("calling unwrapOrElse on Err Result should call closure exactly once", () => {
    const closure = jest.fn().mockReturnValue("DEFAULT");
    expect(Err("ERROR").unwrapOrElse(closure)).toBe("DEFAULT");
    expect(closure).toHaveBeenCalledTimes(1);
  });
});

describe("Deconstructing Result Tests", () => {
  test("should return a Result that can be decunstructed to { res, err }", () => {
    expect(Ok("OK")).toEqual(expect.objectContaining({ res: "OK" }));
    expect(Err("ERROR")).toEqual(expect.objectContaining({ err: "ERROR" }));
  });

  test("should return a Result that can be decunstructed as a tuple to [res, err]", () => {
    expect(Ok("OK")).toEqual(expect.arrayContaining(["OK", null]));
    expect(Err("ERROR")).toEqual(expect.arrayContaining([null, "ERROR"]));
  });
});
