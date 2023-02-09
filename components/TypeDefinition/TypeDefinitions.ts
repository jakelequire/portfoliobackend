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
