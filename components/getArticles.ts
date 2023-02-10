import fs from "fs";
import { Request, Response } from "express";
import matter from "gray-matter";
import { Article } from "./TypeDefinition/TypeDefinitions";

const articleDir = "../data/articles";

async function articleQuery(): Promise<Article[]> {
    const fileNames = await fs.promises.readdir(articleDir);
    let articles = await Promise.all(
        fileNames.map(async (fileName) => {
            const file = await fs.promises.readFile(`${articleDir}/${fileName}`, "utf8");
            const { data } = matter(file);
            return<Article>{
                title: data.title,
                date: data.date,
                content: data.content,
                tags: data.tags,
                category: data.category,
                image: data.image,
                imageAlt: data.imageAlt
            };
        })
    );

    return articles;
}

export default async function getArticles(r: Request, s: Response) {
    if (!r.query || !r.query.sort) {
        s.json(await articleQuery());
        return;
    }

    const articles = await articleQuery();

    if (r.query.sort === "date") {
        s.json(sortedByDate(articles));
    } else if (r.query.sort === "alphabetically") {
        s.json(sortedAlphabetically(articles));
    } else {
        s.json(articles);
    }
}

function sortedByDate(articles: Article[]): Article[] {
    return articles.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

function sortedAlphabetically(articles: Article[]): Article[] {
    return articles.sort((a, b) => {
        return a.title.localeCompare(b.title);
    });
}
