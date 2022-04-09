"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pushQueryArguments = void 0;
const CONFIG_GET = require("./CONFIG_GET");
const CONFIG_SET = require("./CONFIG_SET");
;
const DELETE = require("./DELETE");
const EXPLAIN = require("./EXPLAIN");
const LIST = require("./LIST");
const PROFILE = require("./PROFILE");
const QUERY_RO = require("./QUERY_RO");
const QUERY = require("./QUERY");
const SLOWLOG = require("./SLOWLOG");
exports.default = {
    CONFIG_GET,
    configGet: CONFIG_GET,
    CONFIG_SET,
    configSet: CONFIG_SET,
    DELETE,
    delete: DELETE,
    EXPLAIN,
    explain: EXPLAIN,
    LIST,
    list: LIST,
    PROFILE,
    profile: PROFILE,
    QUERY_RO,
    queryRo: QUERY_RO,
    QUERY,
    query: QUERY,
    SLOWLOG,
    slowLog: SLOWLOG
};
function pushQueryArguments(args, graph, query, timeout) {
    args.push(graph, query);
    if (timeout !== undefined) {
        args.push(timeout.toString());
    }
    return args;
}
exports.pushQueryArguments = pushQueryArguments;
