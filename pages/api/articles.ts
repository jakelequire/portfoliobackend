import express from 'express';
import cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

const corsOptions = {
    origin: 'http://localhost:3001/testdev',
    optionsSuccessStatus: 200,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    allowedHeaders: 'Content-Type, Authorization, Content-Length, X-Requested-With',
};

const articlesHandler = (req: NextApiRequest, res: NextApiResponse) => {
    const app = express();
    app.use(cors(corsOptions));
    app.get('/', (req, res) => {
        res.send('Hello World!');
        }
    );
    app(req, res);
}

export default articlesHandler;