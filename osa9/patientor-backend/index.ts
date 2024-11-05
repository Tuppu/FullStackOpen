import express from 'express';

const app = express();

app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.json('{"content": "Pong!"}');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});