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
 
  server.get('/articles', async (req, res) => {
    const { method, query } = req;
    const { sort } = query;
    console.log("</articles> sort: " + sort)
    console.log("</articles> method: " + method)
    console.log("</articles> query: " + query)
    try {
      const articles = await getArticles(sort);
      res.status(200).json(articles);
    } catch (error) {
      res.status(500).json({ error }) && console.log("ERROR !</articles>: error" + error);
    }
  });

  server.listen(PORT, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});