"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformArguments = exports.FIRST_KEY_INDEX = void 0;
exports.FIRST_KEY_INDEX = 1;
function transformArguments(key, value, options) {
    const args = [
        'SET',
        key,
        typeof value === 'number' ? value.toString() : value
    ];
    if (options === null || options === void 0 ? void 0 : options.EX) {
        args.push('EX', options.EX.toString());
    }
    else if (options === null || options === void 0 ? void 0 : options.PX) {
        args.push('PX', options.PX.toString());
    }
    else if (options === null || options === void 0 ? void 0 : options.EXAT) {
        args.push('EXAT', options.EXAT.toString());
    }
    else if (options === null || options === void 0 ? void 0 : options.PXAT) {
        args.push('PXAT', options.PXAT.toString());
    }
    else if (options === null || options === void 0 ? void 0 : options.KEEPTTL) {
        args.push('KEEPTTL');
    }
    if (options === null || options === void 0 ? void 0 : options.NX) {
        args.push('NX');
    }
    else if (options === null || options === void 0 ? void 0 : options.XX) {
        args.push('XX');
    }
    if (options === null || options === void 0 ? void 0 : options.GET) {
        args.push('GET');
    }
    return args;
}
exports.transformArguments = transformArguments;
