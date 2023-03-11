import type { RequestParams } from '../../../components/TypeDefinitions';
import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from 'next/server';
import getArticles from "@/components/getArticles";


 
export async function GET(req: NextRequest, res: NextApiResponse) {
  console.warn("<handler GET>")
  console.log("<handler> - Method: ", req.method)
  console.log("<handler> - Headers: ", req.mode)
  console.log("<Continued>")
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





// import cors from 'cors';
//
// const Cors = cors({
//   methods: ['GET', 'HEAD'],
//   origin: '*',
//   optionsSuccessStatus: 200,
//   allowedHeaders: ['Content-Type', 'Authorization'],
// });
// 
// async function corsMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
//   console.log("<CORS> - Middleware Fired -")
//   console.log("<CORS> - Header", req.headers)
//   return new Promise<void>((resolve, reject) => {
//     console.log("<CORS> - New Promise Fired -")
//     if (req.method === 'OPTIONS') {
//       console.log("<CORS> - Options Request -")
//       return resolve();
//     }
//     fn(req, res, (err: any) => {
//     // ^ This Line is the Problem
//       if (err) {
//         console.log("<CORS> Rejected Cors: ", err)
//         return reject(err)
//       }
//       console.log("<CORS> Resolved Cors")
//       return resolve()
//     });
//   });
// }