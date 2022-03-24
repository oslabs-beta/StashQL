"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
exports.FIRST_KEY_INDEX = 1;
function transformArguments(...[key, value, fieldValue]) {
    const args = ['HSET', key];
    if (typeof value === 'string' || typeof value === 'number' || Buffer.isBuffer(value)) {
        pushValue(args, value);
        pushValue(args, fieldValue);
    }
    else if (value instanceof Map) {
        pushMap(args, value);
    }
    else if (Array.isArray(value)) {
        pushTuples(args, value);
    }
    else {
        pushObject(args, value);
    }
    return args;
}
exports.transformArguments = transformArguments;
function pushMap(args, map) {
    for (const [key, value] of map.entries()) {
        pushValue(args, key);
        pushValue(args, value);
    }
}
function pushTuples(args, tuples) {
    for (const tuple of tuples) {
        if (Array.isArray(tuple)) {
            pushTuples(args, tuple);
            continue;
        }
        pushValue(args, tuple);
    }
}
function pushObject(args, object) {
    for (const key of Object.keys(object)) {
        args.push(key.toString(), object[key].toString());
    }
}
function pushValue(args, value) {
    args.push(typeof value === 'number' ?
        value.toString() :
        value);
}
