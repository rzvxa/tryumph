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

  test("should return a Result which has undefined  error value", () => {
    expect(Ok("OK").error()).toBeUndefined();
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

  test("should return a Result which has undefined ok value", () => {
    expect(Err("OK").ok()).toBeUndefined();
  });

  test("should return a Result with error value equal to 'ERROR'", () => {
    expect(Err("ERROR").error()).toBe("ERROR");
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
