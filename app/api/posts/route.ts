import type { RequestParams } from './../../../components/TypeDefinitions';
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from 'next/server'
import getArticles from "@/components/getArticles";
import Cors from 'cors'

const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
})

function middleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<unknown>) {
  console.log("<handler>")
  await middleware(req, res, cors)
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




// export async function GET(
//   Request: NextApiRequest,
//   Response: NextApiResponse<unknown>
// ) {
//   console.log("<handler>")
//   if (Request.method === "GET") {
//     try {
//       const queryParams = new URLSearchParams(Request.url);
//       const query = queryParams.values().next().value;
//       const articles = await getArticles(query);
//       console.log(typeof Response, "<- RESPONSE");
//       return NextResponse.json(articles);
//     } catch (error) {
//       throw new Error(error as string)
//     }
//   }
// }
