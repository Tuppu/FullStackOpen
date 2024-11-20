import { EntryWithoutId, Gender, NewPatient, HealthCheckRating } from "./types";
import { z } from 'zod';

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string()
});

export const OccupationalHealthcareSchema = z.object({
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  employerName: z.string(),
  diagnosisCodes: z.string().array(),
  sickLeave: z.object({startDate : z.string().date(), endDate: z.string().date() })
});

export const HospitalSchema = z.object({
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.string().array(),
  discharge: z.object({date : z.string().date(), criteria: z.string().date() }),
});

export const HealthCheckSchema = z.object({
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  healthCheckRating: z.nativeEnum(HealthCheckRating)
});

export const toNewPatient = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseType = (type: unknown): string => {
  if (!isString(type)) {
    throw new Error('Incorrect type');
  }

  return type;
};

export const toNewPatientEntry = (object: unknown): EntryWithoutId => {

  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('type' in object) {
    const type = parseType(object.type);

    switch (type) {
      case 'Hospital':
        return { type: 'Hospital', ...HospitalSchema.parse(object)};
      case 'OccupationalHealthcare':
        return { type: 'OccupationalHealthcare', ...OccupationalHealthcareSchema.parse(object)};
      case 'HealthCheck':
          return { type: 'HealthCheck', ...HealthCheckSchema.parse(object)};
      default:
        throw new Error('Incorrect data: type not found');
    }
  }
  throw new Error('Incorrect data: some fields are missing');
};