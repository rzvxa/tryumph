import try$ from "../src/try";

describe("try$ Tests", () => {
  const resolveMock = jest.fn().mockResolvedValue("OK");
  const rejectMock = jest.fn().mockRejectedValue("ERROR");
  test("should not throw error on resolving faulty promises", async () => {
    await expect(try$(rejectMock())).resolves.toBeTruthy();
  });

  test("should resolve on promises that resolve", async () => {
    await expect(try$(resolveMock())).resolves.toBeTruthy();
  });

  test("should return a ok result that reports isOk", async () => {
    const result = await try$(resolveMock());
    expect(result.isOk()).toEqual(true);
  });

  test("should return a ok result that can unwrap 'OK' value", async () => {
    const result = await try$(resolveMock());
    expect(result.unwrap()).toEqual("OK");
  });

  test("should return a ok result that does not report isErr", async () => {
    const result = await try$(resolveMock());
    expect(result.isErr()).toEqual(false);
  });
});
