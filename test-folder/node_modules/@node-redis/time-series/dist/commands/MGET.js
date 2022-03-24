"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformReply = exports.transformArguments = exports.IS_READ_ONLY = void 0;
const _1 = require(".");
exports.IS_READ_ONLY = true;
function transformArguments(filter) {
    return (0, _1.pushFilterArgument)(['TS.MGET'], filter);
}
exports.transformArguments = transformArguments;
function transformReply(reply) {
    return reply.map(([key, _, sample]) => ({
        key,
        sample: (0, _1.transformSampleReply)(sample)
    }));
}
exports.transformReply = transformReply;
