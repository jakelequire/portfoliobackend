import { promises as fs } from 'fs';
import { join } from 'path';
import { Article } from './TypeDefinition/TypeDefinitions';

const articleDir = join(__dirname, '..', '../public/articles');
const articleParse: Article[] = [];

/**
 * @summary
 * - Take the information from parseFile() and output to an array of objects
 * 
 */
export default async function processMarkdown() {
  await parseFiles();
  let articleObject = {
    title: articleParse[0].title,
    date: articleParse[0].date,
    content: articleParse[0].content,
    tags: articleParse[0].tags,
    category: articleParse[0].category,
    image: articleParse[0].image,
    imageAlt: articleParse[0].imageAlt,
  }
  return articleObject;
}
console.log(processMarkdown());
/**
 * @summary
 * - Read the directory
 * - Read the files
 * - Output files to an array of objects to be parsed
 * @returns the array of objects
 */
async function importFiles() {
  let articleFiles: string[] = [];
  const files = await fs.readdir(articleDir);
  for (const file of files) {
    const fileData = await fs.readFile(`${articleDir}/${file}`, 'utf8');
    articleFiles.push(fileData);
  };
  return articleFiles;
}
/**
 * @summary
 * - Parse the files
 * - Output the files to an array of objects
 * @Return a parsed array of objects
 */
async function parseFiles() {
  let parsedFiles: Article[] = [];
  const files = await importFiles();
  for (const file of files) {
    const regex = /---\n(.*\n)*?---\n(.|\n)*/;
    const match = file.match(regex);
    if (!match) {
      continue;
    }
    const metadataString = match[0].trim();
    const metadata = metadataString.split('\n').reduce((acc, line) => {
      const [key, value] = line.split(':');
      return {
        ...acc,
        [key.trim()]: value.trim(),
      };
    }, {});
    const fileDataObject: Article = {
      title: metadata.title,
      date: metadata.date,
      tags: metadata.tags.split(',').map((tag) => tag.trim()),
      category: metadata.category,
      image: metadata.image,
      imageAlt: metadata.imageAlt,
      content: file.substring(match[0].length).trim(),
    };
    parsedFiles.push(fileDataObject);
  }
  return parsedFiles;
}

/*
Last left off:
  - Need to figure out how to make the fileDataObject the correct types for each item
  - Also need to figure out how to return the processMarkdown as an object to be used in the getArticles.ts
*/