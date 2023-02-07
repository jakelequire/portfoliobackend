const fs = require('fs').promises;
const express = require('express');
const router = express.Router();
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    allowedHeaders: 'Content-Type, Authorization, Content-Length, X-Requested-With',
};

router.use(cors(corsOptions));

const getMetadataFromArticle = require('../../components/getMetadataFromArticle');
const getContentFromArticle = (article: string) => {
    const content = article.split('---')[2];
    return content;
  };
  
const articlesDir = '../data/articles';

router.get('/articles', async (req: any, res: any) => {
    const files = await fs.readdir(articlesDir);
    const articles = await Promise.all(
      files.map(async (file: string)=> {
        const article = await fs.readFile(`${articlesDir}/${file}`, 'utf-8');
        return {
          ...getMetadataFromArticle(article),
          content: getContentFromArticle(article),
        };
      }),
    );
    res.json(articles);
  });

router.get('/articles/:id', async (req: any, res: any) => {
    const { id } = req.params;
    const article = await fs.readFile(`${articlesDir}/${id}.md`, 'utf-8');
    res.json({
        ...getMetadataFromArticle(article),
        content: getContentFromArticle(article),
    });
});

router.post('/articles', async (req: any, res: any) => {
    const { title, categories, tags, date, author, image } = req.body;
    const content = req.body.content;
    const article = 
    `---
    title: ${title}
    categories: ${JSON.stringify(categories)}
    tags: ${JSON.stringify(tags)}
    date: ${date}
    author: ${author}
    image: ${image}
    ---
    ${content}`;

    await fs.writeFile(`${articlesDir}/${title}.md`, article);
    res.sendStatus(201);
});

router.put('/articles/:id', async (req: any, res: any) => {
    const { id } = req.params;
    const { title, categories, tags, date, author, image } = req.body;
    const content = req.body.content;
    const article =
    `---
    title: ${title}
    categories: ${JSON.stringify(categories)}
    tags: ${JSON.stringify(tags)}
    date: ${date}
    author: ${author}
    image: ${image}
    ---
    ${content}`;

    await fs.writeFile(`${articlesDir}/${id}.md`, article);
    res.sendStatus(200);
});
    
export {}