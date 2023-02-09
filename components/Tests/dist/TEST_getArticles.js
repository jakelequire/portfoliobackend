"use strict";
exports.__esModule = true;
var jest_1 = require("jest");
jest_1["default"].mock("fs", function () { return ({
    readdirSync: jest_1["default"].fn(function () { return ["test.md"]; }),
    readFileSync: jest_1["default"].fn(function () { return "title: test\ndate: 2021-01-01\ntags: test\ncategory: test\nimage: test.png\nimageAlt: test\ncontent: test"; })
}); });
