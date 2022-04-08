import { RedisCommandArgument, RedisCommandArguments } from '.';
export declare const FIRST_KEY_INDEX = 2;
export declare const IS_READ_ONLY = true;
export declare function transformArguments(key: RedisCommandArgument, group: RedisCommandArgument): RedisCommandArguments;
declare type XInfoConsumersReply = Array<{
    name: RedisCommandArgument;
    pending: number;
    idle: number;
}>;
export declare function transformReply(rawReply: Array<any>): XInfoConsumersReply;
export {};
