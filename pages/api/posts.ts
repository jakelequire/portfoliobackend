import { NextApiRequest, NextApiResponse } from "next";
import getArticles from "@/components/getArticles";
import NextCors from "nextjs-cors";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("-------------------  NEW REQUEST   --------------------");
  console.log("</posts Handler>");
  console.log("<!!--", req.method, "--!!>");
  
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "POST", "OPTIONS"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  if (req.method === "GET") {
    try {
      const { sortby } = req.query;
      console.log("<GET> sortby: ", sortby);
      const articles = await getArticles({ sortby });
      console.log("<GET> articles: ", typeof articles);
      res.json(articles);
    } catch (error: unknown | any) {
      console.error("GET Error:", error);
      res.status(500).send({ error: error.message });
    }
  }
  console.log("_______________________________________________________");
}
