"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var fs_1 = require("fs");
var path_1 = require("path");
var articleDir = path_1.join(__dirname, '..', '../public/articles');
var articleParse = [];
/**
 * @summary Parses markdown files from a directory and outputs an `array of objects`.
 * Each object represents an article, containing metadata such as the title, date, tags, and image,
 * as well as the content of the article.
 *
 * @return {Promise<Article[]>} Promise that resolves to an array of Article objects.
 *
 * @throws {Error} If the file cannot be read
 */
function processMarkdown() {
    return __awaiter(this, void 0, void 0, function () {
        var err;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, parseFiles()];
                case 1:
                    _a.sent();
                    try {
                        return [2 /*return*/, articleParse.map(function (article) { return ({
                                title: article.title,
                                date: article.date,
                                content: article.content,
                                tags: article.tags,
                                category: article.category,
                                image: article.image,
                                imageAlt: article.imageAlt
                            }); })];
                    }
                    catch (error) {
                        err = new Error('Cannot read file');
                        throw err;
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports["default"] = processMarkdown;
/**
 * @summary Import the files from the directory and output to an array of objects
 *
 * @return an array of objects
 *
 * @throws {Error} If the file cannot be read
 */
function importFiles() {
    return __awaiter(this, void 0, void 0, function () {
        var articleFiles, files, _i, files_1, file, fileData, error_1, err;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    articleFiles = [];
                    return [4 /*yield*/, fs_1.promises.readdir(articleDir)];
                case 1:
                    files = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 7, , 8]);
                    _i = 0, files_1 = files;
                    _a.label = 3;
                case 3:
                    if (!(_i < files_1.length)) return [3 /*break*/, 6];
                    file = files_1[_i];
                    return [4 /*yield*/, fs_1.promises.readFile(articleDir + "/" + file, 'utf8')];
                case 4:
                    fileData = _a.sent();
                    articleFiles.push(fileData);
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6:
                    ;
                    return [2 /*return*/, articleFiles];
                case 7:
                    error_1 = _a.sent();
                    err = new Error('Cannot read file');
                    throw err;
                case 8: return [2 /*return*/];
            }
        });
    });
}
/**
 * @summary Parse the files from the directory and output to an array of objects
 * using Regular Expressions to parse the metadata and content of the article.
 *
 * @return a parsed array of objects
 *
 * @throws {Error} If the file cannot be read
 */
function parseFiles() {
    return __awaiter(this, void 0, void 0, function () {
        var parsedFiles, files, _i, files_2, file, regex, match, metadataString, metadata, content, err;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parsedFiles = [];
                    return [4 /*yield*/, importFiles()];
                case 1:
                    files = _a.sent();
                    try {
                        for (_i = 0, files_2 = files; _i < files_2.length; _i++) {
                            file = files_2[_i];
                            regex = /---\n(.*\n)*?---\n(.|\n)*/;
                            match = file.match(regex);
                            if (!match) {
                                continue;
                            }
                            metadataString = match[0].trim();
                            metadata = metadataString.split('\n').reduce(function (acc, line) {
                                var _a, _b;
                                var _c = line.split(':'), key = _c[0], value = _c[1];
                                if (key.trim() === 'tags') {
                                    return __assign(__assign({}, acc), (_a = {}, _a[key.trim()] = __spreadArrays((acc[key.trim()] || []), [value.trim()]), _a));
                                }
                                return __assign(__assign({}, acc), (_b = {}, _b[key.trim()] = [value.trim()], _b));
                            }, {});
                            content = file.replace(metadataString, '').trim();
                            parsedFiles.push({
                                title: Array.isArray(metadata.title) ? metadata.title[0] : metadata.title,
                                date: Array.isArray(metadata.date) ? metadata.date[0] : metadata.date,
                                content: content,
                                tags: Array.isArray(metadata.tags) ? metadata.tags.flat() : [metadata.tags],
                                category: Array.isArray(metadata.category) ? metadata.category[0] : metadata.category,
                                image: Array.isArray(metadata.image) ? metadata.image[0] : metadata.image,
                                imageAlt: Array.isArray(metadata.imageAlt) ? metadata.imageAlt[0] : metadata.imageAlt
                            });
                        }
                        return [2 /*return*/, parsedFiles];
                    }
                    catch (error) {
                        err = new Error('Cannot read file');
                        throw err;
                    }
                    return [2 /*return*/];
            }
        });
    });
}
