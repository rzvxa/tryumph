import type { MatchTransform } from "../src/matcher";
import type { Result } from "../src/result";
import { Ok, Err } from "../src/result";
import when from "../src/when";

describe("when Tests", () => {
  const transform: MatchTransform<unknown, unknown, unknown> = (a) => a;
  const okResult: Result<unknown, unknown> = Ok({} as unknown);
  const errResult: Result<unknown, unknown> = Err({} as unknown);

  test("should return a Matcher with the give transform", () => {
    expect(when(Ok, transform)).toEqual(expect.objectContaining({ transform }));
  });

  test("when matching with Ok should return a Matcher that will match with Ok Result", () => {
    expect(when(Ok, transform).condition(okResult)).toEqual(true);
  });

  test("when matching with Ok should return a Matcher that will not match with Err Result", () => {
    expect(when(Ok, transform).condition(errResult)).toEqual(false);
  });

  test("when matching with Err should return a Matcher that will match with Err Result", () => {
    expect(when(Err, transform).condition(errResult)).toEqual(true);
  });

  test("when matching with Err should return a Matcher that will not match with Ok Result", () => {
    expect(when(Err, transform).condition(okResult)).toEqual(false);
  });
});
