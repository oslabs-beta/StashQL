export declare function transformArguments(): Array<string>;
declare type ClusterLinksRawReply = Array<[
    'direction',
    string,
    'node',
    string,
    'createTime',
    number,
    'events',
    string,
    'send-buffer-allocated',
    number,
    'send-buffer-used',
    number
]>;
declare type ClusterLinksReply = Array<{
    direction: string;
    node: string;
    createTime: number;
    events: string;
    sendBufferAllocated: number;
    sendBufferUsed: number;
}>;
export declare function transformReply(reply: ClusterLinksRawReply): ClusterLinksReply;
export {};
