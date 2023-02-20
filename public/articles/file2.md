---
id: "A00002"
title: "Article #2"
date: "05/23/2022"
tags: ["React", "Axios"]
category: "Web Design"
image: "React.jpg"
imageAlt: "React Alt"
---
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
``` js
function example() {
    console.log("example!")
}
```
Some more example content
## Some code example
``` js
export default async function importArticles() {
    const response = await axios.get("http://localhost:3001/articles?query=alphabetically");
    const articles = response.data;

    const articleObject = articles.map((article) => {
        const { id, title, date, tags, category, image, imageAlt, content } = article;
        return new createArticle( id, title, date, tags, category, image, imageAlt, content);
    })
    return articleObject;
}
```
## What is this code doing?
This code is doing a lot of things. First, it is using the axios library to make a `GET` request to the server. The server is running on `port 3001` and the endpoint is `/articles`. The query parameter is set to alphabetically. This will return the articles in alphabetical order. The response is then stored in the variable response. The data from the response is then stored in the variable articles. The articles are then mapped over and a new article object is created for each article. The article object is then stored in the variable articleObject. The articleObject is then returned.