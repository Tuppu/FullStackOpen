import express from 'express';
import patientService from '../services/patientService';
import diagnoseService from '../services/diagnoseService';
import { toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/ping', (_req, res) => {
    console.log('someone pinged here');
    res.json('{"content": "Pong!"}');
  });

  router.get('/patients', (_req, res) => {
    res.json(patientService.getEntriesNonSSN());
  });

  router.post('/patients', (req, res) => {
    console.log('post patients');
    console.log(req.body, 'req.body');
    
    const newPatientEntry = toNewPatientEntry(req.body);
    console.log(newPatientEntry, 'newPatientEntry');

    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);

    //res.json(patientService.getEntriesNonSSN());
  });

  router.get('/diagnoses', (_req, res) => {
    res.json(diagnoseService.getEntries());
  });

export default router;