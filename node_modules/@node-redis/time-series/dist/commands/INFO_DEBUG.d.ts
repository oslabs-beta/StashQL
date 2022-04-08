import { InfoRawReply, InfoReply } from './INFO';
export { IS_READ_ONLY, FIRST_KEY_INDEX } from './INFO';
export declare function transformArguments(key: string): Array<string>;
declare type InfoDebugRawReply = [
    ...infoArgs: InfoRawReply,
    _: string,
    keySelfName: string,
    _: string,
    chunks: Array<[
        _: string,
        startTimestamp: number,
        _: string,
        endTimestamp: number,
        _: string,
        samples: number,
        _: string,
        size: number,
        _: string,
        bytesPerSample: string
    ]>
];
interface InfoDebugReply extends InfoReply {
    keySelfName: string;
    chunks: Array<{
        startTimestamp: number;
        endTimestamp: number;
        samples: number;
        size: number;
        bytesPerSample: string;
    }>;
}
export declare function transformReply(rawReply: InfoDebugRawReply): InfoDebugReply;
