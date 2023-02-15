"use strict";

var express = require('express');

var next = require('next');

var cors = require('cors');

var getArticles = require('../components/dist/getArticles')["default"];

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
  server.get('/articles', function _callee(req, res) {
    var articles;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            console.log("Getting articles from server");
            _context.next = 4;
            return regeneratorRuntime.awrap(getArticles());

          case 4:
            articles = _context.sent;
            _context.next = 7;
            return regeneratorRuntime.awrap(articles);

          case 7:
            _context.t0 = _context.sent;

            if (!_context.t0) {
              _context.next = 10;
              break;
            }

            console.log("Articles received from server: ", articles.length, " articles");

          case 10:
            console.log("Articles received from server: ", articles.length, " articles");
            req.articles = articles;
            return _context.abrupt("return", handle(req, res));

          case 15:
            _context.prev = 15;
            _context.t1 = _context["catch"](0);
            console.log("ERROR IN SERVER: ", _context.t1);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 15]]);
  });
  server.listen(PORT, function (err) {
    if (err) throw err;
    console.log("> Ready on http://localhost:".concat(PORT));
  });
});