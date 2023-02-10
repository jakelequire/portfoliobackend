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
var gray_matter_1 = require("gray-matter");
var articleDir = "../data/articles";
function articleQuery() {
    return __awaiter(this, void 0, Promise, function () {
        var fileNames, articles;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs_1["default"].promises.readdir(articleDir)];
                case 1:
                    fileNames = _a.sent();
                    return [4 /*yield*/, Promise.all(fileNames.map(function (fileName) { return __awaiter(_this, void 0, void 0, function () {
                            var file, data;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, fs_1["default"].promises.readFile(articleDir + "/" + fileName, "utf8")];
                                    case 1:
                                        file = _a.sent();
                                        data = gray_matter_1["default"](file).data;
                                        return [2 /*return*/, {
                                                title: data.title,
                                                date: data.date,
                                                content: data.content,
                                                tags: data.tags,
                                                category: data.category,
                                                image: data.image,
                                                imageAlt: data.imageAlt
                                            }];
                                }
                            });
                        }); }))];
                case 2:
                    articles = _a.sent();
                    return [2 /*return*/, articles];
            }
        });
    });
}
function getArticles(r, s) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, articles;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!(!r.query || !r.query.sort)) return [3 /*break*/, 2];
                    _b = (_a = s).json;
                    return [4 /*yield*/, articleQuery()];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/];
                case 2: return [4 /*yield*/, articleQuery()];
                case 3:
                    articles = _c.sent();
                    if (r.query.sort === "date") {
                        s.json(sortedByDate(articles));
                    }
                    else if (r.query.sort === "alphabetically") {
                        s.json(sortedAlphabetically(articles));
                    }
                    else {
                        s.json(articles);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports["default"] = getArticles;
function sortedByDate(articles) {
    return articles.sort(function (a, b) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}
function sortedAlphabetically(articles) {
    return articles.sort(function (a, b) {
        return a.title.localeCompare(b.title);
    });
}
