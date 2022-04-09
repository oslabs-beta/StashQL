import { RedisCommandArgument, RedisCommandArguments } from '.';
import { LMoveSide } from './LMOVE';
export declare const FIRST_KEY_INDEX = 1;
export declare function transformArguments(source: RedisCommandArgument, destination: RedisCommandArgument, sourceDirection: LMoveSide, destinationDirection: LMoveSide, timeout: number): RedisCommandArguments;
export declare function transformReply(): RedisCommandArgument | null;
