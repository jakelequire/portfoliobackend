"use strict";

var express = require('express');

var next = require('next');

var cors = require('cors');

var getArticles = require('./components/dist/getArticles')["default"];

var dev = process.env.NODE_ENV !== 'production';
var app = next({
  dev: dev
});
var handle = app.getRequestHandler();
var PORT = process.env.PORT || 3001;
var corsOptions = {
  origin: ["http://localhost:3000/testdev", "http://localhost:3000", "https://jakelequire.dev",, "https://portfolio-jakelequire.vercel.app", "https://portfolio-git-main-jakelequire.vercel.app"],
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
    var query, articles;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            query = req.query;
            _context.prev = 1;
            _context.next = 4;
            return regeneratorRuntime.awrap(getArticles(query));

          case 4:
            articles = _context.sent;
            res.status(200).json(articles);
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
            res.status(500).json({
              error: _context.t0
            }) && console.log("ERROR !</articles>: error" + _context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 8]]);
  });
  server.listen(PORT, function (err) {
    if (err) throw err;
    console.log("> Ready on http://localhost:".concat(PORT));
  });
});