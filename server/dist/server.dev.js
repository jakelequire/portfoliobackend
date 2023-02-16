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
    var method, query, sort, articles;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            method = req.method, query = req.query;
            sort = query.sort;
            console.log("</articles> sort: " + sort);
            console.log("</articles> method: " + method);
            console.log("</articles> query: " + query);
            _context.prev = 5;
            _context.next = 8;
            return regeneratorRuntime.awrap(getArticles(sort));

          case 8:
            articles = _context.sent;
            res.status(200).json(articles);
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](5);
            res.status(500).json({
              error: _context.t0
            }) && console.log("ERROR !</articles>: error" + _context.t0);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[5, 12]]);
  });
  server.listen(PORT, function (err) {
    if (err) throw err;
    console.log("> Ready on http://localhost:".concat(PORT));
  });
});