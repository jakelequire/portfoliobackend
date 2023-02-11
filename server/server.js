const express = require('express');
const next = require('next');
const cors = require('cors');

const getArticles = require('../components/dist/getArticles').default;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const PORT = 3001;

const corsOptions = {
  origin: ["http://localhost:3000/testdev", "http://localhost:3000"],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.prepare().then(() => {
  const server = express();
  server.use(cors(corsOptions));
  server.get('/', (req, res) => {
    return handle(req, res);
  });

  server.get('/articles', (req, res) => {
    console.log("Hello! This is a test :)")
    return getArticles(req, res);
  });

  server.listen(PORT, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});

