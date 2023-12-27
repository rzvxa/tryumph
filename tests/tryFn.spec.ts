import try$ from "../src/try";
import tryFn$ from "../src/tryFn";

describe("tryFn$ Tests", () => {
  const resolveMock = jest.fn(
    async (
      a: number,
      b: string,
      c: boolean
    ): Promise<[number, string, boolean]> => [a, b, c]
  );
  const rejectMock = jest
    .fn(async (a: number, b: string, c: boolean) => [a, b, c])
    .mockRejectedValue("ERR");
  const a = 1;
  const b = "1";
  const c = true;
  test("should not throw error on resolving faulty promises", async () => {
    await expect(tryFn$(rejectMock, a, b, c)).resolves.toBeTruthy();
  });

  test("should resolve on promises that resolve", async () => {
    await expect(tryFn$(resolveMock, a, b, c)).resolves.toBeTruthy();
  });

  test("should return a ok result that reports isOk", async () => {
    const result = await tryFn$(resolveMock, a, b, c);
    expect(result.isOk()).toEqual(true);
  });

  test("should return a ok result that can unwrap [a, b, c] value", async () => {
    const result = await tryFn$(resolveMock, a, b, c);
    expect(result.unwrap()).toEqual([a, b, c]);
  });

  test("should return a ok result that does not report isErr", async () => {
    const result = await tryFn$(resolveMock, a, b, c);
    expect(result.isErr()).toEqual(false);
  });

  test("should return a err result that has 'ERR' as error value", async () => {
    const result = await tryFn$(rejectMock, a, b, c);
    expect(result.error()).toEqual("ERR");
  });
});
