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

export type Response = Request & {
    status: (code: number) => Response;
    json: (data: Article[]) => void;
}

export type RequestParams = {
    query?: string
}

export type ResponseParam = {
    statusCode: number;
    setHeader (key: string, value: string): any;
    end (data: string): any;
} 

export type ServerResponse<T> = {
    status: (code: number) => ResponseParam;
    json: (data: T) => void;
    setHeader: (key: string, value: string) => void;
    end: (data: string) => void;
}