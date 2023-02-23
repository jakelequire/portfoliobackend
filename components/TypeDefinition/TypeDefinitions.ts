import { Interface } from "readline";
import { Response as ExpressResponse } from 'express';

export type Article = {
    id: string;
    title: string;
    description: string;
    date: string;
    tags: string[];
    category: string;
    image: string;
    imageAlt: string;
    content: string;
}
export type GetArticle = (r: RequestParams, s: Response) => void;
export type ArticleQuery = () => Promise<Article[]>;
export type Response = ExpressResponse & {
    status: (code: number) => Response;
    json: (data: Article[]) => void;
  }
export type RequestParams = {
    query: string
}