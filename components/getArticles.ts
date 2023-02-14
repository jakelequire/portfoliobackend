import { join } from 'path';
import { promises as fs } from 'fs';
import processMarkdown from './_processMarkdown';
import { 
  Article, 
  RequestParams, 
  Response } 
from './TypeDefinition/TypeDefinitions';
const articleDir = join(__dirname, '..', '../public/articles');
const articleParse: Article[] = [];

export default async function getArticles(req: RequestParams, res: Response) {


}

async function sortByDate() {
  const articles = await processMarkdown();
  try {
    const sortedArticles = articles.sort((a: any, b: any) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
    return sortedArticles;
  } catch (error) {
    const err = new Error('Cannot read file');
    throw err;
  }
}

async function sortAlphabetically() {
  const articles = await processMarkdown();
  try {
    const sortedArticles = articles.sort((a: any, b: any) => {
      const titleA = a.title.toUpperCase();
      const titleB = b.title.toUpperCase();
      return (titleA < titleB) ? -1 : (titleA > titleB) ? 1 : 0;
    });
    return sortedArticles;
  } catch (error) {
    const err = new Error('Cannot read file');
    throw err;
  }
}

async function sortTags() {
  const articles = await processMarkdown();
  try {
    const sortedArticles = articles.sort((a: any, b: any) => {
      const tagA = a.tags.toUpperCase();
      const tagB = b.tags.toUpperCase();
      return (tagA < tagB) ? -1 : (tagA > tagB) ? 1 : 0;
    });
    return sortedArticles;
  } catch (error) {
    const err = new Error('Cannot read file');
    throw err;
  }
}

async function sortCategory() {
  const articles = await processMarkdown();
  try {
    const sortedArticles = articles.sort((a: any, b: any) => {
      const categoryA = a.category.toUpperCase();
      const categoryB = b.category.toUpperCase();
      return (categoryA < categoryB) ? -1 : (categoryA > categoryB) ? 1 : 0;
    });
    return sortedArticles;
  } catch (error) {
    const err = new Error('Cannot read file');
    throw err;
  }
}

async function sortArticles(sortBy: string) { 
  try {
    switch (sortBy) {
      case 'date':
        return await sortByDate();
      case 'alphabetically':
        return await sortAlphabetically();
      case 'tags':
        return await sortTags();
      case 'category':
        return await sortCategory();
      default:
        return await sortByDate();
    }
  } catch (error) {
    const err = new Error('Cannot read file');
    throw err;
  }
}


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