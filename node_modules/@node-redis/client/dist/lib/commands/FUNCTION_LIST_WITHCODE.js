"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformArguments = void 0;
const FUNCTION_LIST_1 = require("./FUNCTION_LIST");
function transformArguments(pattern) {
    const args = (0, FUNCTION_LIST_1.transformArguments)(pattern);
    args.push('WITHCODE');
    return args;
}
exports.transformArguments = transformArguments;
// export function transformReply(rawReply: FunctionListWithCodeRawReply): FunctionListWithCodeReply {
//     const parsed: Partial<FunctionListWithCodeReply> = transformFunctionListReply(rawReply.slice(0, 8));
//     parsed.libraryCode = rawReply[9];
//     return parsed as FunctionListWithCodeReply;
// }
