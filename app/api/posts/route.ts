import type { RequestParams } from '../../../components/TypeDefinitions';
import { NextRequest, NextResponse } from 'next/server';
import getArticles from "@/components/getArticles";
import { NextURL } from 'next/dist/server/web/next-url';
import cors from 'cors';

const corsConfig = cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
});


async function corsMiddleware(req: NextRequest, res: NextResponse, fn: Function) {
  return new Promise<void>((resolve, reject) => {
    if (req.method === 'OPTIONS') {
      console.log("<CORS> - Options Request -")
      return resolve();
    }
    fn(req, res, (err: any) => {
      // ^ This Line is the Problem
        if (err) {
          console.log("<CORS> Rejected Cors: ", err)
          return reject(err)
        }
        console.log("<CORS> Resolved Cors")
        return resolve()
      });
    });
}

 
export async function GET(req: NextRequest, res: NextResponse) {
  console.log("_________________________________________________________")
  console.log(" -------------------  NEW REQUEST   -------------------- ")
  console.log("_________________________________________________________")
  console.log("<handler GET>")
  if (res.headers) {
    await corsMiddleware(req, res, corsConfig);
    console.log("Middleware Fired")
  }
  console.log("<Continued>")
  if (req.method === "GET") {
    try {
      const queryParams = new NextURL(req.url);
      // const query = queryParams.values().next().value;
      const query = queryParams.searchParams.get('query');
      const articles = await getArticles(query as RequestParams);

      console.log(typeof res, "<- RESPONSE");
      return NextResponse.json(articles);
    } catch (error) {
      throw new Error(error as string)
    } 
  }
}
