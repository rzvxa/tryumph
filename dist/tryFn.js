"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const result_1 = require("./result");
/**
 * It will execute a function with the given arguments,
 * And will return its result or the error it may have thrown.
 *
 * @param fn - The function which is going to get executed safely.
 *
 * @returns A `Result` containing the result of `fn` or the error it may have thrown.
 */
function tryFn$(fn, ...args) {
    try {
        const result = fn(...args);
        return (0, result_1.Ok)(result);
    }
    catch (err) {
        return (0, result_1.Err)(err);
    }
}
exports.default = tryFn$;
//# sourceMappingURL=tryFn.js.map