import { Gender, NewPatient } from "./types";
import { z } from 'zod';

export const NewEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.string().array()
});

export const toNewPatientEntry = (object: unknown): NewPatient => {
  return NewEntrySchema.parse(object);
};