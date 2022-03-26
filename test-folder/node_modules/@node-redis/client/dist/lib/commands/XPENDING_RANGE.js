"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = exports.FIRST_KEY_INDEX = void 0;
exports.FIRST_KEY_INDEX = 1;
exports.IS_READ_ONLY = true;
function transformArguments(key, group, start, end, count, options) {
    const args = ['XPENDING', key, group];
    if (options === null || options === void 0 ? void 0 : options.IDLE) {
        args.push('IDLE', options.IDLE.toString());
    }
    args.push(start, end, count.toString());
    if (options === null || options === void 0 ? void 0 : options.consumer) {
        args.push(options.consumer);
    }
    return args;
}
exports.transformArguments = transformArguments;
function transformReply(reply) {
    return reply.map(([id, owner, millisecondsSinceLastDelivery, deliveriesCounter]) => ({
        id,
        owner,
        millisecondsSinceLastDelivery,
        deliveriesCounter
    }));
}
exports.transformReply = transformReply;
