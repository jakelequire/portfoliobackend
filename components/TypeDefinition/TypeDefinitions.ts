import { Interface } from "readline";

export type Article = {
    title: string;
    date: string;
    content: string;
    tags: string[];
    category: string;
    image: string;
    imageAlt: string;
}
export type GetArticle = (r: RequestParams, s: Response) => void;
export type ArticleQuery = () => Promise<Article[]>;
export type Response = { json: (data: Article[]) => void;}
export type RequestParams = {
    query: {
        sort: string;
    }
}