"use strict";
var express = require('express');
var cors = require('cors');
var app = express();
var port = 3001;
var corsOptions = {
    origin: 'http://localhost:3001/testdev',
    optionsSuccessStatus: 200,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    allowedHeaders: 'Content-Type, Authorization, Content-Length, X-Requested-With',
};
app.use(cors(corsOptions));
app.get('/', function (req, res) {
    res.send('Hello World!!! From Express!');
});
app.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});