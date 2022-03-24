"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformReply = exports.transformArguments = void 0;
function transformArguments(index) {
    return ['FT.INFO', index];
}
exports.transformArguments = transformArguments;
function transformReply(rawReply) {
    return {
        indexName: rawReply[1],
        indexOptions: rawReply[3],
        indexDefinition: {
            keyType: rawReply[5][1],
            prefixes: rawReply[5][3],
            defaultScore: rawReply[5][5]
        },
        attributes: rawReply[7],
        numDocs: rawReply[9],
        maxDocId: rawReply[11],
        numTerms: rawReply[13],
        numRecords: rawReply[15],
        invertedSzMb: rawReply[17],
        totalInvertedIndexBlocks: rawReply[19],
        offsetVectorsSzMb: rawReply[21],
        docTableSizeMb: rawReply[23],
        sortableValuesSizeMb: rawReply[25],
        keyTableSizeMb: rawReply[27],
        recordsPerDocAvg: rawReply[29],
        bytesPerRecordAvg: rawReply[31],
        offsetsPerTermAvg: rawReply[33],
        offsetBitsPerRecordAvg: rawReply[35],
        hashIndexingFailures: rawReply[37],
        indexing: rawReply[39],
        percentIndexed: rawReply[41],
        gcStats: {
            bytesCollected: rawReply[43][1],
            totalMsRun: rawReply[43][3],
            totalCycles: rawReply[43][5],
            averageCycleTimeMs: rawReply[43][7],
            lastRunTimeMs: rawReply[43][9],
            gcNumericTreesMissed: rawReply[43][11],
            gcBlocksDenied: rawReply[43][13]
        },
        cursorStats: {
            globalIdle: rawReply[45][1],
            globalTotal: rawReply[45][3],
            indexCapacity: rawReply[45][5],
            idnexTotal: rawReply[45][7]
        }
    };
}
exports.transformReply = transformReply;
