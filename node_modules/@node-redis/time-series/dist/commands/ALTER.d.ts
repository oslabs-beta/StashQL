import { Labels } from '.';
export declare const FIRST_KEY_INDEX = 1;
interface AlterOptions {
    RETENTION?: number;
    LABELS?: Labels;
}
export declare function transformArguments(key: string, options?: AlterOptions): Array<string>;
export declare function transformReply(): 'OK';
export {};
