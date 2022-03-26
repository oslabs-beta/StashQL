/// <reference types="node" />
import COMMANDS from './commands';
import { RedisCommand, RedisCommandArgument, RedisCommandArguments, RedisCommandRawReply, RedisCommandReply, RedisModules, RedisPlugins, RedisScript, RedisScripts } from '../commands';
import { ClientCommandOptions, RedisClientCommandSignature, RedisClientOptions, WithModules, WithScripts } from '../client';
import { ClusterNode, NodeAddressMap } from './cluster-slots';
import { EventEmitter } from 'events';
import { RedisClusterMultiCommandType } from './multi-command';
export declare type RedisClusterClientOptions = Omit<RedisClientOptions, 'modules' | 'scripts'>;
export interface RedisClusterOptions<M extends RedisModules = Record<string, never>, S extends RedisScripts = Record<string, never>> extends RedisPlugins<M, S> {
    rootNodes: Array<RedisClusterClientOptions>;
    defaults?: Partial<RedisClusterClientOptions>;
    useReplicas?: boolean;
    maxCommandRedirections?: number;
    nodeAddressMap?: NodeAddressMap;
}
declare type WithCommands = {
    [P in keyof typeof COMMANDS]: RedisClientCommandSignature<(typeof COMMANDS)[P]>;
};
export declare type RedisClusterType<M extends RedisModules = Record<string, never>, S extends RedisScripts = Record<string, never>> = RedisCluster<M, S> & WithCommands & WithModules<M> & WithScripts<S>;
export default class RedisCluster<M extends RedisModules, S extends RedisScripts> extends EventEmitter {
    #private;
    static extractFirstKey(command: RedisCommand, originalArgs: Array<unknown>, redisArgs: RedisCommandArguments): RedisCommandArgument | undefined;
    static create<M extends RedisModules, S extends RedisScripts>(options?: RedisClusterOptions<M, S>): RedisClusterType<M, S>;
    constructor(options: RedisClusterOptions<M, S>);
    duplicate(overrides?: Partial<RedisClusterOptions<M, S>>): RedisClusterType<M, S>;
    connect(): Promise<void>;
    commandsExecutor(command: RedisCommand, args: Array<unknown>): Promise<RedisCommandReply<typeof command>>;
    sendCommand<T = RedisCommandRawReply>(firstKey: RedisCommandArgument | undefined, isReadonly: boolean | undefined, args: RedisCommandArguments, options?: ClientCommandOptions): Promise<T>;
    scriptsExecutor(script: RedisScript, args: Array<unknown>): Promise<RedisCommandReply<typeof script>>;
    executeScript(script: RedisScript, originalArgs: Array<unknown>, redisArgs: RedisCommandArguments, options?: ClientCommandOptions): Promise<RedisCommandReply<typeof script>>;
    multi(routing?: RedisCommandArgument): RedisClusterMultiCommandType<M, S>;
    getMasters(): Array<ClusterNode<M, S>>;
    getSlotMaster(slot: number): ClusterNode<M, S>;
    quit(): Promise<void>;
    disconnect(): Promise<void>;
}
export {};
