"use strict";

var express = require('express');

var next = require('next');

var dev = process.env.NODE_ENV !== 'production';
var app = next({
  dev: dev
});
var handle = app.getRequestHandler();
var PORT = process.env.PORT || 3000;
app.prepare().then(function () {
  var server = express();
  server.get('*', function (req, res) {
    return handle(req, res);
  });
  server.listen(PORT, function (err) {
    if (err) throw err;
    console.log("> Ready on http://localhost:".concat(PORT));
  });
});