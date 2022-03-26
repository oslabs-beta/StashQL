"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCommandOptions = exports.commandOptions = void 0;
const symbol = Symbol('Command Options');
function commandOptions(options) {
    options[symbol] = true;
    return options;
}
exports.commandOptions = commandOptions;
function isCommandOptions(options) {
    return (options === null || options === void 0 ? void 0 : options[symbol]) === true;
}
exports.isCommandOptions = isCommandOptions;
