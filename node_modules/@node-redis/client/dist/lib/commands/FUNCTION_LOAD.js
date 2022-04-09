"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformArguments = exports.RedisFunctionEngines = void 0;
var RedisFunctionEngines;
(function (RedisFunctionEngines) {
    RedisFunctionEngines["LUA"] = "LUA";
})(RedisFunctionEngines = exports.RedisFunctionEngines || (exports.RedisFunctionEngines = {}));
function transformArguments(engine, library, code, options) {
    const args = ['FUNCTION', 'LOAD', engine, library];
    if (options === null || options === void 0 ? void 0 : options.REPLACE) {
        args.push('REPLACE');
    }
    if (options === null || options === void 0 ? void 0 : options.DESCRIPTION) {
        args.push('DESCRIPTION', options.DESCRIPTION);
    }
    args.push(code);
    return args;
}
exports.transformArguments = transformArguments;
