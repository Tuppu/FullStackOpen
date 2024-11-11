import { z } from 'zod';
import { NewEntrySchema } from './utils';

export enum Gender {
    male = "male",
    female = "female",
    other = "other"
}

export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}

export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?: string;
}

export type NewPatientEntry = z.infer<typeof NewEntrySchema>; 

/*export interface PatientEntry extends NewPatientEntry {
    id: string;
  }
*/

export type NonSensitivePatientEntry = Omit<NewPatientEntry, 'ssn'>;