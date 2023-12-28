"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const result_1 = require("./result");
/**
 * It will try and catch the possible errors during execution of the given `Promise`,
 * And then it will return the resulting value or the thrown error.
 *
 * @param promise - The `Promise` to be executed safely.
 *
 * @returns A `Promise` to a `Result` containing the result of `promise` or the error it may have thrown.
 */
async function try$(promise) {
    try {
        const result = await promise;
        return (0, result_1.Ok)(result);
    }
    catch (err) {
        return (0, result_1.Err)(err);
    }
}
exports.default = try$;
//# sourceMappingURL=try.js.map