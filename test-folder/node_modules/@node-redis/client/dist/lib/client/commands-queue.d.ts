/// <reference types="node" />
import { RedisCommandArgument, RedisCommandArguments, RedisCommandRawReply } from '../commands';
export interface QueueCommandOptions {
    asap?: boolean;
    chainId?: symbol;
    signal?: AbortSignal;
    returnBuffers?: boolean;
    ignorePubSubMode?: boolean;
}
export declare enum PubSubSubscribeCommands {
    SUBSCRIBE = "SUBSCRIBE",
    PSUBSCRIBE = "PSUBSCRIBE"
}
export declare enum PubSubUnsubscribeCommands {
    UNSUBSCRIBE = "UNSUBSCRIBE",
    PUNSUBSCRIBE = "PUNSUBSCRIBE"
}
export declare type PubSubListener<RETURN_BUFFERS extends boolean = false, T = RETURN_BUFFERS extends true ? Buffer : string> = (message: T, channel: T) => unknown;
export default class RedisCommandsQueue {
    #private;
    constructor(maxLength: number | null | undefined);
    addCommand<T = RedisCommandRawReply>(args: RedisCommandArguments, options?: QueueCommandOptions): Promise<T>;
    subscribe<T extends boolean>(command: PubSubSubscribeCommands, channels: RedisCommandArgument | Array<RedisCommandArgument>, listener: PubSubListener<T>, returnBuffers?: T): Promise<void>;
    unsubscribe<T extends boolean>(command: PubSubUnsubscribeCommands, channels?: string | Array<string>, listener?: PubSubListener<T>, returnBuffers?: T): Promise<void>;
    resubscribe(): Promise<any> | undefined;
    getCommandToSend(): RedisCommandArguments | undefined;
    parseResponse(data: Buffer): void;
    flushWaitingForReply(err: Error): void;
    flushAll(err: Error): void;
}
