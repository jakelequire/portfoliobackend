const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

const corsOptions = {
    origin: 'http://localhost:3001/testdev',
    optionsSuccessStatus: 200,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    allowedHeaders: 'Content-Type, Authorization, Content-Length, X-Requested-With',
};

app.use(cors(corsOptions));
app.get('/', (req, res) => {
    res.send('Hello World!!! From Express!');
    }
);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
}
);