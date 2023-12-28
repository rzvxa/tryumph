"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Err = exports.Ok = void 0;
const tupleConstructor_1 = __importDefault(require("./tupleConstructor"));
/**
 * A `Result` can either contain a result value or an error value.
 *
 * @sealed
 */
class Result extends tupleConstructor_1.default {
    /**
     * Get the result value.
     *
     * @returns The result value if it exists otherwise it will return `null`.
     */
    get res() {
        return this[0];
    }
    /**
     * Get the error value.
     *
     * @returns The error value if it exists otherwise it will return `null`.
     *
     */
    get err() {
        return this[1];
    }
    /**
     * Create a Result.
     *
     * @param options - The result initialization options.
     * @param options.result - The result value, should be left `null` in `Err` results.
     * @param options.error - The result error, should be left `null` in `Ok` results.
     *
     * @internal
     */
    constructor({ result = null, error = null, }) {
        super(result, error);
        /**
         * Check if the `Result` has a value.
         *
         * @returns `true` if the result is `Ok`.
         */
        this.isOk = () => this.err === null;
        /**
         * Check if the `Result` has an error.
         *
         * @returns `true` if the result is `Err`.
         */
        this.isErr = () => this.err !== null || this.containsAmbiguousError || this.isOk === null;
        /**
         * Get the result value.
         *
         * @returns The result value if it exists otherwise it will return `null`.
         */
        this.ok = () => this.res;
        /**
         * Get the error value.
         *
         * @returns The error value if it exists otherwise it will return `null`.
         */
        this.error = () => this.err;
        /**
         * Returns the contained result value.
         *
         * @throws If value is an error it will throw it.
         *
         * @returns The result value.
         */
        this.unwrap = () => {
            if (this.isOk()) {
                return this.res;
            }
            else {
                throw this.err;
            }
        };
        /**
         * Returns the contained error value.
         *
         * @throws If result is `Ok` it will throw the result value as an error.
         *
         * @returns The error value.
         */
        this.unwrapErr = () => {
            if (this.isErr()) {
                return this.err;
            }
            else {
                throw this.res;
            }
        };
        /**
         * Returns the contained result value or a provided default.
         *
         * @param defaultResult - The default value that gets returned in case of an `Err`.
         *
         * @returns The result value or provided default.
         */
        this.unwrapOr = (defaultResult) => {
            if (this.isErr()) {
                return defaultResult;
            }
            else {
                return this.res;
            }
        };
        /**
         * Returns the contained result value or computes it from a closure.
         *
         * @param defaultProvider - The closure that will provide the default value in case of an `Err`.
         *
         * @returns The result value or provided default via given closure.
         */
        this.unwrapOrElse = (defaultProvider) => {
            if (this.isErr()) {
                return defaultProvider(this.err);
            }
            else {
                return this.res;
            }
        };
        /**
         * Returns the `other` result if this is `Err`, otherwise it will return itself.
         *
         * @param other - The other `Result`.
         *
         * @returns The `other` result if this is `Err`, otherwise it will return itself.
         */
        this.or = (other) => {
            if (this.isOk()) {
                return this;
            }
            else {
                return other;
            }
        };
        /**
         * Returns the `other` result if this is `Ok`, otherwise returns the error value of itself.
         *
         * @param other - The other `Result`.
         *
         * @returns The `other` result if this is `Ok`, otherwise returns the error value of itself.
         */
        this.and = (other) => {
            if (this.isErr()) {
                return this;
            }
            else {
                return other;
            }
        };
        /**
         * It will match the result with the given `Matcher`s and return the result.
         *
         * @param matchers - The given `Matcher`s for the pattern matching
         *
         * @returns Will find the first matching condition and uses that function to transform the result.
         *
         * @example
         * Here's a simple example:
         * ```
         * const result = await try$(itMayThrow());
         * return result.match(
         *  when(Ok, consumeResult),
         *  when(Err, handleError)
         * );
         * ```
         */
        this.match = (...matchers) => {
            const match = matchers.find((matcher) => matcher.condition(this));
            if (match) {
                return match.transform(this);
            }
            else {
                throw "Non exhaustive pattern matching is not allowed!";
            }
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.__proto__ = Result.prototype;
    }
}
/**
 * Creates an `Ok` `Result`.
 *
 * @param result - The result value.
 *
 * @returns A `Result` object containing the given result value.
 */
Result.makeOk = (result) => {
    return new Result({ result });
};
/**
 * Creates an `Err` `Result`.
 *
 * @param error - The error value.
 *
 * @returns A `Result` object containing the given error value.
 */
Result.makeErr = (error) => {
    const self = new Result({ error });
    if (!error) {
        // @ts-expect-error this field is supposed to be set by makeErr function
        self.containsAmbiguousError = true;
    }
    return self;
};
/**
 * Creates an `Ok` `Result`.
 *
 * @remarks
 *
 * This is just a public export of {@link Result.makeOk}
 *
 * @param result - The result value.
 *
 * @returns A `Result` object containing the given result value.
 */
const Ok = Result.makeOk;
exports.Ok = Ok;
/**
 * Creates an `Err` `Result`.
 *
 * @remarks
 *
 * This is just a public export of {@link Result.makeErr}
 *
 * @param error - The error value.
 *
 * @returns A `Result` object containing the given error value.
 */
const Err = Result.makeErr;
exports.Err = Err;
//# sourceMappingURL=result.js.map