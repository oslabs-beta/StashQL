"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformArguments = exports.IS_READ_ONLY = void 0;
exports.IS_READ_ONLY = true;
function transformArguments(key, prefix, options) {
    const args = ['FT.SUGGET', key, prefix];
    if (options === null || options === void 0 ? void 0 : options.FUZZY) {
        args.push('FUZZY');
    }
    if (options === null || options === void 0 ? void 0 : options.MAX) {
        args.push('MAX', options.MAX.toString());
    }
    return args;
}
exports.transformArguments = transformArguments;
