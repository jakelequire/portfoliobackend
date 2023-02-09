const express = require('express');
const next = require('next');
const cors = require('cors');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const PORT = 3001;

const corsOptions = {
  origin: 'http://localhost:3000/testdev',
  credentials: true,
};

cors(corsOptions);

app.prepare().then(() => {
  const server = express();

  server.get('/', (req, res) => {
    return handle(req, res);
  });

  server.get('/articles', (req, res) => {
    res.send('Hello World!');
  });

  server.listen(PORT, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
