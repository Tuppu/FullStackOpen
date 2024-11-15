import { Typography } from '@mui/material';
import { Diagnose, Entry } from '../../types';
import { useEffect, useState } from 'react';
import diagnosesService from "../../services/diagnoses";

interface HeaderProps {
  entries: Entry[] | undefined;
}

const PatientEntriesContent = ({entries}: HeaderProps): JSX.Element => {
  
  const [diagnoses, setDiagnoses] = useState<Diagnose[]>([]);
  
  useEffect(() => {
    const fetchPatientList = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchPatientList();
  }, []);

  if (entries === undefined || entries.length === 0) {
    return <></>;
  }
  
  return (
    <div>
      <Typography variant="h6" style={{ marginTop: "0.5em", marginBottom: "0.5em" }}>
      entries
      </Typography>
      {entries?.map((entry) => (
      <Typography variant="body1" gutterBottom>
      {entry.date} {entry.description}
      <ul>
        {entry.diagnosisCodes?.map((diagnose) => {
          const diagnoseDetails = diagnoses.find((d => d.code == diagnose));
          return (
            <li>{diagnoseDetails?.code} {diagnoseDetails?.name}</li>
          );}
        )}
      </ul>
      </Typography>
      ))}
    </div>
  );
};

export default PatientEntriesContent;
