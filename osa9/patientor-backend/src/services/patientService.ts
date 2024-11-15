import patients from '../../data/entries';
import { v1 as uuidv1 } from 'uuid';

import { Patient, NonSensitivePatient, NewPatient, Entry } from '../types';

const getEntries = (): Patient[] => {
  return patients;
};

const getEntriesNonSSN = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

const addPatient = ( entry: NewPatient ): Patient => {
  const id: string = uuidv1();
  const entries: Array<Entry> = [];
  const newPatientEntry = {
    id: id,
    entries: entries,
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getEntriesNonSSN,
  findById,
  addPatient
};