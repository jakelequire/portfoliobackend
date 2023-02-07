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
exports.__esModule = true;
var fs = require('fs').promises;
var express = require('express');
var router = express.Router();
var getMetadataFromArticle = require('../components/getMetadataFromArticle');
var getContentFromArticle = function (article) {
    var content = article.split('---')[2];
    return content;
};
var articlesDir = '../data/articles';
router.get('/articles', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var files, articles;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fs.readdir(articlesDir)];
            case 1:
                files = _a.sent();
                return [4 /*yield*/, Promise.all(files.map(function (file) { return __awaiter(void 0, void 0, void 0, function () {
                        var article;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, fs.readFile(articlesDir + "/" + file, 'utf-8')];
                                case 1:
                                    article = _a.sent();
                                    return [2 /*return*/, __assign(__assign({}, getMetadataFromArticle(article)), { content: getContentFromArticle(article) })];
                            }
                        });
                    }); }))];
            case 2:
                articles = _a.sent();
                res.json(articles);
                return [2 /*return*/];
        }
    });
}); });
router.get('/articles/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, article;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, fs.readFile(articlesDir + "/" + id + ".md", 'utf-8')];
            case 1:
                article = _a.sent();
                res.json(__assign(__assign({}, getMetadataFromArticle(article)), { content: getContentFromArticle(article) }));
                return [2 /*return*/];
        }
    });
}); });
router.post('/articles', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, categories, tags, date, author, image, content, article;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, title = _a.title, categories = _a.categories, tags = _a.tags, date = _a.date, author = _a.author, image = _a.image;
                content = req.body.content;
                article = "---\n    title: " + title + "\n    categories: " + JSON.stringify(categories) + "\n    tags: " + JSON.stringify(tags) + "\n    date: " + date + "\n    author: " + author + "\n    image: " + image + "\n    ---\n    " + content;
                return [4 /*yield*/, fs.writeFile(articlesDir + "/" + title + ".md", article)];
            case 1:
                _b.sent();
                res.sendStatus(201);
                return [2 /*return*/];
        }
    });
}); });
router.put('/articles/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, title, categories, tags, date, author, image, content, article;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, title = _a.title, categories = _a.categories, tags = _a.tags, date = _a.date, author = _a.author, image = _a.image;
                content = req.body.content;
                article = "---\n    title: " + title + "\n    categories: " + JSON.stringify(categories) + "\n    tags: " + JSON.stringify(tags) + "\n    date: " + date + "\n    author: " + author + "\n    image: " + image + "\n    ---\n    " + content;
                return [4 /*yield*/, fs.writeFile(articlesDir + "/" + id + ".md", article)];
            case 1:
                _b.sent();
                res.sendStatus(200);
                return [2 /*return*/];
        }
    });
}); });
