const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;

const postHandler = require('./components/postHandler');

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    allowedHeaders: 'Content-Type, Authorization, Content-Length, X-Requested-With',
};

app.use(cors());

app.get('/', (req: any, res: any) => {
    res.send('Hello World!');
    
    }
);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }
);
