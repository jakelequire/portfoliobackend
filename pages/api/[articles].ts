const express = require('express');
const cors = require('cors');
const articles = require('../../routes/articles.ts');

const app = express();
const port = 3001;

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    allowedHeaders: 'Content-Type, Authorization, Content-Length, X-Requested-With',
};

app.use(cors());
app.use('/articles', articles);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }
);


export {}