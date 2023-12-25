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

  test("should return undefiend if we attempt to read it's error value", () => {
    expect(Ok("OK").error()).toBeUndefined();
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

  test("should return undefined if we attempt to read it's ok value", () => {
    expect(Err("OK").ok()).toBeUndefined();
  });

  test("should return a Result with error value equal to 'ERROR'", () => {
    expect(Err("ERROR").error()).toBe("ERROR");
  });
});
