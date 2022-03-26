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
var _RedisClusterSlots_instances, _RedisClusterSlots_options, _RedisClusterSlots_Client, _RedisClusterSlots_onError, _RedisClusterSlots_nodeByAddress, _RedisClusterSlots_slots, _RedisClusterSlots_discoverNodes, _RedisClusterSlots_runningRediscoverPromise, _RedisClusterSlots_rediscover, _RedisClusterSlots_reset, _RedisClusterSlots_clientOptionsDefaults, _RedisClusterSlots_initiateClient, _RedisClusterSlots_getNodeAddress, _RedisClusterSlots_initiateClientForNode, _RedisClusterSlots_slotClientIterator, _RedisClusterSlots_getSlotClient, _RedisClusterSlots_randomClientIterator, _RedisClusterSlots_getRandomClient, _RedisClusterSlots_destroy;
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../client");
const errors_1 = require("../errors");
// We need to use 'require', because it's not possible with Typescript to import
// function that are exported as 'module.exports = function`, without esModuleInterop
// set to true.
const calculateSlot = require('cluster-key-slot');
class RedisClusterSlots {
    constructor(options, onError) {
        _RedisClusterSlots_instances.add(this);
        _RedisClusterSlots_options.set(this, void 0);
        _RedisClusterSlots_Client.set(this, void 0);
        _RedisClusterSlots_onError.set(this, void 0);
        _RedisClusterSlots_nodeByAddress.set(this, new Map());
        _RedisClusterSlots_slots.set(this, []);
        _RedisClusterSlots_runningRediscoverPromise.set(this, void 0);
        _RedisClusterSlots_randomClientIterator.set(this, void 0);
        __classPrivateFieldSet(this, _RedisClusterSlots_options, options, "f");
        __classPrivateFieldSet(this, _RedisClusterSlots_Client, client_1.default.extend(options), "f");
        __classPrivateFieldSet(this, _RedisClusterSlots_onError, onError, "f");
    }
    async connect() {
        for (const rootNode of __classPrivateFieldGet(this, _RedisClusterSlots_options, "f").rootNodes) {
            if (await __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_discoverNodes).call(this, rootNode))
                return;
        }
        throw new errors_1.RootNodesUnavailableError();
    }
    async rediscover(startWith) {
        if (!__classPrivateFieldGet(this, _RedisClusterSlots_runningRediscoverPromise, "f")) {
            __classPrivateFieldSet(this, _RedisClusterSlots_runningRediscoverPromise, __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_rediscover).call(this, startWith)
                .finally(() => __classPrivateFieldSet(this, _RedisClusterSlots_runningRediscoverPromise, undefined, "f")), "f");
        }
        return __classPrivateFieldGet(this, _RedisClusterSlots_runningRediscoverPromise, "f");
    }
    getSlotMaster(slot) {
        return __classPrivateFieldGet(this, _RedisClusterSlots_slots, "f")[slot].master;
    }
    getClient(firstKey, isReadonly) {
        if (!firstKey) {
            return __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_getRandomClient).call(this);
        }
        const slot = calculateSlot(firstKey);
        if (!isReadonly || !__classPrivateFieldGet(this, _RedisClusterSlots_options, "f").useReplicas) {
            return this.getSlotMaster(slot).client;
        }
        return __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_getSlotClient).call(this, slot);
    }
    getMasters() {
        var _a;
        const masters = [];
        for (const node of __classPrivateFieldGet(this, _RedisClusterSlots_nodeByAddress, "f").values()) {
            if ((_a = node.client.options) === null || _a === void 0 ? void 0 : _a.readonly)
                continue;
            masters.push(node);
        }
        return masters;
    }
    getNodeByAddress(address) {
        const mappedAddress = __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_getNodeAddress).call(this, address);
        return __classPrivateFieldGet(this, _RedisClusterSlots_nodeByAddress, "f").get(mappedAddress ? `${mappedAddress.host}:${mappedAddress.port}` : address);
    }
    quit() {
        return __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_destroy).call(this, client => client.quit());
    }
    disconnect() {
        return __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_destroy).call(this, client => client.disconnect());
    }
}
exports.default = RedisClusterSlots;
_RedisClusterSlots_options = new WeakMap(), _RedisClusterSlots_Client = new WeakMap(), _RedisClusterSlots_onError = new WeakMap(), _RedisClusterSlots_nodeByAddress = new WeakMap(), _RedisClusterSlots_slots = new WeakMap(), _RedisClusterSlots_runningRediscoverPromise = new WeakMap(), _RedisClusterSlots_randomClientIterator = new WeakMap(), _RedisClusterSlots_instances = new WeakSet(), _RedisClusterSlots_discoverNodes = async function _RedisClusterSlots_discoverNodes(clientOptions) {
    const client = __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_initiateClient).call(this, clientOptions);
    await client.connect();
    try {
        await __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_reset).call(this, await client.clusterNodes());
        return true;
    }
    catch (err) {
        __classPrivateFieldGet(this, _RedisClusterSlots_onError, "f").call(this, err);
        return false;
    }
    finally {
        if (client.isOpen) {
            await client.disconnect();
        }
    }
}, _RedisClusterSlots_rediscover = async function _RedisClusterSlots_rediscover(startWith) {
    if (await __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_discoverNodes).call(this, startWith.options))
        return;
    for (const { client } of __classPrivateFieldGet(this, _RedisClusterSlots_nodeByAddress, "f").values()) {
        if (client === startWith)
            continue;
        if (await __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_discoverNodes).call(this, client.options))
            return;
    }
    throw new Error('None of the cluster nodes is available');
}, _RedisClusterSlots_reset = async function _RedisClusterSlots_reset(masters) {
    // Override this.#slots and add not existing clients to this.#nodeByAddress
    const promises = [], clientsInUse = new Set();
    for (const master of masters) {
        const slot = {
            master: __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_initiateClientForNode).call(this, master, false, clientsInUse, promises),
            replicas: __classPrivateFieldGet(this, _RedisClusterSlots_options, "f").useReplicas ?
                master.replicas.map(replica => __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_initiateClientForNode).call(this, replica, true, clientsInUse, promises)) :
                [],
            clientIterator: undefined // will be initiated in use
        };
        for (const { from, to } of master.slots) {
            for (let i = from; i <= to; i++) {
                __classPrivateFieldGet(this, _RedisClusterSlots_slots, "f")[i] = slot;
            }
        }
    }
    // Remove unused clients from this.#nodeByAddress using clientsInUse
    for (const [address, { client }] of __classPrivateFieldGet(this, _RedisClusterSlots_nodeByAddress, "f").entries()) {
        if (clientsInUse.has(address))
            continue;
        promises.push(client.disconnect());
        __classPrivateFieldGet(this, _RedisClusterSlots_nodeByAddress, "f").delete(address);
    }
    await Promise.all(promises);
}, _RedisClusterSlots_clientOptionsDefaults = function _RedisClusterSlots_clientOptionsDefaults(options) {
    var _a;
    if (!__classPrivateFieldGet(this, _RedisClusterSlots_options, "f").defaults)
        return options;
    return {
        ...__classPrivateFieldGet(this, _RedisClusterSlots_options, "f").defaults,
        ...options,
        socket: __classPrivateFieldGet(this, _RedisClusterSlots_options, "f").defaults.socket && (options === null || options === void 0 ? void 0 : options.socket) ? {
            ...__classPrivateFieldGet(this, _RedisClusterSlots_options, "f").defaults.socket,
            ...options.socket
        } : (_a = __classPrivateFieldGet(this, _RedisClusterSlots_options, "f").defaults.socket) !== null && _a !== void 0 ? _a : options === null || options === void 0 ? void 0 : options.socket
    };
}, _RedisClusterSlots_initiateClient = function _RedisClusterSlots_initiateClient(options) {
    return new (__classPrivateFieldGet(this, _RedisClusterSlots_Client, "f"))(__classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_clientOptionsDefaults).call(this, options))
        .on('error', __classPrivateFieldGet(this, _RedisClusterSlots_onError, "f"));
}, _RedisClusterSlots_getNodeAddress = function _RedisClusterSlots_getNodeAddress(address) {
    switch (typeof __classPrivateFieldGet(this, _RedisClusterSlots_options, "f").nodeAddressMap) {
        case 'object':
            return __classPrivateFieldGet(this, _RedisClusterSlots_options, "f").nodeAddressMap[address];
        case 'function':
            return __classPrivateFieldGet(this, _RedisClusterSlots_options, "f").nodeAddressMap(address);
    }
}, _RedisClusterSlots_initiateClientForNode = function _RedisClusterSlots_initiateClientForNode(nodeData, readonly, clientsInUse, promises) {
    var _a;
    const address = `${nodeData.host}:${nodeData.port}`;
    clientsInUse.add(address);
    let node = __classPrivateFieldGet(this, _RedisClusterSlots_nodeByAddress, "f").get(address);
    if (!node) {
        node = {
            id: nodeData.id,
            client: __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_initiateClient).call(this, {
                socket: (_a = __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_getNodeAddress).call(this, address)) !== null && _a !== void 0 ? _a : {
                    host: nodeData.host,
                    port: nodeData.port
                },
                readonly
            })
        };
        promises.push(node.client.connect());
        __classPrivateFieldGet(this, _RedisClusterSlots_nodeByAddress, "f").set(address, node);
    }
    return node;
}, _RedisClusterSlots_slotClientIterator = function* _RedisClusterSlots_slotClientIterator(slotNumber) {
    const slot = __classPrivateFieldGet(this, _RedisClusterSlots_slots, "f")[slotNumber];
    yield slot.master.client;
    for (const replica of slot.replicas) {
        yield replica.client;
    }
}, _RedisClusterSlots_getSlotClient = function _RedisClusterSlots_getSlotClient(slotNumber) {
    const slot = __classPrivateFieldGet(this, _RedisClusterSlots_slots, "f")[slotNumber];
    if (!slot.clientIterator) {
        slot.clientIterator = __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_slotClientIterator).call(this, slotNumber);
    }
    const { done, value } = slot.clientIterator.next();
    if (done) {
        slot.clientIterator = undefined;
        return __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_getSlotClient).call(this, slotNumber);
    }
    return value;
}, _RedisClusterSlots_getRandomClient = function _RedisClusterSlots_getRandomClient() {
    if (!__classPrivateFieldGet(this, _RedisClusterSlots_nodeByAddress, "f").size) {
        throw new Error('Cluster is not connected');
    }
    if (!__classPrivateFieldGet(this, _RedisClusterSlots_randomClientIterator, "f")) {
        __classPrivateFieldSet(this, _RedisClusterSlots_randomClientIterator, __classPrivateFieldGet(this, _RedisClusterSlots_nodeByAddress, "f").values(), "f");
    }
    const { done, value } = __classPrivateFieldGet(this, _RedisClusterSlots_randomClientIterator, "f").next();
    if (done) {
        __classPrivateFieldSet(this, _RedisClusterSlots_randomClientIterator, undefined, "f");
        return __classPrivateFieldGet(this, _RedisClusterSlots_instances, "m", _RedisClusterSlots_getRandomClient).call(this);
    }
    return value.client;
}, _RedisClusterSlots_destroy = async function _RedisClusterSlots_destroy(fn) {
    const promises = [];
    for (const { client } of __classPrivateFieldGet(this, _RedisClusterSlots_nodeByAddress, "f").values()) {
        promises.push(fn(client));
    }
    await Promise.all(promises);
    __classPrivateFieldGet(this, _RedisClusterSlots_nodeByAddress, "f").clear();
    __classPrivateFieldGet(this, _RedisClusterSlots_slots, "f").splice(0);
};
