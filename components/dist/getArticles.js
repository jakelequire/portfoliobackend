"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var _processMarkdown_1 = require("./_processMarkdown");
/**
 * #### Parses markdown files from a directory and outputs an `array of objects`.
 * Each object represents an article, containing metadata such as the title, date, tags, and image,
 * as well as the content of the article. The articles can be sorted by date, alphabetically, tags,
 * or category.
 *
 * @param {RequestParams} req - The request parameters
 *
 * @return {Promise<Article[]>} Promise that resolves to an array of Article objects.
 *
 * @throws {Error} If the file cannot be read
 * @throws {Error} If search parameters are incorrect.
 */
function getArticles(req) {
    return __awaiter(this, void 0, void 0, function () {
        var date, query, articles;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(" !!!! -- New Request -- !!!! ");
                    console.log("<getArticles>      Request: " + req.query);
                    date = "date";
                    console.log("<getArticles> ArticleParse: " + sortArticles(date).toString());
                    query = req.query;
                    return [4 /*yield*/, sortArticles(query)];
                case 1:
                    articles = _a.sent();
                    console.log(" **** -- Request Complete -- **** ");
                    console.log(" ");
                    console.log("_________________________________________________________");
                    return [2 /*return*/, articles];
            }
        });
    });
}
exports["default"] = getArticles;
/**
 * #### Sorts the articles by the `query parameter`.
 *
 * @param {string} sortBy - The query parameter
 *
 * @return {Promise<Article[]>} Promise that resolves to an array of Article objects.
 *
 * @throws {Error} If search parameters are incorrect.
 */
function sortArticles(sortBy) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, error_1, err;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 12, , 13]);
                    _a = sortBy;
                    switch (_a) {
                        case 'date': return [3 /*break*/, 1];
                        case 'alphabetically': return [3 /*break*/, 3];
                        case 'tags': return [3 /*break*/, 5];
                        case 'category': return [3 /*break*/, 7];
                    }
                    return [3 /*break*/, 9];
                case 1: return [4 /*yield*/, sortByDate()];
                case 2: return [2 /*return*/, _b.sent()];
                case 3: return [4 /*yield*/, sortAlphabetically()];
                case 4: return [2 /*return*/, _b.sent()];
                case 5: return [4 /*yield*/, sortTags()];
                case 6: return [2 /*return*/, _b.sent()];
                case 7: return [4 /*yield*/, sortCategory()];
                case 8: return [2 /*return*/, _b.sent()];
                case 9: return [4 /*yield*/, sortByDate()];
                case 10: return [2 /*return*/, _b.sent()];
                case 11: return [3 /*break*/, 13];
                case 12:
                    error_1 = _b.sent();
                    err = new Error('ERROR <sortArticles>: Incorrect search parameters');
                    throw err;
                case 13: return [2 /*return*/];
            }
        });
    });
}
/**
 * #### Sorts the articles by `date`.
 *
 * @return {Promise<Article[]>} Promise that resolves to an array of Article objects.
 *
 * @throws {Error} If the file cannot be read
 */
function sortByDate() {
    return __awaiter(this, void 0, void 0, function () {
        var articles;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _processMarkdown_1["default"]()];
                case 1:
                    articles = _a.sent();
                    articles.sort(function (a, b) {
                        var dateA = new Date(a.date);
                        var dateB = new Date(b.date);
                        return dateB.getTime() - dateA.getTime();
                    });
                    return [2 /*return*/, articles];
            }
        });
    });
}
/**
 * #### Sorts the articles `alphabetically`.
 *
 * @return {Promise<Article[]>} Promise that resolves to an array of Article objects.
 *
 * @throws {Error} If the file cannot be read
 */
function sortAlphabetically() {
    return __awaiter(this, void 0, void 0, function () {
        var articles, sortedArticles, err;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _processMarkdown_1["default"]()];
                case 1:
                    articles = _a.sent();
                    try {
                        sortedArticles = articles.sort(function (a, b) {
                            var titleA = a.title.toUpperCase();
                            var titleB = b.title.toUpperCase();
                            return (titleA < titleB) ? -1 : (titleA > titleB) ? 1 : 0;
                        });
                        return [2 /*return*/, sortedArticles];
                    }
                    catch (error) {
                        err = new Error('ERROR <sortAlphabetically>: Cannot read file');
                        throw err;
                    }
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * #### Sorts the articles by `tags`.
 *
 * @return {Promise<Article[]>} Promise that resolves to an array of Article objects.
 *
 * @throws {Error} If the file cannot be read
 */
function sortTags() {
    return __awaiter(this, void 0, void 0, function () {
        var articles, sortedArticles, err;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _processMarkdown_1["default"]()];
                case 1:
                    articles = _a.sent();
                    try {
                        sortedArticles = articles.sort(function (a, b) {
                            var tagA = a.tags.toUpperCase();
                            var tagB = b.tags.toUpperCase();
                            return (tagA < tagB) ? -1 : (tagA > tagB) ? 1 : 0;
                        });
                        return [2 /*return*/, sortedArticles];
                    }
                    catch (error) {
                        err = new Error('ERROR <sortTags>: Cannot read file');
                        throw err;
                    }
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * #### Sorts the articles by `category`.
 *
 * @return {Promise<Article[]>} Promise that resolves to an array of Article objects.
 *
 * @throws {Error} If the file cannot be read
 */
function sortCategory() {
    return __awaiter(this, void 0, void 0, function () {
        var articles, sortedArticles, err;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _processMarkdown_1["default"]()];
                case 1:
                    articles = _a.sent();
                    try {
                        sortedArticles = articles.sort(function (a, b) {
                            var categoryA = a.category.toUpperCase();
                            var categoryB = b.category.toUpperCase();
                            return (categoryA < categoryB) ? -1 : (categoryA > categoryB) ? 1 : 0;
                        });
                        return [2 /*return*/, sortedArticles];
                    }
                    catch (error) {
                        err = new Error('ERROR <sortCategory>: Cannot read file');
                        throw err;
                    }
                    return [2 /*return*/];
            }
        });
    });
}
