export declare function transformArguments(index: string): Array<string>;
declare type InfoRawReply = [
    _: string,
    indexName: string,
    _: string,
    indexOptions: Array<string>,
    _: string,
    indexDefinition: [
        _: string,
        keyType: string,
        _: string,
        prefixes: Array<string>,
        _: string,
        defaultScore: string
    ],
    _: string,
    attributes: Array<Array<string>>,
    _: string,
    numDocs: string,
    _: string,
    maxDocId: string,
    _: string,
    numTerms: string,
    _: string,
    numRecords: string,
    _: string,
    invertedSzMb: string,
    _: string,
    totalInvertedIndexBlocks: string,
    _: string,
    offsetVectorsSzMb: string,
    _: string,
    docTableSizeMb: string,
    _: string,
    sortableValuesSizeMb: string,
    _: string,
    keyTableSizeMb: string,
    _: string,
    recordsPerDocAvg: string,
    _: string,
    bytesPerRecordAvg: string,
    _: string,
    offsetsPerTermAvg: string,
    _: string,
    offsetBitsPerRecordAvg: string,
    _: string,
    hashIndexingFailures: string,
    _: string,
    indexing: string,
    _: string,
    percentIndexed: string,
    _: string,
    gcStats: [
        _: string,
        bytesCollected: string,
        _: string,
        totalMsRun: string,
        _: string,
        totalCycles: string,
        _: string,
        averageCycleTimeMs: string,
        _: string,
        lastRunTimeMs: string,
        _: string,
        gcNumericTreesMissed: string,
        _: string,
        gcBlocksDenied: string
    ],
    _: string,
    cursorStats: [
        _: string,
        globalIdle: number,
        _: string,
        globalTotal: number,
        _: string,
        indexCapacity: number,
        _: string,
        idnexTotal: number
    ]
];
interface InfoReply {
    indexName: string;
    indexOptions: Array<string>;
    indexDefinition: {
        keyType: string;
        prefixes: Array<string>;
        defaultScore: string;
    };
    attributes: Array<Array<string>>;
    numDocs: string;
    maxDocId: string;
    numTerms: string;
    numRecords: string;
    invertedSzMb: string;
    totalInvertedIndexBlocks: string;
    offsetVectorsSzMb: string;
    docTableSizeMb: string;
    sortableValuesSizeMb: string;
    keyTableSizeMb: string;
    recordsPerDocAvg: string;
    bytesPerRecordAvg: string;
    offsetsPerTermAvg: string;
    offsetBitsPerRecordAvg: string;
    hashIndexingFailures: string;
    indexing: string;
    percentIndexed: string;
    gcStats: {
        bytesCollected: string;
        totalMsRun: string;
        totalCycles: string;
        averageCycleTimeMs: string;
        lastRunTimeMs: string;
        gcNumericTreesMissed: string;
        gcBlocksDenied: string;
    };
    cursorStats: {
        globalIdle: number;
        globalTotal: number;
        indexCapacity: number;
        idnexTotal: number;
    };
}
export declare function transformReply(rawReply: InfoRawReply): InfoReply;
export {};
