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

export default async function getArticles(req: RequestParams, res: Response): Promise<void> {

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