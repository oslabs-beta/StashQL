"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
const _1 = require(".");
exports.FIRST_KEY_INDEX = 1;
function transformArguments(key, path, json, options) {
    var _a, _b;
    const args = ['JSON.SET', key, path, (0, _1.transformRedisJsonArgument)(json)];
    if ((_a = options) === null || _a === void 0 ? void 0 : _a.NX) {
        args.push('NX');
    }
    else if ((_b = options) === null || _b === void 0 ? void 0 : _b.XX) {
        args.push('XX');
    }
    return args;
}
exports.transformArguments = transformArguments;
