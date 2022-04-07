/// <reference types="node" />
import COMMANDS from './commands';
import { RedisCommand, RedisCommandArgument, RedisCommandArguments, RedisCommandRawReply, RedisCommandReply, RedisModules, RedisPlugins, RedisScript, RedisScripts } from '../commands';
import { RedisSocketOptions } from './socket';
import { PubSubListener, QueueCommandOptions } from './commands-queue';
import { RedisClientMultiCommandType } from './multi-command';
import { RedisMultiQueuedCommand } from '../multi-command';
import { EventEmitter } from 'events';
import { CommandOptions } from '../command-options';
import { ScanOptions, ZMember } from '../commands/generic-transformers';
import { ScanCommandOptions } from '../commands/SCAN';
import { HScanTuple } from '../commands/HSCAN';
import { Options as PoolOptions } from 'generic-pool';
export interface RedisClientOptions<M extends RedisModules = Record<string, never>, S extends RedisScripts = Record<string, never>> extends RedisPlugins<M, S> {
    url?: string;
    socket?: RedisSocketOptions;
    username?: string;
    password?: string;
    name?: string;
    database?: number;
    commandsQueueMaxLength?: number;
    disableOfflineQueue?: boolean;
    readonly?: boolean;
    legacyMode?: boolean;
    isolationPoolOptions?: PoolOptions;
}
declare type ConvertArgumentType<Type, ToType> = Type extends RedisCommandArgument ? (Type extends (string & ToType) ? Type : ToType) : (Type extends Set<infer Member> ? Set<ConvertArgumentType<Member, ToType>> : (Type extends Map<infer Key, infer Value> ? Map<Key, ConvertArgumentType<Value, ToType>> : (Type extends Array<infer Member> ? Array<ConvertArgumentType<Member, ToType>> : (Type extends Date ? Type : (Type extends Record<keyof any, any> ? {
    [Property in keyof Type]: ConvertArgumentType<Type[Property], ToType>;
} : Type)))));
export declare type RedisClientCommandSignature<Command extends RedisCommand, Params extends Array<unknown> = Parameters<Command['transformArguments']>> = <Options extends CommandOptions<ClientCommandOptions>>(...args: Params | [options: Options, ...rest: Params]) => Promise<ConvertArgumentType<RedisCommandReply<Command>, Options['returnBuffers'] extends true ? Buffer : string>>;
declare type WithCommands = {
    [P in keyof typeof COMMANDS]: RedisClientCommandSignature<(typeof COMMANDS)[P]>;
};
export declare type ExcludeMappedString<S> = string extends S ? never : S;
export declare type WithModules<M extends RedisModules> = {
    [P in keyof M as ExcludeMappedString<P>]: {
        [C in keyof M[P] as ExcludeMappedString<C>]: RedisClientCommandSignature<M[P][C]>;
    };
};
export declare type WithScripts<S extends RedisScripts> = {
    [P in keyof S as ExcludeMappedString<P>]: RedisClientCommandSignature<S[P]>;
};
export declare type RedisClientType<M extends RedisModules = Record<string, never>, S extends RedisScripts = Record<string, never>> = RedisClient<M, S> & WithCommands & WithModules<M> & WithScripts<S>;
export declare type InstantiableRedisClient<M extends RedisModules, S extends RedisScripts> = new (options?: RedisClientOptions<M, S>) => RedisClientType<M, S>;
export interface ClientCommandOptions extends QueueCommandOptions {
    isolated?: boolean;
}
export default class RedisClient<M extends RedisModules, S extends RedisScripts> extends EventEmitter {
    #private;
    static commandOptions<T extends ClientCommandOptions>(options: T): CommandOptions<T>;
    commandOptions: typeof RedisClient.commandOptions;
    static extend<M extends RedisModules, S extends RedisScripts>(plugins?: RedisPlugins<M, S>): InstantiableRedisClient<M, S>;
    static create<M extends RedisModules, S extends RedisScripts>(options?: RedisClientOptions<M, S>): RedisClientType<M, S>;
    static parseURL(url: string): RedisClientOptions;
    get options(): RedisClientOptions<M, S> | undefined;
    get isOpen(): boolean;
    get v4(): Record<string, any>;
    constructor(options?: RedisClientOptions<M, S>);
    duplicate(overrides?: Partial<RedisClientOptions<M, S>>): RedisClientType<M, S>;
    connect(): Promise<void>;
    commandsExecutor(command: RedisCommand, args: Array<unknown>): Promise<RedisCommandReply<typeof command>>;
    sendCommand<T = RedisCommandRawReply>(args: RedisCommandArguments, options?: ClientCommandOptions): Promise<T>;
    scriptsExecutor(script: RedisScript, args: Array<unknown>): Promise<RedisCommandReply<typeof script>>;
    executeScript(script: RedisScript, args: RedisCommandArguments, options?: ClientCommandOptions): Promise<RedisCommandReply<typeof script>>;
    SELECT(db: number): Promise<void>;
    SELECT(options: CommandOptions<ClientCommandOptions>, db: number): Promise<void>;
    select: {
        (db: number): Promise<void>;
        (options: CommandOptions<ClientCommandOptions>, db: number): Promise<void>;
    };
    SUBSCRIBE<T extends boolean = false>(channels: string | Array<string>, listener: PubSubListener<T>, bufferMode?: T): Promise<void>;
    subscribe: <T extends boolean = false>(channels: string | Array<string>, listener: PubSubListener<T, T extends true ? Buffer : string>, bufferMode?: T | undefined) => Promise<void>;
    PSUBSCRIBE<T extends boolean = false>(patterns: string | Array<string>, listener: PubSubListener<T>, bufferMode?: T): Promise<void>;
    pSubscribe: <T extends boolean = false>(patterns: string | Array<string>, listener: PubSubListener<T, T extends true ? Buffer : string>, bufferMode?: T | undefined) => Promise<void>;
    UNSUBSCRIBE<T extends boolean = false>(channels?: string | Array<string>, listener?: PubSubListener<T>, bufferMode?: T): Promise<void>;
    unsubscribe: <T extends boolean = false>(channels?: string | string[] | undefined, listener?: PubSubListener<T, T extends true ? Buffer : string> | undefined, bufferMode?: T | undefined) => Promise<void>;
    PUNSUBSCRIBE<T extends boolean = false>(patterns?: string | Array<string>, listener?: PubSubListener<T>, bufferMode?: T): Promise<void>;
    pUnsubscribe: <T extends boolean = false>(patterns?: string | string[] | undefined, listener?: PubSubListener<T, T extends true ? Buffer : string> | undefined, bufferMode?: T | undefined) => Promise<void>;
    QUIT(): Promise<void>;
    quit: () => Promise<void>;
    executeIsolated<T>(fn: (client: RedisClientType<M, S>) => T | Promise<T>): Promise<T>;
    multi(): RedisClientMultiCommandType<M, S>;
    multiExecutor(commands: Array<RedisMultiQueuedCommand>, chainId?: symbol): Promise<Array<RedisCommandRawReply>>;
    scanIterator(options?: ScanCommandOptions): AsyncIterable<string>;
    hScanIterator(key: string, options?: ScanOptions): AsyncIterable<ConvertArgumentType<HScanTuple, string>>;
    sScanIterator(key: string, options?: ScanOptions): AsyncIterable<string>;
    zScanIterator(key: string, options?: ScanOptions): AsyncIterable<ConvertArgumentType<ZMember, string>>;
    disconnect(): Promise<void>;
}
export {};
