import remark from 'remark';
import html from 'remark-html';
import { readFile } from 'fs/promises';
import { Article } from './TypeDefinition/TypeDefinitions';
import path from 'path';
import matter from 'gray-matter';

const articleDir = path.join(__dirname, '..', '../public/articles');

export default async function processMarkdown(article: string): Promise<Article> {
  const file = await readFile(`${articleDir}/${article}`, 'utf8');
  const { data, content } = matter(file);

  const result = await remark()
    .use(html)
    .process(content);

  return {
    title: data.title,
    date: data.date,
    content: result.toString(),
    tags: data.tags,
    category: data.category,
    image: data.image,
    imageAlt: data.imageAlt,
  };
}
