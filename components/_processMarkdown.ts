import { promises as fs } from 'fs';
import { join } from 'path';
import { Article } from './TypeDefinition/TypeDefinitions';

const articleDir = join(__dirname, '..', '../public/articles');
const articleParse: Article[] = [];
/**
 * #### Parses markdown files from a directory and outputs an `array of objects`.
 * Each object represents an article, containing metadata such as the title, date, tags, and image,
 * as well as the content of the article.
 * 
 * @return {Promise<Article[]>} Promise that resolves to an array of Article objects.
 * 
 * @throws {Error} If the file cannot be read
 */
export default async function processMarkdown() {
  console.log("Article Directory: " + articleDir)
  await parseFiles();
  try {
    if (articleParse.length === 0) {
      return ["Not Found"];
    }
    return articleParse.map(article => ({
      title: article.title,
      date: article.date,
      content: article.content,
      tags: article.tags,
      category: article.category,
      image: article.image,
      imageAlt: article.imageAlt,
    }));
  } catch (error) {
    const err = new Error('ERROR <processMarkdown>: Cannot read files');
    throw err;
  }
}

/**
 * @summary Import the files from the directory and output to an array of objects
 * 
 * @return an array of objects
 * 
 * @throws {Error} If the file cannot be read
 */
async function importFiles() {
  let articleFiles: string[] = [];
  const files = await fs.readdir(articleDir);
  try {
    for (const file of files) {
      const fileData = await fs.readFile(`${articleDir}/${file}`, 'utf8');
      articleFiles.push(fileData);
    };
    return articleFiles;
  } catch (error) {
    const err = new Error('ERROR <importFiles>: Cannot find files');
    throw err;
  }
}
/**
 * @summary Parse the files from the directory and output to an array of objects
 * using Regular Expressions to parse the metadata and content of the article.
 *  
 * @return a parsed array of objects
 * 
 * @throws {Error} If the file cannot be read
 */
async function parseFiles() {
  let parsedFiles: Article[] = [];
  const files = await importFiles();
  try {
    for (const file of files) {
      const regex = /---\n(.*\n)*?---\n(.|\n)*/;
      const match = file.match(regex);
      if (!match) {
        continue;
      }
      const metadataString = match[0].trim();
      const metadata = metadataString.split('\n').reduce<{ [key: string]: string[] }>((acc, line) => {
        const [key, value] = line.split(':');
        if (key.trim() === 'tags') {
          return {
            ...acc,
            [key.trim()]: [...(acc[key.trim()] || []), value.trim()],
          };
        }
        return {
          ...acc,
          [key.trim()]: [value.trim()],
        };
      }, {}); 
      const content = file.replace(metadataString, '').trim();  
      parsedFiles.push({
        title: Array.isArray(metadata.title) ? metadata.title[0] : metadata.title,
        date: Array.isArray(metadata.date) ? metadata.date[0] : metadata.date,
        content: content,
        tags: Array.isArray(metadata.tags) ? metadata.tags.flat() : [metadata.tags],
        category: Array.isArray(metadata.category) ? metadata.category[0] : metadata.category,
        image: Array.isArray(metadata.image) ? metadata.image[0] : metadata.image,
        imageAlt: Array.isArray(metadata.imageAlt) ? metadata.imageAlt[0] : metadata.imageAlt,
      });
    }
    return parsedFiles;
  } catch (error) {
    const err = new Error('ERROR <parseFiles>: Cannot read file');
    throw err;
  }
}
