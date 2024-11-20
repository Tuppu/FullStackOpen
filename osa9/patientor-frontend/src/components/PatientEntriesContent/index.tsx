import { Typography } from '@mui/material';
import { Diagnose, Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry} from '../../types';
import { useEffect, useState } from 'react';
import diagnosesService from "../../services/diagnoses";
import MasksIcon from '@mui/icons-material/Masks';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import ChecklistIcon from '@mui/icons-material/Checklist';
import Favorite from '@mui/icons-material/Favorite';
import HeartBroken from '@mui/icons-material/HeartBrokenTwoTone';

interface HeaderProps {
  entries: Entry[] | undefined;
}

const assertNever = (value: Entry): never => {
  throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const hospital = (entry: HospitalEntry, diagnoses: Diagnose[]): JSX.Element => { 

  return (
    <div className="entryCorners hospital">
      <div>{entry.date} <MasksIcon /></div>
      <div><i>{entry.description}</i></div>
      <ul>
        {entry.diagnosisCodes?.map((diagnose) => {
          const diagnoseDetails = diagnoses.find((d => d.code == diagnose));
          return (
            <li>{diagnoseDetails?.code} {diagnoseDetails?.name}</li>
          );}
        )}
      </ul>
      <div>{entry.discharge.date} discharge criteria: '{entry.discharge.criteria}'</div>
      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};

const healthCheck = (entry: HealthCheckEntry , diagnoses: Diagnose[]): JSX.Element => {

  const healthCheckRatingValue: string = 'healthRating' + (entry as HealthCheckEntry)?.healthCheckRating.toString();

  return (
    <div className="entryCorners healthCheck">
      <div>{entry.date} <ChecklistIcon /></div>
      <div><i>{entry.description}</i></div>
      <ul>
        {entry.diagnosisCodes?.map((diagnose) => {
          const diagnoseDetails = diagnoses.find((d => d.code == diagnose));
          return (
            <li>{diagnoseDetails?.code} {diagnoseDetails?.name}</li>
          );}
        )}
      </ul>
      <div className={healthCheckRatingValue} > { ((entry as HealthCheckEntry)?.healthCheckRating) as unknown as number > 0 ? <HeartBroken /> : <Favorite /> }</div>
      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};

const occupationalHealthcare = (entry: OccupationalHealthcareEntry, diagnoses: Diagnose[]): JSX.Element => { 

  return (
    <div className="entryCorners occupationalHealthcare">
      <div>{entry.date} <MonitorHeartIcon /> <i>{entry.employerName}</i></div>
      <div><i>{entry.description}</i></div>
      <ul>
        {entry.diagnosisCodes?.map((diagnose) => {
          const diagnoseDetails = diagnoses.find((d => d.code == diagnose));
          return (
            <li>{diagnoseDetails?.code} {diagnoseDetails?.name}</li>
          );}
        )}
      </ul>
      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};

const PatientEntriesContent = ({entries}: HeaderProps): JSX.Element => {
  
  const [diagnoses, setDiagnoses] = useState<Diagnose[]>([]);
  
  useEffect(() => {
    const fetchDiagnosesList = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnosesList();
  }, []);

  if (entries === undefined || entries.length === 0) {
    return <></>;
  }

  return (
    <div>
      <Typography variant="h6" style={{ marginTop: "0.5em", marginBottom: "0.5em" }}>
      entries
      </Typography>
      {entries?.map((entry) => { 
        switch (entry.type) {
          case "Hospital":
            return hospital(entry, diagnoses);
          case "OccupationalHealthcare":
            return occupationalHealthcare(entry, diagnoses);
          case "HealthCheck":
            return healthCheck(entry, diagnoses);
          default:
            return assertNever(entry);
        }
      })}
    </div>
  );
};

export default PatientEntriesContent;
