import { Diagnose, Entry, EntryWithoutId } from "../types";
import patients from '../../data/entries';
import { v1 as uuidv1 } from 'uuid';

const parseDiagnosisCodes = (object: unknown): Array<Diagnose['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnose['code']>;
  }

  return object.diagnosisCodes as Array<Diagnose['code']>;
};

const addEntry = (entry: EntryWithoutId, patientID: string): Entry => {

  const entryId: string = uuidv1();
  const newEntry: Entry = {
    id: entryId,
    diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
    ...entry
  };

  patients.find(patient => patient.id == patientID)
  ?.entries.push(newEntry);

  return newEntry;
};

export default {
  addEntry
};