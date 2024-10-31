import { parseArguments } from './misc';

const calculateBmi = (cmHeight: number, kgMass: number): string => {
  if (cmHeight === 0) throw new Error("Can't divide by 0!");

  const bmi = kgMass / (cmHeight / 100.0) ** 2;

  if (bmi < 16.0) return 'Underweight (Severe thinness)';
  else if (bmi >= 16.0 && bmi < 17.0) return 'Underweight (Moderate thinness)';
  else if (bmi >= 17.0 && bmi < 18.5) return 'Underweight (Mild thinness)';
  else if (bmi >= 18.5 && bmi < 25.0) return 'Normal range';
  else if (bmi >= 25.0 && bmi < 30.0) return 'Overweight (Pre-obese)';
  else if (bmi >= 30.0 && bmi < 35.0) return 'Obese (Class I)';
  else if (bmi >= 35.0 && bmi < 40.0) return 'Obese (Class II)';
  else if (bmi >= 40.0) return 'Obese (Class III)';
  else throw new Error('Unknown error');
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
