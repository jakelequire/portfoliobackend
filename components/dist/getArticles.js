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
var unified = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('unified'); })];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); };
var markdown = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('remark-parse'); })];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); };
var frontmatter = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('remark-frontmatter'); })];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); };
var promises_1 = require("fs/promises");
var promises_2 = require("fs/promises");
var path = require("path");
var processor = unified()
    .use(markdown)
    .use(frontmatter);
var articleData = [];
var articleDir = path.join(__dirname, '..', '../public/articles');
/* Testing to see if directory exists for articleDir */
var fs = require('fs');
if (fs.existsSync(articleDir)) {
    console.log('The directory exists.');
}
else {
    console.log('The directory does not exist.');
}
/* ------------------------------------------------- */
function articleQuery() {
    return __awaiter(this, void 0, Promise, function () {
        var articles, articleData, _i, articles_1, article, file, contents, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, promises_1.readdir(articleDir)];
                case 1:
                    articles = _a.sent();
                    articleData = [];
                    _i = 0, articles_1 = articles;
                    _a.label = 2;
                case 2:
                    if (!(_i < articles_1.length)) return [3 /*break*/, 6];
                    article = articles_1[_i];
                    console.log('reading file', articleDir + "/" + article);
                    return [4 /*yield*/, promises_2["default"].readFile(articleDir + "/" + article, 'utf8')];
                case 3:
                    file = _a.sent();
                    return [4 /*yield*/, processor.process(file)];
                case 4:
                    contents = _a.sent();
                    data = contents.data;
                    articleData.push({
                        title: data.title,
                        date: data.date,
                        content: contents.toString(),
                        tags: data.tags,
                        category: data.category,
                        image: data.image,
                        imageAlt: data.imageAlt
                    });
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 2];
                case 6:
                    console.log('articleData', articleData);
                    return [2 /*return*/, articleData];
            }
        });
    });
}
function sortedByDate() {
    return articleData.sort(function (a, b) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}
function sortedAlphabetically() {
    return articleData.sort(function (a, b) {
        return a.title.localeCompare(b.title);
    });
}
function getArticles(r, s) {
    return __awaiter(this, void 0, void 0, function () {
        var articleData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, articleQuery()];
                case 1:
                    articleData = _a.sent();
                    if (r.query.sort === "date") {
                        s.json(sortedByDate());
                    }
                    else if (r.query.sort === "alphabetically") {
                        s.json(sortedAlphabetically());
                    }
                    else {
                        s.json(articleData);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports["default"] = getArticles;
/*
- H:
    - /portfoliobackend
        - /portfoliobackend
            - /Components
                - /TypeDefinition
                    - TypeDefinitions.ts
                - /dist
                    - getArticles.js
                    - _processMarkdown.js
                - getArticles.ts
                - _processMarkdown.ts
            - /public
                - /articles
                    - article1.md
                    - article2.md
                    - article3.md
            - /pages
                - /api
            - /server
                - /dist
                    - server.js
                - server.js
                - server.dev.js
*/ 
