import fs from "fs";
import jest from "jest";
import { getArticles } from "../getArticles";

jest.mock("fs", () => ({
    readdirSync: jest.fn(() => ["test.md"]),
    readFileSync: jest.fn(() => "title: test\ndate: 2021-01-01\ntags: test\ncategory: test\nimage: test.png\nimageAlt: test\ncontent: test"),
}));
