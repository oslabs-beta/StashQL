"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformReply = exports.transformArguments = exports.RedisFunctionFlags = void 0;
var RedisFunctionFlags;
(function (RedisFunctionFlags) {
    RedisFunctionFlags["NO_WRITES"] = "no-writes";
    RedisFunctionFlags["ALLOW_OOM"] = "allow-oom";
    RedisFunctionFlags["ALLOW_STALE"] = "allow-stale";
    RedisFunctionFlags["NO_CLUSTER"] = "no-cluster";
})(RedisFunctionFlags = exports.RedisFunctionFlags || (exports.RedisFunctionFlags = {}));
function transformArguments(pattern) {
    const args = ['FUNCTION', 'LIST'];
    if (pattern) {
        args.push(pattern);
    }
    return args;
}
exports.transformArguments = transformArguments;
function transformReply(reply) {
    return {
        libraryName: reply[1],
        engine: reply[3],
        description: reply[5],
        functions: reply[7].map(fn => ({
            name: fn[1],
            description: fn[3],
            flags: fn[5]
        }))
    };
}
exports.transformReply = transformReply;
