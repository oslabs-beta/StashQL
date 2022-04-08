"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformReply = exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
const generic_transformers_1 = require("./generic-transformers");
exports.FIRST_KEY_INDEX = 1;
function transformArguments(key, group, consumer, minIdleTime, id, options) {
    const args = ['XCLAIM', key, group, consumer, minIdleTime.toString()];
    (0, generic_transformers_1.pushVerdictArguments)(args, id);
    if (options === null || options === void 0 ? void 0 : options.IDLE) {
        args.push('IDLE', options.IDLE.toString());
    }
    if (options === null || options === void 0 ? void 0 : options.TIME) {
        args.push('TIME', (typeof options.TIME === 'number' ? options.TIME : options.TIME.getTime()).toString());
    }
    if (options === null || options === void 0 ? void 0 : options.RETRYCOUNT) {
        args.push('RETRYCOUNT', options.RETRYCOUNT.toString());
    }
    if (options === null || options === void 0 ? void 0 : options.FORCE) {
        args.push('FORCE');
    }
    return args;
}
exports.transformArguments = transformArguments;
var generic_transformers_2 = require("./generic-transformers");
Object.defineProperty(exports, "transformReply", { enumerable: true, get: function () { return generic_transformers_2.transformStreamMessagesReply; } });
