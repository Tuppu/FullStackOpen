import express from 'express';
import cors from 'cors';
import apiRouter from './src/routes/api';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.json('{"content": "Pong!"}');
});

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});