import tryFn$ from "../src/tryFn";

describe("tryFn$ Tests", () => {
  const resolveMock = jest.fn(
    (a: number, b: string, c: boolean): [number, string, boolean] => [a, b, c]
  );
  const rejectMock = jest.fn(
    (_a: number, _b: string, _c: boolean): [number, string, boolean] => {
      throw "ERR";
    }
  );
  const a = 1;
  const b = "1";
  const c = true;
  test("should not throw error on execution of a faulty function", () => {
    expect(tryFn$(rejectMock, a, b, c)).toBeTruthy();
  });

  test("should return on functions that also return", () => {
    expect(tryFn$(resolveMock, a, b, c)).toBeTruthy();
  });

  test("should return a ok result that reports isOk", () => {
    expect(tryFn$(resolveMock, a, b, c).isOk()).toEqual(true);
  });

  test("should return a ok result that can unwrap [a, b, c] value", () => {
    expect(tryFn$(resolveMock, a, b, c).unwrap()).toEqual([a, b, c]);
  });

  test("should return a ok result that does not report isErr", () => {
    expect(tryFn$(resolveMock, a, b, c).isErr()).toEqual(false);
  });

  test("should return a err result that has 'ERR' as error value", () => {
    expect(tryFn$(rejectMock, a, b, c).error()).toEqual("ERR");
  });
});
