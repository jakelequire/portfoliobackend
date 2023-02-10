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
var getArticles_js_1 = require("h:/PortfolioBackend/portfoliobackend/components/dist/getArticles.js");
jest.mock("fs", function () { return ({
    promises: {
        readdir: jest.fn().mockResolvedValue(["file1.md", "file2.md"]),
        readFile: jest
            .fn()
            .mockResolvedValueOnce('---\ntitle: "Test title 1"\ndate: "2022-01-01"\ncontent: "Test content 1"\ntags: ["tag1", "tag2"]\ncategory: "Test category 1"\nimage: "test.jpg"\nimageAlt: "test image alt 1"\n---\nTest body 1')
            .mockResolvedValueOnce('---\ntitle: "Test title 2"\ndate: "2021-01-01"\ncontent: "Test content 2"\ntags: ["tag2", "tag3"]\ncategory: "Test category 2"\nimage: "test2.jpg"\nimageAlt: "test image alt 2"\n---\nTest body 2')
    }
}); });
var mockResponse = {
    json: jest.fn()
};
var mockRequest = {
    query: {
        sort: "date"
    }
};
describe("getArticles", function () {
    beforeEach(function () {
        jest.clearAllMocks();
    });
    it("should return all articles sorted by date if sort parameter is not present", function () { return __awaiter(void 0, void 0, void 0, function () {
        var expectedArticles, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getArticles_js_1["default"]({}, mockResponse)];
                case 1:
                    _a.sent();
                    expectedArticles = [
                        {
                            title: "Test title 1",
                            date: "2022-01-01",
                            content: "Test content 1",
                            tags: ["tag1", "tag2"],
                            category: "Test category 1",
                            image: "test.jpg",
                            imageAlt: "test image alt 1"
                        },
                        {
                            title: "Test title 2",
                            date: "2021-01-01",
                            content: "Test content 2",
                            tags: ["tag2", "tag3"],
                            category: "Test category 2",
                            image: "test2.jpg",
                            imageAlt: "test image alt 2"
                        },
                    ];
                    return [4 /*yield*/, getArticles_js_1["default"]({}, mockResponse)];
                case 2:
                    result = _a.sent();
                    expect(result).toEqual(expectedArticles);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return all articles sorted by date if sort parameter is date", function () { return __awaiter(void 0, void 0, void 0, function () {
        var expectedArticles, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getArticles_js_1["default"](mockRequest, mockResponse)];
                case 1:
                    _a.sent();
                    expectedArticles = [
                        {
                            title: "Test title 1",
                            date: "2022-01-01",
                            content: "Test content 1",
                            tags: ["tag1", "tag2"],
                            category: "Test category 1",
                            image: "test.jpg",
                            imageAlt: "test image alt 1"
                        },
                        {
                            title: "Test title 2",
                            date: "2021-01-01",
                            content: "Test content 2",
                            tags: ["tag2", "tag3"],
                            category: "Test category 2",
                            image: "test2.jpg",
                            imageAlt: "test image alt 2"
                        },
                    ];
                    return [4 /*yield*/, getArticles_js_1["default"]({}, mockResponse)];
                case 2:
                    result = _a.sent();
                    expect(result).toEqual(expectedArticles);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return all articles sorted alphabetically if sort parameter is alphabetically", function () { return __awaiter(void 0, void 0, void 0, function () {
        var expectedArticles, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockRequest.query.sort = "alphabetically";
                    return [4 /*yield*/, getArticles_js_1["default"](mockRequest, mockResponse)];
                case 1:
                    _a.sent();
                    expectedArticles = [
                        {
                            title: "Test title 1",
                            date: "2022-01-01",
                            content: "Test content 1",
                            tags: ["tag1", "tag2"],
                            category: "Test category 1",
                            image: "test.jpg",
                            imageAlt: "test image alt 1"
                        },
                        {
                            title: "Test title 2",
                            date: "2021-01-01",
                            content: "Test content 2",
                            tags: ["tag2", "tag3"],
                            category: "Test category 2",
                            image: "test2.jpg",
                            imageAlt: "test image alt 2"
                        },
                    ];
                    return [4 /*yield*/, getArticles_js_1["default"]({}, mockResponse)];
                case 2:
                    result = _a.sent();
                    expect(result).toEqual(expectedArticles);
                    return [2 /*return*/];
            }
        });
    }); });
});
