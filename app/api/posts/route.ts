import type { RequestParams } from '../../../components/TypeDefinitions';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import getArticles from "@/components/getArticles";
import Cors from 'cors';


const cors = Cors ({
  methods: ['POST', 'GET', 'HEAD'],
  origin: '*',
})

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export async function GET( req: NextApiRequest, res: NextApiResponse) {
  /**/console.log("_________________________________________________________")
  /**/console.log(" -------------------  NEW REQUEST   -------------------- ")
  /**/console.log("_________________________________________________________")
  /**/console.log("<handler GET>")
  /**/console.log("<!!", req.method, "!!>")
  res.setHeader('Access-Control-Allow-Origin', '*')
  // await runMiddleware(req, res, getCorsMiddleware)
  
  //console.log("<Continued>")
  try {
    const query = req.query;
    /**/console.log(typeof query, "<- QUERY");
    const articles = await getArticles(query as RequestParams);
    /**/console.log(typeof res, "<- RESPONSE");
    res.json(articles);
  } catch (error) {
    throw new Error(error as string)
  } 
}


export async function OPTIONS( req: NextApiRequest, res: NextApiResponse) {
  /**/console.log("!!<OPTIONS REQUEST>!!")
  await runMiddleware(req, res, cors)
}