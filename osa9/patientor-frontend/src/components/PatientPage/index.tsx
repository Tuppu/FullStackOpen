import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from "../../services/patients";
import { Gender, Patient } from '../../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

const PatientPage = () => {

  const [patient, setPatient] = useState<Patient>();
  const id = useParams().id;

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
      </Box>
    </div>
  );
};

export default PatientPage;
