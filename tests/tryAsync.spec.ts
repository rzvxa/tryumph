import { wrapValue, wrapError } from "./wrapAsync";
import { Ok, Err } from "../src/result";
import tryAsync from "../src/tryAsync";

describe("tryAsync Tests", () => {
  test("should not throw error on resolving faulty promises", async () => {
    await expect(
      tryAsync(wrapError("ERROR"))
    ).resolves.toBeTruthy();
  });

  test("should resolve on promises that resolve", async () => {
    await expect(
      tryAsync(wrapValue("OK"))
    ).resolves.toBeTruthy();
  });
});
