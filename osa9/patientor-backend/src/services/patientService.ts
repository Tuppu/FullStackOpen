import patients from '../../data/patients';

import { PatientEntry, NonSensitivePatientEntry } from '../types';

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getEntriesNonSSN = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addPatient = () => {
  return null;
};

export default {
  getEntries,
  getEntriesNonSSN,
  addPatient
};