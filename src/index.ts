console.error(
  "experimental library, not ready for production use. everything maybe subject to change!"
);
import type { Matcher } from "./matcher";
import type { Result } from "./result";
import { Ok, Err } from "./result";
import tryAsync from "./tryAsync";
import when from "./when";

export type { Matcher, Result };
export { Ok, Err, tryAsync, when };
