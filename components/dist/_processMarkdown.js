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
var fs_1 = require("fs");
var path_1 = require("path");
var articleDir = path_1.join(__dirname, '..', '../public/articles');
var articleParse = [];
/**
 * @summary
 *
 */
function processMarkdown() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
exports["default"] = processMarkdown;
/**
 * @summary
 * - Read the directory
 * - Read the files
 * - Output files to an array of objects to be parsed
 */
function importFiles() {
    return __awaiter(this, void 0, void 0, function () {
        var articleFiles, files, _i, files_1, file, fileData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    articleFiles = [];
                    return [4 /*yield*/, fs_1.promises.readdir(articleDir)];
                case 1:
                    files = _a.sent();
                    _i = 0, files_1 = files;
                    _a.label = 2;
                case 2:
                    if (!(_i < files_1.length)) return [3 /*break*/, 5];
                    file = files_1[_i];
                    return [4 /*yield*/, fs_1.promises.readFile(articleDir + "/" + file, 'utf8')];
                case 3:
                    fileData = _a.sent();
                    articleFiles.push(fileData);
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    ;
                    return [2 /*return*/, articleFiles];
            }
        });
    });
}
/**
 * @summary
 * - Parse the files
 * - Output the files to an array of objects
 * @Return the array of objects
 */
function parseFiles() {
    return __awaiter(this, void 0, void 0, function () {
        var parsedFiles, files, _i, files_2, file, fileData, fileDataObject;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parsedFiles = [];
                    return [4 /*yield*/, importFiles()];
                case 1:
                    files = _a.sent();
                    for (_i = 0, files_2 = files; _i < files_2.length; _i++) {
                        file = files_2[_i];
                        fileData = file.split('---');
                        fileDataObject = {
                            title: fileData[1].split('title: ')[1],
                            date: fileData[1].split('date: ')[1],
                            tags: fileData[1].split('tags: ')[1],
                            category: fileData[1].split('category: ')[1],
                            image: fileData[1].split('image: ')[1],
                            imageAlt: fileData[1].split('imageAlt: ')[1],
                            content: fileData[2]
                        };
                        parsedFiles.push(fileDataObject);
                    }
                    return [2 /*return*/, articleParse];
            }
        });
    });
}
