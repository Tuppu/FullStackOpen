import { z } from 'zod';
import { NewEntrySchema } from './utils';

export enum Gender {
    male = "male",
    female = "female",
    other = "other"
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[]
}

export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export type NewPatient = z.infer<typeof NewEntrySchema>; 
export type NonSensitivePatient = Omit<NewPatient, 'ssn' | 'entries'>;