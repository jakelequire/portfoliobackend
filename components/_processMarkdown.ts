import { promises as fs } from 'fs';
import { join } from 'path';
import { Article } from './TypeDefinition/TypeDefinitions';

const articleDir = join(__dirname, '..', '../public/articles');
const articleParse: Article[] = [];

/**
 * @summary
 * 
 */
export default async function processMarkdown() {

}
/**
 * @summary
 * - Read the directory
 * - Read the files
 * - Output files to an array of objects to be parsed
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
 * @Return the array of objects
 */
async function parseFiles() {
  let parsedFiles: Article[] = [];
  const files = await importFiles();
  for (const file of files) {
    const fileData = file.split('---');
    const fileDataObject = {
      title: fileData[1].split('title: ')[1],
      date: fileData[1].split('date: ')[1],
      tags: fileData[1].split('tags: ')[1],
      category: fileData[1].split('category: ')[1],
      image: fileData[1].split('image: ')[1],
      imageAlt: fileData[1].split('imageAlt: ')[1],
      content: fileData[2],
    }
    parsedFiles.push(fileDataObject);
  }
  return articleParse;
}