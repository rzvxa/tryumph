"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const result_1 = require("./result");
/**
 * Creates a matcher that will match to either `Ok` or `Err` `Result`s.
 *
 * @remarks
 * See {@link Result.match | the Result matching} for more details.
 *
 * @param pattern - The pattern can be either `Ok` or `Err` functions.
 * @param transform - The transform function will take the result value or error value and will return the result of the match function.
 *
 * @returns A matcher that can be used in the `Result` `match` function.
 *
 * @example:
 * Here's a simple example:
 * ```
 * const result = await try$(primeAsync());
 * const message = result.match(
 *  when(Ok, (num) => `${num} is prime!`),
 *  when(Err, (err) => `Failed to make a prime number with Error: ${err}`)
 * );
 * console.log(message);
 * ```
 */
function when(pattern, transform) {
    return {
        condition: (result) => {
            if (pattern === result_1.Ok && result.isOk()) {
                return true;
            }
            else if (pattern == result_1.Err && result.isErr()) {
                return true;
            }
            else {
                return false;
            }
        },
        transform,
    };
}
exports.default = when;
//# sourceMappingURL=when.js.map