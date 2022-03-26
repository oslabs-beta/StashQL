"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformArguments = void 0;
function transformArguments(index, options) {
    const args = ['FT.DROPINDEX', index];
    if (options === null || options === void 0 ? void 0 : options.DD) {
        args.push('DD');
    }
    return args;
}
exports.transformArguments = transformArguments;
