import type { RequestParams } from '../../../components/TypeDefinitions';
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from 'next/server'
import getArticles from "@/components/getArticles";
import Cors from 'cors'

const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  origin: '*',
  allowedHeaders: ['Content-Type', 'application/json'],
})

function middleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  console.log("middleware called with req", req);
  console.log("middleware called with res", res);
  console.log("middleware called with fn", fn);
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  console.log("<handler>")
  console.log("<handler> - Method: ", req.method)
  // await middleware(req, res, cors)
  if (req.method === "GET") {
    try {
      const queryParams = new URLSearchParams(req.url);
      const query = queryParams.values().next().value;
      const articles = await getArticles(query as RequestParams);

      console.log(typeof res, "<- RESPONSE");

      return NextResponse.json(articles);
    } catch (error) {
      throw new Error(error as string)
    }
  }
}
