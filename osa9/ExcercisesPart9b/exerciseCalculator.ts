interface ExcerciseResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

function switchExceciseResult(rating: number) {
  switch (rating) {
    case 1:
      return 'Yuck';
    case 2:
      return 'not too bad but could be better';
    case 3:
      return 'Excellent!';
    default:
      return 'OK';
  }
}

let originalTarget = 2;

const exceciseCalculator = (values: number[]): ExcerciseResults => {
  const periodLength: number = values.length;
  const trainingDays: number = values.filter((x) => x > 0).length;
  const target: number = originalTarget;

  const trainingHours = values.reduce((a, b) => a + b, 0);
  const average: number = trainingHours / values.length || 0;

  const success: boolean = average > target;

  const rating: number = (success ? 1 : 0) + (average > target / 2 ? 1 : 0) + 1;

  const ratingDescription: string = switchExceciseResult(rating);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  console.log(exceciseCalculator([3, 0, 2, 4.5, 0, 3, 1]));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
