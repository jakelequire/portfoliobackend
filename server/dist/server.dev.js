"use strict";

var express = require('express');

var next = require('next');

var cors = require('cors');

var dev = process.env.NODE_ENV !== 'production';
var app = next({
  dev: dev
});
var handle = app.getRequestHandler();
var PORT = 3001;
var corsOptions = {
  origin: 'http://localhost:3000/testdev',
  credentials: true
};
cors(corsOptions);
app.prepare().then(function () {
  var server = express();
  server.get('/', function (req, res) {
    return handle(req, res);
  });
  server.get('/articles', function (req, res) {
    res.send('Hello World!');
  });
  server.listen(PORT, function (err) {
    if (err) throw err;
    console.log("> Ready on http://localhost:".concat(PORT));
  });
});