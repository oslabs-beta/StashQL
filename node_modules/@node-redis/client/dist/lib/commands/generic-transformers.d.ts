import { RedisCommandArgument, RedisCommandArguments } from '.';
export declare function transformBooleanReply(reply: number): boolean;
export declare function transformBooleanArrayReply(reply: Array<number>): Array<boolean>;
export declare type BitValue = 0 | 1;
export interface ScanOptions {
    MATCH?: string;
    COUNT?: number;
}
export declare function pushScanArguments(args: RedisCommandArguments, cursor: number, options?: ScanOptions): RedisCommandArguments;
export declare function transformNumberInfinityReply(reply: RedisCommandArgument): number;
export declare function transformNumberInfinityNullReply(reply: RedisCommandArgument | null): number | null;
export declare function transformNumberInfinityNullArrayReply(reply: Array<RedisCommandArgument | null>): Array<number | null>;
export declare function transformNumberInfinityArgument(num: number): string;
export declare function transformStringNumberInfinityArgument(num: RedisCommandArgument | number): RedisCommandArgument;
export declare function transformTuplesReply(reply: Array<RedisCommandArgument>): Record<string, RedisCommandArgument>;
export interface StreamMessageReply {
    id: RedisCommandArgument;
    message: Record<string, RedisCommandArgument>;
}
export declare type StreamMessagesReply = Array<StreamMessageReply>;
export declare function transformStreamMessagesReply(reply: Array<any>): StreamMessagesReply;
export declare type StreamsMessagesReply = Array<{
    name: RedisCommandArgument;
    messages: StreamMessagesReply;
}> | null;
export declare function transformStreamsMessagesReply(reply: Array<any> | null): StreamsMessagesReply | null;
export interface ZMember {
    score: number;
    value: RedisCommandArgument;
}
export declare function transformSortedSetMemberNullReply(reply: [RedisCommandArgument, RedisCommandArgument] | []): ZMember | null;
export declare function transformSortedSetWithScoresReply(reply: Array<RedisCommandArgument>): Array<ZMember>;
declare type GeoCountArgument = number | {
    value: number;
    ANY?: true;
};
export declare function pushGeoCountArgument(args: RedisCommandArguments, count: GeoCountArgument | undefined): RedisCommandArguments;
export declare type GeoUnits = 'm' | 'km' | 'mi' | 'ft';
export interface GeoCoordinates {
    longitude: string | number;
    latitude: string | number;
}
declare type GeoSearchFromMember = string;
export declare type GeoSearchFrom = GeoSearchFromMember | GeoCoordinates;
interface GeoSearchByRadius {
    radius: number;
    unit: GeoUnits;
}
interface GeoSearchByBox {
    width: number;
    height: number;
    unit: GeoUnits;
}
export declare type GeoSearchBy = GeoSearchByRadius | GeoSearchByBox;
export interface GeoSearchOptions {
    SORT?: 'ASC' | 'DESC';
    COUNT?: GeoCountArgument;
}
export declare function pushGeoSearchArguments(args: RedisCommandArguments, key: RedisCommandArgument, from: GeoSearchFrom, by: GeoSearchBy, options?: GeoSearchOptions): RedisCommandArguments;
export declare enum GeoReplyWith {
    DISTANCE = "WITHDIST",
    HASH = "WITHHASH",
    COORDINATES = "WITHCOORD"
}
export interface GeoReplyWithMember {
    member: string;
    distance?: number;
    hash?: string;
    coordinates?: {
        longitude: string;
        latitude: string;
    };
}
export declare function transformGeoMembersWithReply(reply: Array<Array<any>>, replyWith: Array<GeoReplyWith>): Array<GeoReplyWithMember>;
export declare function transformEXAT(EXAT: number | Date): string;
export declare function transformPXAT(PXAT: number | Date): string;
export interface EvalOptions {
    keys?: Array<string>;
    arguments?: Array<string>;
}
export declare function pushEvalArguments(args: Array<string>, options?: EvalOptions): Array<string>;
export declare function pushVerdictArguments(args: RedisCommandArguments, value: RedisCommandArgument | Array<RedisCommandArgument>): RedisCommandArguments;
export declare function pushVerdictNumberArguments(args: RedisCommandArguments, value: number | Array<number>): RedisCommandArguments;
export declare function pushVerdictArgument(args: RedisCommandArguments, value: RedisCommandArgument | Array<RedisCommandArgument>): RedisCommandArguments;
export declare function pushOptionalVerdictArgument(args: RedisCommandArguments, name: RedisCommandArgument, value: undefined | RedisCommandArgument | Array<RedisCommandArgument>): RedisCommandArguments;
export declare enum CommandFlags {
    WRITE = "write",
    READONLY = "readonly",
    DENYOOM = "denyoom",
    ADMIN = "admin",
    PUBSUB = "pubsub",
    NOSCRIPT = "noscript",
    RANDOM = "random",
    SORT_FOR_SCRIPT = "sort_for_script",
    LOADING = "loading",
    STALE = "stale",
    SKIP_MONITOR = "skip_monitor",
    ASKING = "asking",
    FAST = "fast",
    MOVABLEKEYS = "movablekeys"
}
export declare enum CommandCategories {
    KEYSPACE = "@keyspace",
    READ = "@read",
    WRITE = "@write",
    SET = "@set",
    SORTEDSET = "@sortedset",
    LIST = "@list",
    HASH = "@hash",
    STRING = "@string",
    BITMAP = "@bitmap",
    HYPERLOGLOG = "@hyperloglog",
    GEO = "@geo",
    STREAM = "@stream",
    PUBSUB = "@pubsub",
    ADMIN = "@admin",
    FAST = "@fast",
    SLOW = "@slow",
    BLOCKING = "@blocking",
    DANGEROUS = "@dangerous",
    CONNECTION = "@connection",
    TRANSACTION = "@transaction",
    SCRIPTING = "@scripting"
}
export declare type CommandRawReply = [
    name: string,
    arity: number,
    flags: Array<CommandFlags>,
    firstKeyIndex: number,
    lastKeyIndex: number,
    step: number,
    categories: Array<CommandCategories>
];
export declare type CommandReply = {
    name: string;
    arity: number;
    flags: Set<CommandFlags>;
    firstKeyIndex: number;
    lastKeyIndex: number;
    step: number;
    categories: Set<CommandCategories>;
};
export declare function transformCommandReply(this: void, [name, arity, flags, firstKeyIndex, lastKeyIndex, step, categories]: CommandRawReply): CommandReply;
export interface SortOptions {
    BY?: string;
    LIMIT?: {
        offset: number;
        count: number;
    };
    GET?: string | Array<string>;
    DIRECTION?: 'ASC' | 'DESC';
    ALPHA?: true;
}
export declare function pushSortArguments(args: RedisCommandArguments, options?: SortOptions): RedisCommandArguments;
export interface SlotRange {
    start: number;
    end: number;
}
export declare function pushSlotRangesArguments(args: RedisCommandArguments, ranges: SlotRange | Array<SlotRange>): RedisCommandArguments;
export {};
