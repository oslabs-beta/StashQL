/// <reference types="node" />
import { Composer } from './interface';
export default class IntegerComposer implements Composer<number> {
    #private;
    write(buffer: Buffer): void;
    end(buffer: Buffer): number;
}
