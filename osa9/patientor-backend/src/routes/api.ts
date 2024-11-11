import express, { Request, Response, NextFunction } from 'express';
import patientService from '../services/patientService';
import diagnoseService from '../services/diagnoseService';
import { NewEntrySchema } from '../utils';

import { z } from 'zod';
import { PatientEntry, NewPatientEntry} from '../types';

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => { 
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.get('/ping', (_req, res) => {
    console.log('someone pinged here');
    res.json('{"content": "Pong!"}');
  });

  router.get('/patients', (_req, res) => {
    res.json(patientService.getEntriesNonSSN());
  });

  router.post('/patients', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<PatientEntry>) => {
    const addedEntry = patientService.addPatient(req.body);
    res.json(addedEntry);
  });

  router.get('/diagnoses', (_req, res) => {
    res.json(diagnoseService.getEntries());
  });

  router.use(errorMiddleware);

export default router;