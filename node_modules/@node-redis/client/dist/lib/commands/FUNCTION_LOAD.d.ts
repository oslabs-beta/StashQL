import { RedisCommandArguments } from '.';
export declare enum RedisFunctionEngines {
    LUA = "LUA"
}
interface FunctionLoadOptions {
    REPLACE?: boolean;
    DESCRIPTION?: string;
}
export declare function transformArguments(engine: RedisFunctionEngines, library: string, code: string, options?: FunctionLoadOptions): RedisCommandArguments;
export declare function transformReply(): 'OK';
export {};
