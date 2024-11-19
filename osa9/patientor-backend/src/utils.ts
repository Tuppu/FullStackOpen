import { Discharge, EntryWithoutId, Gender, HealthCheckRating, NewPatient, SickLeave } from "./types";
import { z } from 'zod';

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string()
});

export const toNewPatient = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
      throw new Error('Incorrect date: ' + date);
  }
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error('Incorrect specialist');
  }

  return specialist;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName)) {
    throw new Error('Incorrect employerName');
  }

  return employerName;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error('Incorrect description');
  }

  return description;
};

const isHealthCheckRating = (param: string): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).map(h => h.toString()).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!isString(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
      throw new Error('Incorrect healthCheckRating: ' + healthCheckRating);
  }
  return healthCheckRating;
};

const isDischarge = (param: unknown): boolean => {
  const triedConvert: Discharge | undefined  = param as Discharge;

  return (triedConvert !== undefined);
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!isDischarge(discharge)) {
      throw new Error('Incorrect discharge: ' + discharge);
  }
  return discharge as Discharge;
};

const isSickLeave = (param: unknown): boolean => {
  const triedConvert: SickLeave | undefined  = param as SickLeave;

  return (triedConvert !== undefined);
};

const parseSickleave = (sickLeave: unknown): SickLeave => {
  if (!isSickLeave(sickLeave)) {
      throw new Error('Incorrect sickLeave: ' + sickLeave);
  }
  return sickLeave as SickLeave;
};

export const toNewPatientEntry = (object: unknown): EntryWithoutId => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('date' in object && 'specialist' in object && 'type' in object && 'description' in object && 'healthCheckRating' in object) {
    const newEntry: EntryWithoutId = {
      type: 'HealthCheck',
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      description: parseDescription(object.description),
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
    };
    return newEntry;
  }
  else if ('date' in object && 'specialist' in object && 'type' in object && 'description' in object && 'discharge' in object) {
    const newEntry: EntryWithoutId = {
      type: 'Hospital',
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      description: parseDescription(object.description),
      discharge: parseDischarge(object.discharge)
    };
    return newEntry;
  }
  else if ('date' in object && 'specialist' in object && 'employerName' in object && 'type' in object && 'description' in object && 'sickLeave' in object) {
    const newEntry: EntryWithoutId = {
      type: 'OccupationalHealthcare',
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      employerName: parseEmployerName(object.employerName),
      description: parseDescription(object.description),
      sickLeave: parseSickleave(object.sickLeave)
    };
    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};