import patients from '../../data/patients';

import { PatientEntry } from '../types';

const getEntries = (): PatientEntry[] => {
  return patients;
};

const addPatient = () => {
  return null;
};

export default {
  getEntries,
  addPatient
};