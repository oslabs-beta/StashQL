"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _RedisCluster_instances, _RedisCluster_options, _RedisCluster_slots, _RedisCluster_Multi, _RedisCluster_execute;
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("./commands");
const cluster_slots_1 = require("./cluster-slots");
const commander_1 = require("../commander");
const events_1 = require("events");
const multi_command_1 = require("./multi-command");
class RedisCluster extends events_1.EventEmitter {
    constructor(options) {
        super();
        _RedisCluster_instances.add(this);
        _RedisCluster_options.set(this, void 0);
        _RedisCluster_slots.set(this, void 0);
        _RedisCluster_Multi.set(this, void 0);
        __classPrivateFieldSet(this, _RedisCluster_options, options, "f");
        __classPrivateFieldSet(this, _RedisCluster_slots, new cluster_slots_1.default(options, err => this.emit('error', err)), "f");
        __classPrivateFieldSet(this, _RedisCluster_Multi, multi_command_1.default.extend(options), "f");
    }
    static extractFirstKey(command, originalArgs, redisArgs) {
        if (command.FIRST_KEY_INDEX === undefined) {
            return undefined;
        }
        else if (typeof command.FIRST_KEY_INDEX === 'number') {
            return redisArgs[command.FIRST_KEY_INDEX];
        }
        return command.FIRST_KEY_INDEX(...originalArgs);
    }
    static create(options) {
        return new ((0, commander_1.extendWithModulesAndScripts)({
            BaseClass: RedisCluster,
            modules: options === null || options === void 0 ? void 0 : options.modules,
            modulesCommandsExecutor: RedisCluster.prototype.commandsExecutor,
            scripts: options === null || options === void 0 ? void 0 : options.scripts,
            scriptsExecutor: RedisCluster.prototype.scriptsExecutor
        }))(options);
    }
    duplicate(overrides) {
        return new (Object.getPrototypeOf(this).constructor)({
            ...__classPrivateFieldGet(this, _RedisCluster_options, "f"),
            ...overrides
        });
    }
    async connect() {
        return __classPrivateFieldGet(this, _RedisCluster_slots, "f").connect();
    }
    async commandsExecutor(command, args) {
        const { args: redisArgs, options } = (0, commander_1.transformCommandArguments)(command, args);
        return (0, commander_1.transformCommandReply)(command, await this.sendCommand(RedisCluster.extractFirstKey(command, args, redisArgs), command.IS_READ_ONLY, redisArgs, options), redisArgs.preserve);
    }
    async sendCommand(firstKey, isReadonly, args, options) {
        return __classPrivateFieldGet(this, _RedisCluster_instances, "m", _RedisCluster_execute).call(this, firstKey, isReadonly, client => client.sendCommand(args, options));
    }
    async scriptsExecutor(script, args) {
        const { args: redisArgs, options } = (0, commander_1.transformCommandArguments)(script, args);
        return (0, commander_1.transformCommandReply)(script, await this.executeScript(script, args, redisArgs, options), redisArgs.preserve);
    }
    async executeScript(script, originalArgs, redisArgs, options) {
        return __classPrivateFieldGet(this, _RedisCluster_instances, "m", _RedisCluster_execute).call(this, RedisCluster.extractFirstKey(script, originalArgs, redisArgs), script.IS_READ_ONLY, client => client.executeScript(script, redisArgs, options));
    }
    multi(routing) {
        return new (__classPrivateFieldGet(this, _RedisCluster_Multi, "f"))((commands, firstKey, chainId) => {
            return __classPrivateFieldGet(this, _RedisCluster_instances, "m", _RedisCluster_execute).call(this, firstKey, false, client => client.multiExecutor(commands, chainId));
        }, routing);
    }
    getMasters() {
        return __classPrivateFieldGet(this, _RedisCluster_slots, "f").getMasters();
    }
    getSlotMaster(slot) {
        return __classPrivateFieldGet(this, _RedisCluster_slots, "f").getSlotMaster(slot);
    }
    quit() {
        return __classPrivateFieldGet(this, _RedisCluster_slots, "f").quit();
    }
    disconnect() {
        return __classPrivateFieldGet(this, _RedisCluster_slots, "f").disconnect();
    }
}
exports.default = RedisCluster;
_RedisCluster_options = new WeakMap(), _RedisCluster_slots = new WeakMap(), _RedisCluster_Multi = new WeakMap(), _RedisCluster_instances = new WeakSet(), _RedisCluster_execute = async function _RedisCluster_execute(firstKey, isReadonly, executor) {
    var _a, _b;
    const maxCommandRedirections = (_a = __classPrivateFieldGet(this, _RedisCluster_options, "f").maxCommandRedirections) !== null && _a !== void 0 ? _a : 16;
    let client = __classPrivateFieldGet(this, _RedisCluster_slots, "f").getClient(firstKey, isReadonly);
    for (let i = 0;; i++) {
        try {
            return await executor(client);
        }
        catch (err) {
            if (++i > maxCommandRedirections || !(err instanceof Error)) {
                throw err;
            }
            if (err.message.startsWith('ASK')) {
                const address = err.message.substring(err.message.lastIndexOf(' ') + 1);
                if (((_b = __classPrivateFieldGet(this, _RedisCluster_slots, "f").getNodeByAddress(address)) === null || _b === void 0 ? void 0 : _b.client) === client) {
                    await client.asking();
                    continue;
                }
                await __classPrivateFieldGet(this, _RedisCluster_slots, "f").rediscover(client);
                const redirectTo = __classPrivateFieldGet(this, _RedisCluster_slots, "f").getNodeByAddress(address);
                if (!redirectTo) {
                    throw new Error(`Cannot find node ${address}`);
                }
                await redirectTo.client.asking();
                client = redirectTo.client;
                continue;
            }
            else if (err.message.startsWith('MOVED')) {
                await __classPrivateFieldGet(this, _RedisCluster_slots, "f").rediscover(client);
                client = __classPrivateFieldGet(this, _RedisCluster_slots, "f").getClient(firstKey, isReadonly);
                continue;
            }
            throw err;
        }
    }
};
(0, commander_1.extendWithCommands)({
    BaseClass: RedisCluster,
    commands: commands_1.default,
    executor: RedisCluster.prototype.commandsExecutor
});
