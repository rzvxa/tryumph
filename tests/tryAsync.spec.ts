import type { Result } from "../src/result";

import { wrapValue, wrapError } from "./wrapAsync";
import { Ok, Err } from "../src/result";
import tryAsync from "../src/tryAsync";

describe("tryAsync Tests", () => {
  test("should not throw error on resolving faulty promises", async () => {
    await expect(tryAsync(wrapError("ERROR"))).resolves.toBeTruthy();
  });

  test("should resolve on promises that resolve", async () => {
    await expect(tryAsync(wrapValue("OK"))).resolves.toBeTruthy();
  });

  test("should return a ok result that reports isOk", async () => {
    const result = await tryAsync(wrapValue("OK"));
    expect(result.isOk()).toEqual(true)
  });

  test("should return a ok result that can unwrap 'OK' value", async () => {
    const result = await tryAsync(wrapValue("OK"));
    expect(result.unwrap()).toEqual("OK")
  });

  test("should return a ok result that does not report isErr", async () => {
    const result = await tryAsync(wrapValue("OK"));
    expect(result.isErr()).toEqual(false)
  });
});
