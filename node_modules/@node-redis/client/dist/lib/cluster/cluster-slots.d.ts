import { RedisClientType } from '../client';
import { RedisClusterOptions } from '.';
import { RedisCommandArgument, RedisModules, RedisScripts } from '../commands';
export interface ClusterNode<M extends RedisModules, S extends RedisScripts> {
    id: string;
    client: RedisClientType<M, S>;
}
interface NodeAddress {
    host: string;
    port: number;
}
export declare type NodeAddressMap = {
    [address: string]: NodeAddress;
} | ((address: string) => NodeAddress | undefined);
declare type OnError = (err: unknown) => void;
export default class RedisClusterSlots<M extends RedisModules, S extends RedisScripts> {
    #private;
    constructor(options: RedisClusterOptions<M, S>, onError: OnError);
    connect(): Promise<void>;
    rediscover(startWith: RedisClientType<M, S>): Promise<void>;
    getSlotMaster(slot: number): ClusterNode<M, S>;
    getClient(firstKey?: RedisCommandArgument, isReadonly?: boolean): RedisClientType<M, S>;
    getMasters(): Array<ClusterNode<M, S>>;
    getNodeByAddress(address: string): ClusterNode<M, S> | undefined;
    quit(): Promise<void>;
    disconnect(): Promise<void>;
}
export {};
