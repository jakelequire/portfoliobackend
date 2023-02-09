import fs from "fs";
import matter from "gray-matter";
import { Article } from "./TypeDefinition/TypeDefinitions";

const articleDir = "../data/articles";

const articleData: Article[] = [];

async function articleQuery(): Promise<Article[]> {
    const articles = await fs.promises.readdir(articleDir);
    for (const article of articles) {
        const file = await fs.promises.readFile(`${articleDir}/${article}`, "utf8");
        const { data } = matter(file);
        articleData.push({
            title: data.title,
            date: data.date,
            content: data.content,
            tags: data.tags,
            category: data.category,
            image: data.image,
            imageAlt: data.imageAlt
        });
    }
    return articleData;
}

export default async function getArticles(r, s) {
    if (!r.query.sort) {
        s.json(await articleQuery());
        return;
    }
    
    await articleQuery();
    if (r.query.sort === "date") {
        s.json(sortedByDate());
    } else if (r.query.sort === "alphabetically") {
        s.json(sortedAlphabetically());
    } else {
        s.json(articleData);
    }
}

function sortedByDate(): Article[] {
    return articleData.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

function sortedAlphabetically(): Article[] {
    return articleData.sort((a, b) => {
        return a.title.localeCompare(b.title);
    });
}
