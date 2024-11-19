import { Alert, Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from "../../services/patients";
import { EntryWithoutId, Gender, Patient } from '../../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import PatientEntriesContent from '../PatientEntriesContent';
import AddNewEntry from './AddNewEntry';
import patientEntryService from '../../services/patientEntry';
import axios from 'axios';

const PatientPage = () => {

  const [patient, setPatient] = useState<Patient>();
  const [error, setError] = useState<string>();
  const id = useParams().id;

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      if (id === undefined) return;

      const patientEntry = await patientEntryService.create(values, id);
      if (patientEntry) {
        patientService.getOneById(id)
        .then((found) => 
          {
            setPatient(found);
            setError('');
        });
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  useEffect(() => {
    if (id) {
      patientService.getOneById(id)
      .then((found) => setPatient(found));
    }
  }, [id]);

  const gender = (genre: Gender | undefined): JSX.Element => {
    switch (genre) {
      case Gender.Male:
        return <MaleIcon />;
      case Gender.Female:
          return <FemaleIcon />;
      case Gender.Other:
          return <TransgenderIcon />;
      default:
        return <></>;
    }
  };

  return (
    <div className="App">
      <Box>
        <Typography variant="h5" style={{ marginTop: "0.5em", marginBottom: "0.5em" }}>
          {patient?.name} {gender(patient?.gender)}
        </Typography>
        <Typography variant="body1" gutterBottom>
          ssh: {patient?.ssn}<br />
          occupation: {patient?.occupation}
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <AddNewEntry onSubmit={submitNewEntry} />
        <PatientEntriesContent entries={patient?.entries} />
      </Box>
    </div>
  );
};

export default PatientPage;
