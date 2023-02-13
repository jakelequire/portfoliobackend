const unified = async () => await import('unified');
const markdown = async () => await import('remark-parse');
const frontmatter = async () => await import('remark-frontmatter');
import yaml from 'js-yaml';
import { Article } from "./TypeDefinition/TypeDefinitions";
import { readdir } from 'fs/promises';
import fsPromises from "fs/promises"
import * as path from "path";

const processor = unified()
  .use(markdown)
  .use(frontmatter);

const articleData: Article[] = [];
const articleDir = path.join(__dirname, '..', '../public/articles');

/* Testing to see if directory exists for articleDir */
const fs = require('fs');
if (fs.existsSync(articleDir)) {
    console.log('The directory exists.');
} else {
    console.log('The directory does not exist.');
}
/* ------------------------------------------------- */
async function articleQuery(): Promise<Article[]> {
    const articles = await readdir(articleDir);
    const articleData: Article[] = [];
  
    for (const article of articles) {
      console.log('reading file', `${articleDir}/${article}`);
  
      const file = await fsPromises.readFile(`${articleDir}/${article}`, 'utf8');
      const contents = await processor.process(file);
  
      const data: any = contents.data;
      articleData.push({
        title: data.title,
        date: data.date,
        content: contents.toString(),
        tags: data.tags,
        category: data.category,
        image: data.image,
        imageAlt: data.imageAlt,
      });
    }
  
    console.log('articleData', articleData);
    return articleData;
  }
  
  function sortedByDate(): Article[] {
    return articleData.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }
  
  function sortedAlphabetically(): Article[] {
    return articleData.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
  }
  
  export default async function getArticles(r: any, s: any) {
    let articleData = await articleQuery();
  
    if (r.query.sort === "date") {
      s.json(sortedByDate());
    } else if (r.query.sort === "alphabetically") {
      s.json(sortedAlphabetically());
    } else {
      s.json(articleData);
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
                - getArticles.ts
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