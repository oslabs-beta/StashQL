"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class stashql {
    query;
    startTime;
    endTime;
    schema;
    cache;
    ttl;
    constructor(clientSchema, redisCache, life) {
        this.queryHandler = this.queryHandler.bind(this);
        this.refillCacheHandler = this.refillCacheHandler.bind(this);
        this.clearRelatedFieldsHandler = this.clearRelatedFieldsHandler.bind(this);
        this.clearCacheHandler = this.clearCacheHandler.bind(this);
        this.schema = clientSchema;
        this.query = "";
        this.cache = redisCache;
        this.ttl = life;
        this.startTime = 0;
        this.endTime = 0;
    }
    async queryHandler(req, res, next) {
        if (!fs_1.default.existsSync(path_1.default.join(process.cwd(), "logs"))) {
            try {
                fs_1.default.mkdirSync(path_1.default.join(process.cwd(), "logs"));
            }
            catch (error) {
                console.error("Error in running query: ", error);
                return next(error);
            }
        }
        this.startTime = performance.now();
        this.query = req.body.query;
        const query = req.body.query;
        if (query.slice(0, 8) !== "mutation") {
            try {
                if (await this.cache.exists(this.query)) {
                    const data = (await this.cache.get(this.query)) || "";
                    res.locals.data = JSON.parse(data);
                    this.endTime = performance.now();
                    res.locals.runTime = this.endTime - this.startTime;
                    try {
                        fs_1.default.appendFileSync(path_1.default.join(process.cwd(), "/logs/logs.txt"), `${JSON.stringify({
                            type: "cache",
                            query: this.query,
                            data: JSON.parse(data),
                            performance: this.endTime - this.startTime,
                        })}}\n`);
                    }
                    catch (error) {
                        console.error("Error in running query: ", error);
                        return next(error);
                    }
                    return next();
                }
                else {
                    await (0, graphql_1.graphql)({ schema: this.schema, source: this.query })
                        .then((data) => JSON.stringify(data))
                        .then((data) => {
                        this.cache.set(this.query, data);
                        if (this.ttl !== undefined) {
                            this.cache.expire(this.query, this.ttl);
                        }
                        res.locals.data = JSON.parse(data);
                        this.endTime = performance.now();
                        res.locals.runTime = this.endTime - this.startTime;
                        try {
                            fs_1.default.appendFileSync(path_1.default.join(process.cwd(), "/logs/logs.txt"), `${JSON.stringify({
                                type: "query",
                                query: this.query,
                                data: JSON.parse(data),
                                performance: this.endTime - this.startTime,
                            })}\n`);
                        }
                        catch (error) {
                            console.log(error);
                            return next(error);
                        }
                        return next();
                    })
                        .catch((error) => {
                        console.log("Error in else block of queryHandler for mutations: ", error);
                    });
                }
            }
            catch (error) {
                console.log("Error in running query: ", error);
                return next(error);
            }
        }
        else if (query.slice(0, 8) === "mutation") {
            try {
                const data = JSON.stringify(await (0, graphql_1.graphql)({ schema: this.schema, source: this.query }));
                if (query.includes("refillCache")) {
                    const startingIdx = query.indexOf("refillCache");
                    const parenIdx = query.indexOf(")", startingIdx);
                    const therefillCacheArg = query.slice(startingIdx, parenIdx - 1);
                    const colonIdx = therefillCacheArg.indexOf(":");
                    const theField = therefillCacheArg.slice(colonIdx + 1);
                    const quoteIdx = theField.indexOf('"');
                    const theRealField = theField.slice(quoteIdx + 1, theField.length - 1);
                    await this.refillCacheHandler(theRealField);
                }
                else if (query.includes("clearRelatedFields")) {
                    const startingIdx = query.indexOf("clearRelatedField");
                    const parenIdx = query.indexOf(")", startingIdx);
                    const theClearRelatedFieldsArg = query.slice(startingIdx, parenIdx - 1);
                    const colonIdx = theClearRelatedFieldsArg.indexOf(":");
                    const theField = theClearRelatedFieldsArg.slice(colonIdx + 1);
                    const quoteIdx = theField.indexOf('"');
                    const theRealField = theField.slice(quoteIdx + 1);
                    await this.clearRelatedFieldsHandler(theRealField);
                }
                res.locals.data = JSON.parse(data);
                this.endTime = performance.now();
                res.locals.runTime = this.endTime - this.startTime;
                try {
                    fs_1.default.appendFileSync(path_1.default.join(process.cwd(), "/logs/logs.txt"), `${JSON.stringify({
                        type: "mutation",
                        mutation: this.query,
                        data: JSON.parse(data),
                        performance: this.endTime - this.startTime,
                    })}}\n`);
                }
                catch (error) {
                    console.log(error);
                    return error;
                }
                return next();
            }
            catch (error) {
                console.log("Error in running mutation: ", error);
                return next();
            }
        }
    }
    async refillCacheHandler(field) {
        const queryKeys = await this.cache.keys("*");
        for (let queryKey of queryKeys) {
            const secondCurly = queryKey.indexOf("{", 1);
            const currQueryField = queryKey.slice(1, secondCurly).trim();
            let queryKeyCopy = queryKey.replace(/(\r\n|\n|\r)/gm, "");
            queryKeyCopy = queryKeyCopy.replace(/\s/g, "");
            let queryFieldsArr = queryKeyCopy
                .match(/.+?(?<=\{)|(.+?(?<=\())/gm)
                .filter(Boolean);
            queryFieldsArr.forEach((query, i) => {
                queryFieldsArr[i] = query.replace("{", "");
                queryFieldsArr[i] = queryFieldsArr[i].replace(/ *\([^)]*\) */g, "");
            });
            if (queryFieldsArr.includes(field)) {
                await (0, graphql_1.graphql)({ schema: this.schema, source: queryKey })
                    .then((data) => JSON.stringify(data))
                    .then((data) => {
                    this.cache.set(queryKey, data);
                    if (this.ttl !== undefined) {
                        this.cache.expire(queryKey, this.ttl);
                    }
                })
                    .catch((error) => {
                    console.error("error in refillCacheHandler: ", error);
                });
            }
        }
    }
    async clearRelatedFieldsHandler(field) {
        const queryKeys = await this.cache.keys("*");
        for (let queryKey of queryKeys) {
            const secondCurly = queryKey.indexOf("{", 1);
            const currQueryField = queryKey.slice(1, secondCurly).trim();
            let queryKeyCopy = queryKey.replace(/(\r\n|\n|\r)/gm, "");
            queryKeyCopy = queryKeyCopy.replace(/\s/g, "");
            let queryFieldsArr = queryKeyCopy
                .match(/.+?(?<=\{)|(.+?(?<=\())/gm)
                .filter(Boolean);
            queryFieldsArr.forEach((query, i) => {
                queryFieldsArr[i] = query.replace("{", "");
                queryFieldsArr[i] = queryFieldsArr[i].replace(/ *\([^)]*\) */g, "");
            });
            if (queryFieldsArr.includes(field)) {
                await this.cache.del(queryKey);
            }
        }
    }
    async clearCacheHandler(req, res, next) {
        try {
            await this.cache.flushAll();
            return next();
        }
        catch (error) {
            console.error("error in clearCacheHandler: ", error);
            return next();
        }
    }
}
module.exports = stashql;
