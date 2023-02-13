import { Article } from "./TypeDefinition/TypeDefinitions";
import { readdir } from 'fs/promises';
import { remark } from 'remark';
import fsPromises from "fs/promises"
import * as path from "path";
import frontmatter from 'remark-frontmatter';
import yaml from 'js-yaml';

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
    try {
        console.log('reading directory', articleDir);
        const articles = await readdir(articleDir);
        console.log('articles', articles);
        for (const article of articles) {
            console.log('reading file', `${articleDir}/${article}`);
          
            const file = await fsPromises.readFile(`${articleDir}/${article}`, "utf8");
            console.log('file contents:', file);
            let data: any;
            const contents = await remark()
              .use(frontmatter)
              .use(() => (tree: any) => {
                // Custom transformer to parse YAML frontmatter
                if (tree.children.length > 0 && tree.children[0].type === 'yaml') {
                  data = yaml.load(tree.children[0].value);
                  tree.children.shift();
                }
              })
              .process(file);
          
            articleData.push({
              title: data.title,
              date: data.date,
              content: contents.toString(),
              tags: data.tags,
              category: data.category,
              image: data.image,
              imageAlt: data.imageAlt
            });
          }
        console.log('articleData', articleData);
        return articleData;
    } catch (error) {
        console.error('Error in articleQuery', error);
        throw error;
    }
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
    if (!r.query.sort) {
        s.json(await articleQuery());
        return;
    }
    await articleQuery();
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