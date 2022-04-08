"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReconnectStrategyError = exports.RootNodesUnavailableError = exports.AuthError = exports.SocketClosedUnexpectedlyError = exports.DisconnectsClientError = exports.ClientClosedError = exports.ConnectionTimeoutError = exports.WatchError = exports.AbortError = void 0;
class AbortError extends Error {
    constructor() {
        super('The command was aborted');
    }
}
exports.AbortError = AbortError;
class WatchError extends Error {
    constructor() {
        super('One (or more) of the watched keys has been changed');
    }
}
exports.WatchError = WatchError;
class ConnectionTimeoutError extends Error {
    constructor() {
        super('Connection timeout');
    }
}
exports.ConnectionTimeoutError = ConnectionTimeoutError;
class ClientClosedError extends Error {
    constructor() {
        super('The client is closed');
    }
}
exports.ClientClosedError = ClientClosedError;
class DisconnectsClientError extends Error {
    constructor() {
        super('Disconnects client');
    }
}
exports.DisconnectsClientError = DisconnectsClientError;
class SocketClosedUnexpectedlyError extends Error {
    constructor() {
        super('Socket closed unexpectedly');
    }
}
exports.SocketClosedUnexpectedlyError = SocketClosedUnexpectedlyError;
class AuthError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.AuthError = AuthError;
class RootNodesUnavailableError extends Error {
    constructor() {
        super('All the root nodes are unavailable');
    }
}
exports.RootNodesUnavailableError = RootNodesUnavailableError;
class ReconnectStrategyError extends Error {
    constructor(originalError, socketError) {
        super(originalError.message);
        Object.defineProperty(this, "originalError", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "socketError", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.originalError = originalError;
        this.socketError = socketError;
    }
}
exports.ReconnectStrategyError = ReconnectStrategyError;
