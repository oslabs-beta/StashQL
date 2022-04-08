/// <reference types="node" />
import { RedisScriptConfig, SHA1 } from '../lua-script';
interface RedisCommandRawReplyArray extends Array<RedisCommandRawReply> {
}
export declare type RedisCommandRawReply = string | number | Buffer | null | undefined | RedisCommandRawReplyArray;
export declare type RedisCommandArgument = string | Buffer;
export declare type RedisCommandArguments = Array<RedisCommandArgument> & {
    preserve?: unknown;
};
export interface RedisCommand {
    FIRST_KEY_INDEX?: number | ((...args: Array<any>) => RedisCommandArgument);
    IS_READ_ONLY?: boolean;
    transformArguments(this: void, ...args: Array<any>): RedisCommandArguments;
    transformReply?(this: void, reply: any, preserved?: any): any;
}
export declare type RedisCommandReply<C extends RedisCommand> = C['transformReply'] extends (...args: any) => infer T ? T : RedisCommandRawReply;
export interface RedisCommands {
    [command: string]: RedisCommand;
}
export interface RedisModule {
    [command: string]: RedisCommand;
}
export interface RedisModules {
    [module: string]: RedisModule;
}
export declare type RedisScript = RedisScriptConfig & SHA1;
export interface RedisScripts {
    [script: string]: RedisScript;
}
export interface RedisPlugins<M extends RedisModules, S extends RedisScripts> {
    modules?: M;
    scripts?: S;
}
export {};
