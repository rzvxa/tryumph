import { wrapValue, wrapError } from "./wrapAsync";
import { Ok, Err } from "../src/result";
import tryAsync from "../src/tryAsync";

describe("tryAsync Tests", () => {
  test("should return Ok result containing the value 'OK'", async () => {
    await expect(tryAsync<string, Error>(wrapValue("OK"))).resolves.toEqual(
      Ok("OK")
    );
  });
});
