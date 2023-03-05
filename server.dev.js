"use strict";

var express = require('express');

var next = require('next');

var cors = require('cors');

var _require = require('./components/dist/getArticles.js'),
    getArticles = _require.getArticles;

var dev = process.env.NODE_ENV !== 'production';
var app = next({
  dev: dev
});
var handle = app.getRequestHandler();
var PORT = 3001;
var corsOptions = {
  origin: ["http://localhost:3000/testdev", "http://localhost:3000"],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.prepare().then(function () {
  var server = express();
  server.use(cors(corsOptions));
  server.get('/', function (req, res) {
    return handle(req, res);
  });
  server.get('/articles', function (req, res) {
    return getArticles(req, res);
  });
  server.listen(PORT, function (err) {
    if (err) throw err;
    console.log("> Ready on http://localhost:".concat(PORT));
  });
});