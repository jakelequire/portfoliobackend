import { Interface } from "readline";
import { Response as ExpressResponse } from 'express';

export type Article = {
    title: string;
    date: string;
    content: string;
    tags: string[];
    category: string;
    image: string;
    imageAlt: string;
}
export type Metadata = {
    title: string | string[],
    date: string | string[],
    content: string | string[],
    tags: string | string[],
    category: string | string[],
    image: string | string[],
    imageAlt: string | string[],
  };

export type GetArticle = (r: RequestParams, s: Response) => void;
export type ArticleQuery = () => Promise<Article[]>;
export type Response = ExpressResponse & {
    status: (code: number) => Response;
    json: (data: Article[]) => void;
  }
export type RequestParams = {
    query: {
        sort: string;
    }
}