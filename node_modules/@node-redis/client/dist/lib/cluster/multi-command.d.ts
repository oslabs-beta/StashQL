import COMMANDS from './commands';
import { RedisCommand, RedisCommandArgument, RedisCommandArguments, RedisCommandRawReply, RedisModules, RedisPlugins, RedisScript, RedisScripts } from '../commands';
import RedisMultiCommand, { RedisMultiQueuedCommand } from '../multi-command';
import { ExcludeMappedString } from '../client';
declare type RedisClusterMultiCommandSignature<C extends RedisCommand, M extends RedisModules, S extends RedisScripts> = (...args: Parameters<C['transformArguments']>) => RedisClusterMultiCommandType<M, S>;
declare type WithCommands<M extends RedisModules, S extends RedisScripts> = {
    [P in keyof typeof COMMANDS]: RedisClusterMultiCommandSignature<(typeof COMMANDS)[P], M, S>;
};
declare type WithModules<M extends RedisModules, S extends RedisScripts> = {
    [P in keyof M as ExcludeMappedString<P>]: {
        [C in keyof M[P] as ExcludeMappedString<C>]: RedisClusterMultiCommandSignature<M[P][C], M, S>;
    };
};
declare type WithScripts<M extends RedisModules, S extends RedisScripts> = {
    [P in keyof S as ExcludeMappedString<P>]: RedisClusterMultiCommandSignature<S[P], M, S>;
};
export declare type RedisClusterMultiCommandType<M extends RedisModules, S extends RedisScripts> = RedisClusterMultiCommand & WithCommands<M, S> & WithModules<M, S> & WithScripts<M, S>;
export declare type RedisClusterMultiExecutor = (queue: Array<RedisMultiQueuedCommand>, firstKey?: RedisCommandArgument, chainId?: symbol) => Promise<Array<RedisCommandRawReply>>;
export default class RedisClusterMultiCommand {
    #private;
    static extend<M extends RedisModules, S extends RedisScripts>(plugins?: RedisPlugins<M, S>): new (...args: ConstructorParameters<typeof RedisMultiCommand>) => RedisClusterMultiCommandType<M, S>;
    constructor(executor: RedisClusterMultiExecutor, firstKey?: RedisCommandArgument);
    commandsExecutor(command: RedisCommand, args: Array<unknown>): this;
    addCommand(firstKey: RedisCommandArgument | undefined, args: RedisCommandArguments, transformReply?: RedisCommand['transformReply']): this;
    scriptsExecutor(script: RedisScript, args: Array<unknown>): this;
    exec(execAsPipeline?: boolean): Promise<Array<RedisCommandRawReply>>;
    EXEC: (execAsPipeline?: boolean) => Promise<Array<RedisCommandRawReply>>;
    execAsPipeline(): Promise<Array<RedisCommandRawReply>>;
}
export {};
