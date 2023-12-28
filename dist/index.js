"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.when = exports.tryFn$ = exports.try$ = exports.Err = exports.Ok = void 0;
const result_1 = require("./result");
Object.defineProperty(exports, "Ok", { enumerable: true, get: function () { return result_1.Ok; } });
Object.defineProperty(exports, "Err", { enumerable: true, get: function () { return result_1.Err; } });
const try_1 = __importDefault(require("./try"));
exports.try$ = try_1.default;
const tryFn_1 = __importDefault(require("./tryFn"));
exports.tryFn$ = tryFn_1.default;
const when_1 = __importDefault(require("./when"));
exports.when = when_1.default;
//# sourceMappingURL=index.js.map