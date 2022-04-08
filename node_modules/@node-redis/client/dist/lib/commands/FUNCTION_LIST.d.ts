import { RedisCommandArguments } from '.';
import { RedisFunctionEngines } from './FUNCTION_LOAD';
export declare enum RedisFunctionFlags {
    NO_WRITES = "no-writes",
    ALLOW_OOM = "allow-oom",
    ALLOW_STALE = "allow-stale",
    NO_CLUSTER = "no-cluster"
}
export declare function transformArguments(pattern?: string): RedisCommandArguments;
export declare type FunctionListRawReply = [
    'library_name',
    string,
    'engine',
    RedisFunctionEngines,
    'description',
    string,
    'functions',
    Array<[
        'name',
        string,
        'description',
        string | null,
        'flags',
        Array<RedisFunctionFlags>
    ]>
];
export interface FunctionListReply {
    libraryName: string;
    engine: RedisFunctionEngines;
    description: string;
    functions: Array<{
        name: string;
        description: string | null;
        flags: Array<RedisFunctionFlags>;
    }>;
}
export declare function transformReply(reply: FunctionListRawReply): FunctionListReply;
