import { AggregateOptions, AggregateRawReply } from './AGGREGATE';
import { ProfileOptions, ProfileRawReply, ProfileReply } from '.';
export declare const IS_READ_ONLY = true;
export declare function transformArguments(index: string, query: string, options?: ProfileOptions & AggregateOptions): Array<string>;
declare type ProfileAggeregateRawReply = ProfileRawReply<AggregateRawReply>;
export declare function transformReply(reply: ProfileAggeregateRawReply): ProfileReply;
export {};
