import processMarkdown from './_processMarkdown';
import { Article, RequestParams } from './TypeDefinition/TypeDefinitions';
/**
 * #### Parses markdown files from a directory and outputs an `array of objects`.
 * Each object represents an article, containing metadata such as the title, date, tags, and image,
 * as well as the content of the article. The articles can be sorted by date, alphabetically, tags, 
 * or category.
 * 
 * @param {RequestParams} req - The request parameters
 * 
 * @return {Promise<Article[]>} Promise that resolves to an array of Article objects.
 * 
 * @throws {Error} If the file cannot be read
 * @throws {Error} If search parameters are incorrect.
 */
export default async function getArticles(req: RequestParams) {
  console.log("<getArticles> Request: " + req.query )
  const date = "date";
  console.log("<getArticles> ArticleParse: " + sortArticles(date).toString())
  const query = req.query;
  const articles = await sortArticles(query);
  return articles;
}
/**
 * #### Sorts the articles by the `query parameter`.
 * 
 * @param {string} sortBy - The query parameter
 * 
 * @return {Promise<Article[]>} Promise that resolves to an array of Article objects.
 * 
 * @throws {Error} If search parameters are incorrect.
 */
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
    const err = new Error('ERROR <sortArticles>: Incorrect search parameters');
    throw err;
  }
}
/**
 * #### Sorts the articles by `date`.
 * 
 * @return {Promise<Article[]>} Promise that resolves to an array of Article objects.
 * 
 * @throws {Error} If the file cannot be read
 */
async function sortByDate() {
  const articles: Article[] = await processMarkdown();
  articles.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
  return articles;
}

/**
 * #### Sorts the articles `alphabetically`.
 * 
 * @return {Promise<Article[]>} Promise that resolves to an array of Article objects.
 * 
 * @throws {Error} If the file cannot be read
 */
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
    const err = new Error('ERROR <sortAlphabetically>: Cannot read file');
    throw err;
  }
}
/**
 * #### Sorts the articles by `tags`.
 * 
 * @return {Promise<Article[]>} Promise that resolves to an array of Article objects.
 * 
 * @throws {Error} If the file cannot be read
 */
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
    const err = new Error('ERROR <sortTags>: Cannot read file');
    throw err;
  }
}
/**
 * #### Sorts the articles by `category`.
 * 
 * @return {Promise<Article[]>} Promise that resolves to an array of Article objects.
 * 
 * @throws {Error} If the file cannot be read
 */
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
    const err = new Error('ERROR <sortCategory>: Cannot read file');
    throw err;
  }
}