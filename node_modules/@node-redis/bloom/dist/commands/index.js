"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bloom_1 = require("./bloom");
const count_min_sketch_1 = require("./count-min-sketch");
const cuckoo_1 = require("./cuckoo");
const top_k_1 = require("./top-k");
exports.default = {
    bf: bloom_1.default,
    cms: count_min_sketch_1.default,
    cf: cuckoo_1.default,
    topK: top_k_1.default
};
