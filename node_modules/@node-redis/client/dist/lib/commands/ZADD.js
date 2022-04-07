"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
const generic_transformers_1 = require("./generic-transformers");
exports.FIRST_KEY_INDEX = 1;
function transformArguments(key, members, options) {
    const args = ['ZADD', key];
    if (options === null || options === void 0 ? void 0 : options.NX) {
        args.push('NX');
    }
    else {
        if (options === null || options === void 0 ? void 0 : options.XX) {
            args.push('XX');
        }
        if (options === null || options === void 0 ? void 0 : options.GT) {
            args.push('GT');
        }
        else if (options === null || options === void 0 ? void 0 : options.LT) {
            args.push('LT');
        }
    }
    if (options === null || options === void 0 ? void 0 : options.CH) {
        args.push('CH');
    }
    if (options === null || options === void 0 ? void 0 : options.INCR) {
        args.push('INCR');
    }
    for (const { score, value } of (Array.isArray(members) ? members : [members])) {
        args.push((0, generic_transformers_1.transformNumberInfinityArgument)(score), value);
    }
    return args;
}
exports.transformArguments = transformArguments;
var generic_transformers_2 = require("./generic-transformers");
Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_2.transformNumberInfinityReply; } });
