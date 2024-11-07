import express from 'express';
import apiRouter from './src/routes/api';

const app = express();

app.use(express.json());

const PORT = 3001;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.json('{"content": "Pong!"}');
});

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});