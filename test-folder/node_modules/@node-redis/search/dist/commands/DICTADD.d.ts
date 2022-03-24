import { RedisCommandArguments } from '@node-redis/client/dist/lib/commands';
export declare function transformArguments(dictionary: string, term: string | Array<string>): RedisCommandArguments;
export declare function transformReply(): number;
