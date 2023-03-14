import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  await NextCors(req, res, {
    methods: ["GET", "HEAD", "POST", "OPTIONS"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  const foo = {
    bar: "baz"
  }

  if(req.method === "GET") {
    try {
      res.json(foo)
    } catch (error: unknown | any) {
      console.error("GET Error:", error);
      res.status(500).send({ error: error.message });
    }
  }
}