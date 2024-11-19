import { Button, Grid, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { EntryWithoutId, HealthCheckRating } from "../../types";

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
}

const AddNewEntry = ({ onSubmit }: Props): JSX.Element => {

    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState('');
    const [dischargeDate, setDischargeDate] = useState('');
    const [dischargeCriteria, setDischargeCriteria] = useState('');
    const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
    const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');
    const [employerName, setEmployerName] = useState('');

   const [visible, setVisibility] = useState(false);

    const addNewEntry = (event: SyntheticEvent) => {
        event.preventDefault();

        const enumHealthCheckRating = healthCheckRating as unknown as HealthCheckRating;
        const arrayDiagnosisCodes:string[] = diagnosisCodes.split(',');

        switch(type) { 
          case 'OccupationalHealthcare':
            onSubmit({
              description: description,
              date: date,
              specialist: specialist,
              employerName: employerName,
              diagnosisCodes: arrayDiagnosisCodes,
              type: 'OccupationalHealthcareEntry',
              sickLeave: {startDate: sickLeaveStartDate, endDate: sickLeaveEndDate}
            });
            break;
          case 'Hospital': 
            onSubmit({
              description: description,
              date: date,
              specialist: specialist,
              diagnosisCodes: arrayDiagnosisCodes,
              discharge: {date: dischargeDate, criteria: dischargeCriteria},
              type: 'Hospital'
            });
            break;
          case 'HealthCheck': 
          default:
            onSubmit({
              description: description,
              date: date,
              specialist: specialist,
              healthCheckRating: enumHealthCheckRating,
              diagnosisCodes: arrayDiagnosisCodes,
              type: 'HealthCheck'
            });
      }
    };

    if (!visible) { 
      return (
        <Button
        color="secondary"
        variant="contained"
        type="button"
        onClick={() => setVisibility(true)}
      >
        Add new entry
      </Button>
    );}
    
    return (
      <div className='newHealthCheckEntry'>
        <Typography variant="h6" component="h6">
          New entry
        </Typography>

        <form onSubmit={addNewEntry}>
          <TextField
            label="type"
            variant="standard" fullWidth
            value={type}
            onChange={({ target }) => setType(target.value)}
          />
          <TextField
            label="description"
            variant="standard" fullWidth
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <TextField
            label="date"
            variant="standard" fullWidth
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
          <TextField
            label="specialist"
            variant="standard" fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
          <TextField
            label="healthCheckRating"
            variant="standard" fullWidth
            value={healthCheckRating}
            onChange={({ target }) => setHealthCheckRating(target.value)}
          />
          <TextField
            label="diagnosisCodes"
            variant="standard" fullWidth
            value={diagnosisCodes}
            onChange={({ target }) => setDiagnosisCodes(target.value)}
          />
          <TextField
            label="dischargeDate"
            variant="standard" fullWidth
            value={dischargeDate}
            onChange={({ target }) => setDischargeDate(target.value)}
          />
          <TextField
            label="dischargeCriteria"
            variant="standard" fullWidth
            value={dischargeCriteria}
            onChange={({ target }) => setDischargeCriteria(target.value)}
          />
          <TextField
            label="sickLeaveStartDate"
            variant="standard" fullWidth
            value={sickLeaveStartDate}
            onChange={({ target }) => setSickLeaveStartDate(target.value)}
          />
          <TextField
            label="sickLeaveEndDate"
            variant="standard" fullWidth
            value={sickLeaveEndDate}
            onChange={({ target }) => setSickLeaveEndDate(target.value)}
          />
          <TextField
            label="employerName"
            variant="standard" fullWidth
            value={employerName}
            onChange={({ target }) => setEmployerName(target.value)}
          />
          
          <Grid style={{ display: "flow-root", marginTop: "1em"}}>
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                style={{ float: "left" }}
                type="button"
                onClick={() => setVisibility(false)}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                style={{
                  float: "right",
                }}
                type="submit"
                variant="contained"
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  };
  
export default AddNewEntry;