"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformArguments = exports.IS_READ_ONLY = void 0;
exports.IS_READ_ONLY = true;
function transformArguments(index, query) {
    return ['FT.EXPLAIN', index, query];
}
exports.transformArguments = transformArguments;
