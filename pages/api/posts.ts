import type { RequestParams } from "../../components/TypeDefinitions";
import { NextApiRequest, NextApiResponse } from "next";
import getArticles from "@/components/getArticles";
import NextCors from "nextjs-cors";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("-------------------  NEW REQUEST   --------------------");
  console.log("<handler GET>");
  console.log("<!!", req.method, "!!>");

  await NextCors(req, res, {
    methods: ["GET", "HEAD", "POST", "OPTIONS"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  if (req.method === "GET") {
    try {
      const query = req.query;
      const articles = await getArticles(query as RequestParams);
      res.json(articles);
    } catch (error: unknown | any) {
      console.error("GET Error:", error);
      res.status(500).send({ error: error.message });
    }
  }
}
