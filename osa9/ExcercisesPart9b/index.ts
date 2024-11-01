import { calculateBmi } from './bmiCalculator';
import { calculator, Operation } from './calculator';
import express from 'express';
import { isNotNumber } from './misc';
import { exceciseCalculator } from './exerciseCalculator';

const app = express();
app.use(express.json());

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

app.get('/calculate', (_req, res) => {
  try {
  const value1: number = Number(_req.query.value1);
  const value2: number = Number(_req.query.value2);
  const op:Operation = _req.query.op as Operation;

  if (!value1 || isNotNumber(_req.query.value1) || !value2  ||  isNotNumber(_req.query.value2) || !op ) {
    res.status(400).send({ error: '...'});
  }

  const result = calculator(value1,value2, op);

  res.send({result});
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }

  res.status(400).send(errorMessage);
}

});

app.post('/exercises', (req, res) => {

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target ) {
    res.status(400).send({ error: 'parameters missing' });
  }

  if (!(daily_exercises as Array<number>) || !(Number(target))) {
    res.status(400).send({ error: 'malformatted parameters' });
  }

  const converted = daily_exercises as Array<number>;
  const values: Array<number> = [Number(target)].concat(converted);

  values.forEach((value) => {
    if(isNotNumber(value)) {
      res.status(400).send({ error: 'malformatted parameters' });
    }
  });

  const result = exceciseCalculator(values);

  res.send({
    result
  });

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});