import { RedisCommandArgument, RedisCommandArguments } from '.';
export declare const FIRST_KEY_INDEX = 1;
export declare function transformArguments(keys: RedisCommandArgument | Array<RedisCommandArgument>, timeout: number): RedisCommandArguments;
declare type BLPopRawReply = null | [RedisCommandArgument, RedisCommandArgument];
declare type BLPopReply = null | {
    key: RedisCommandArgument;
    element: RedisCommandArgument;
};
export declare function transformReply(reply: BLPopRawReply): BLPopReply;
export {};
