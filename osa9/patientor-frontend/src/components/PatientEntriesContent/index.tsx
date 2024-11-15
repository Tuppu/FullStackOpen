import { Typography } from '@mui/material';
import { Entry } from '../../types';

interface HeaderProps {
  entries: Entry[] | undefined;
}

const PatientEntriesContent = ({entries}: HeaderProps): JSX.Element => {
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
      {entry.diagnosisCodes?.map((diagnose) => (
          <li>{diagnose}</li>
      ))}
      </ul>
      </Typography>
      ))}
    </div>
  );
};

export default PatientEntriesContent;
