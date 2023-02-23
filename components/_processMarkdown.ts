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
export default async function processMarkdown(): Promise<Article[]> {
  const files = await importFiles();

  const parsedFiles = await Promise.all(files.map(async (file) => {
    const regex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
    const match = file.match(regex);

    if (!match) {
      return null;
    }

    const metadataString = match[1].trim();
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

    const content = match[2].trim();

    return {
      id: Array.isArray(metadata.id) ? metadata.id[0] : metadata.id,
      title: Array.isArray(metadata.title) ? metadata.title[0] : metadata.title,
      description: Array.isArray(metadata.description) ? metadata.description[0] : metadata.description,
      date: Array.isArray(metadata.date) ? metadata.date[0] : metadata.date,
      tags: Array.isArray(metadata.tags) ? metadata.tags.flat() : [metadata.tags],
      category: Array.isArray(metadata.category) ? metadata.category[0] : metadata.category,
      image: Array.isArray(metadata.image) ? metadata.image[0] : metadata.image,
      imageAlt: Array.isArray(metadata.imageAlt) ? metadata.imageAlt[0] : metadata.imageAlt,
      content,
    };
  }));

  const validFiles = parsedFiles.filter((file) => file !== null) as Article[];
  articleParse.push(...validFiles);
  return validFiles;
}
/**
 * @summary Import the files from the directory and output to an array of strings
 * 
 * @return an array of strings
 * 
 * @throws {Error} If the file cannot be read
 */
async function importFiles(): Promise<string[]> {
  try {
    const files = await fs.readdir(articleDir);
    const fileData = await Promise.all(files.map(async (file) => {
      return await fs.readFile(`${articleDir}/${file}`, 'utf8');
    }));

    return fileData;
  } catch (error) {
    const err = new Error('ERROR <importFiles>: Cannot read files');
    throw err;
  }
}
