import fs from "fs";
import getArticles from "h:/PortfolioBackend/portfoliobackend/components/dist/getArticles.js";
import { Article } from "h:/PortfolioBackend/portfoliobackend/components/TypeDefinition/TypeDefinitions";

jest.mock("fs", () => ({
  promises: {
    readdir: jest.fn().mockResolvedValue(["file1.md", "file2.md"]),
    readFile: jest
      .fn()
      .mockResolvedValueOnce('---\ntitle: "Test title 1"\ndate: "2022-01-01"\ncontent: "Test content 1"\ntags: ["tag1", "tag2"]\ncategory: "Test category 1"\nimage: "test.jpg"\nimageAlt: "test image alt 1"\n---\nTest body 1')
      .mockResolvedValueOnce('---\ntitle: "Test title 2"\ndate: "2021-01-01"\ncontent: "Test content 2"\ntags: ["tag2", "tag3"]\ncategory: "Test category 2"\nimage: "test2.jpg"\nimageAlt: "test image alt 2"\n---\nTest body 2'),
  },
}));

const mockResponse = {
  json: jest.fn(),
};

const mockRequest = {
  query: {
    sort: "date",
  },
};

describe("getArticles", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it("should return all articles sorted by date if sort parameter is not present", async () => {
      await getArticles({}, mockResponse);
      const expectedArticles: Article[] = [
        {
          title: "Test title 1",
          date: "2022-01-01",
          content: "Test content 1",
          tags: ["tag1", "tag2"],
          category: "Test category 1",
          image: "test.jpg",
          imageAlt: "test image alt 1",
        },
        {
          title: "Test title 2",
          date: "2021-01-01",
          content: "Test content 2",
          tags: ["tag2", "tag3"],
          category: "Test category 2",
          image: "test2.jpg",
          imageAlt: "test image alt 2",
        },
      ];
      const result = await getArticles({}, mockResponse);
      expect(result).toEqual(expectedArticles);
    });

    it("should return all articles sorted by date if sort parameter is date", async () => {
        await getArticles(mockRequest, mockResponse);
        const expectedArticles: Article[] = [
            {
            title: "Test title 1",
            date: "2022-01-01",
            content: "Test content 1",
            tags: ["tag1", "tag2"],
            category: "Test category 1",
            image: "test.jpg",
            imageAlt: "test image alt 1",
            },
            {
            title: "Test title 2",
            date: "2021-01-01",
            content: "Test content 2",
            tags: ["tag2", "tag3"],
            category: "Test category 2",
            image: "test2.jpg",
            imageAlt: "test image alt 2",
            },
        ];
        const result = await getArticles({}, mockResponse);
        expect(result).toEqual(expectedArticles);
        });

    it("should return all articles sorted alphabetically if sort parameter is alphabetically", async () => {
        mockRequest.query.sort = "alphabetically";
        await getArticles(mockRequest, mockResponse);
        const expectedArticles: Article[] = [
            {
            title: "Test title 1",
            date: "2022-01-01",
            content: "Test content 1",
            tags: ["tag1", "tag2"],
            category: "Test category 1",
            image: "test.jpg",
            imageAlt: "test image alt 1",
            },
            {
            title: "Test title 2",
            date: "2021-01-01",
            content: "Test content 2",
            tags: ["tag2", "tag3"],
            category: "Test category 2",
            image: "test2.jpg",
            imageAlt: "test image alt 2",
            },
        ];
        const result = await getArticles({}, mockResponse);
        expect(result).toEqual(expectedArticles);
        });
});