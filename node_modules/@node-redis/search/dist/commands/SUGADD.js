"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformArguments = void 0;
function transformArguments(key, string, score, options) {
    const args = ['FT.SUGADD', key, string, score.toString()];
    if (options === null || options === void 0 ? void 0 : options.INCR) {
        args.push('INCR');
    }
    if (options === null || options === void 0 ? void 0 : options.PAYLOAD) {
        args.push('PAYLOAD', options.PAYLOAD);
    }
    return args;
}
exports.transformArguments = transformArguments;
