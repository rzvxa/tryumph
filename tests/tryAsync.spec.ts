import tryAsync from "../src/tryAsync";

describe("tryAsync Tests", () => {
  const resolveMock = jest.fn().mockResolvedValue("OK");
  const rejectMock = jest.fn().mockRejectedValue("ERROR");
  test("should not throw error on resolving faulty promises", async () => {
    await expect(tryAsync(rejectMock())).resolves.toBeTruthy();
  });

  test("should resolve on promises that resolve", async () => {
    await expect(tryAsync(resolveMock())).resolves.toBeTruthy();
  });

  test("should return a ok result that reports isOk", async () => {
    const result = await tryAsync(resolveMock());
    expect(result.isOk()).toEqual(true);
  });

  test("should return a ok result that can unwrap 'OK' value", async () => {
    const result = await tryAsync(resolveMock());
    expect(result.unwrap()).toEqual("OK");
  });

  test("should return a ok result that does not report isErr", async () => {
    const result = await tryAsync(resolveMock());
    expect(result.isErr()).toEqual(false);
  });
});
