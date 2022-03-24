import { RedisCommandArgument, RedisCommandArguments } from '.';
export declare const FIRST_KEY_INDEX = 2;
declare type BitOperations = 'AND' | 'OR' | 'XOR' | 'NOT';
export declare function transformArguments(operation: BitOperations, destKey: RedisCommandArgument, key: RedisCommandArgument | Array<RedisCommandArgument>): RedisCommandArguments;
export declare function transformReply(): number;
export {};
