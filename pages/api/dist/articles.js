"use strict";
exports.__esModule = true;
var express_1 = require("express");
var cors_1 = require("cors");
var corsOptions = {
    origin: 'http://localhost:3001/testdev',
    optionsSuccessStatus: 200,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    allowedHeaders: 'Content-Type, Authorization, Content-Length, X-Requested-With'
};
var articlesHandler = function (req, res) {
    var app = express_1["default"]();
    app.use(cors_1["default"](corsOptions));
    app.get('/', function (req, res) {
        res.send('Hello World!');
    });
    app(req, res);
};
exports["default"] = articlesHandler;
