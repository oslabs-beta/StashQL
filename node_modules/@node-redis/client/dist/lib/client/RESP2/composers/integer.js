"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ASCII_ZERO = 48, ASCII_MINUS = 45;
class IntegerComposer {
    #isNegative;
    #integer;
    write(buffer) {
        let i = 0;
        if (this.#isNegative === undefined) {
            this.#isNegative = buffer[0] === ASCII_MINUS;
            if (this.#isNegative)
                ++i;
        }
        this.#integer = buffer[i] - ASCII_ZERO;
        while (++i < buffer.length) {
            this.#integer = this.#integer * 10 + buffer[i] - ASCII_ZERO;
        }
    }
    end(buffer) {
        this.write(buffer);
        const integer = this.#isNegative ? -this.#integer : this.#integer;
        this.#isNegative = this.#integer = undefined;
        return integer;
    }
}
exports.default = IntegerComposer;
