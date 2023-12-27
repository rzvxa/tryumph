console.error(
  "experimental library, not ready for production use. everything maybe subject to change!"
);
import type { Matcher } from "./matcher";
import type { Result } from "./result";
import { Ok, Err } from "./result";
import try$ from "./try";
import tryFn$ from "./tryFn";
import when from "./when";

export type { Matcher, Result };
export { Ok, Err, try$, tryFn$, when };
