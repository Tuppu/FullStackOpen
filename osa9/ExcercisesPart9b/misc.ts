interface MultiplyValues {
  value1: number;
  value2: number;
}

export const isNotNumber = (argument: unknown): boolean => isNaN(Number(argument));

export const parseArguments = (args: string[]): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const parseArgumentsNumberArray = (args: string[]): number[] => {
  if (args.length < 3) throw new Error('Not enough arguments');

  const parsedNumbers: Array<number> = [];

  for (let i = 2; i < args.length; i++) {
    if (isNotNumber(args[i])) {
      throw new Error(`Provided value '${args[i]}' @ #${[i]} were not number!`);
    }
    const tempNumber: number = +args[i];
    parsedNumbers.push(tempNumber);
  }

  return parsedNumbers;
};
