import { calculateBmi } from './bmiCalculator';
import express from 'express';
import { isNotNumber } from './misc';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
  if (isNotNumber(_req.query.height) || isNotNumber(_req.query.weight)) {
    throw new Error('malformatted parameters');
  }

  const height: number = Number(_req.query.height);
  const weight: number = Number(_req.query.weight);
  const bmi = calculateBmi(height, weight);

  res.send({
    weight,
    height,
    bmi,
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
