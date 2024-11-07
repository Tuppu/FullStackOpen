import express from 'express';
import patientService from '../services/patientService';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/ping', (_req, res) => {
    console.log('someone pinged here');
    res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.json('{"content": "Pong!"}');
  });

  router.get('/patients', (_req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.json(patientService.getEntriesNonSSN());
  });

  router.get('/diagnoses', (_req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.json(diagnoseService.getEntries());
  });

export default router;