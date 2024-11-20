import { Button, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { Diagnose, EntryWithoutId, HealthCheckRating, typeStrings } from "../../types";
import diagnosesService from "../../services/diagnoses";

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
}

const AddNewEntry = ({ onSubmit }: Props): JSX.Element => {

  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<string>('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string | string[]>([]);
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');
  const [employerName, setEmployerName] = useState('');

   const [visible, setVisibility] = useState(false);
   const [diagnoses, setDiagnoses] = useState<Diagnose[]>([]);

   useEffect(() => {
    const fetchDiagnosesList = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);
      };
      void fetchDiagnosesList();
    }, []
  );

  const addNewEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const enumHealthCheckRating = healthCheckRating as unknown as HealthCheckRating;
    const arrayDiagnosisCodes:string[] = typeof diagnosisCodes === 'string' ? [diagnosisCodes] : diagnosisCodes;
    //const arrayDiagnosisCodes:string = diagnosisCodes;

    switch(type) { 
      case 'OccupationalHealthcare':
        onSubmit({
          description: description,
          date: date,
          specialist: specialist,
          diagnosisCodes: arrayDiagnosisCodes,
          type: 'OccupationalHealthcare',
          employerName: employerName,
          sickLeave: {startDate: sickLeaveStartDate, endDate: sickLeaveEndDate}
        });
        break;
      case 'Hospital': 
        onSubmit({
          description: description,
          date: date,
          specialist: specialist,
          diagnosisCodes: arrayDiagnosisCodes,
          type: 'Hospital',
          discharge: {date: dischargeDate, criteria: dischargeCriteria}
        });
        break;
      case 'HealthCheck': 
      default:
        onSubmit({
          description: description,
          date: date,
          specialist: specialist,
          diagnosisCodes: arrayDiagnosisCodes,
          type: 'HealthCheck',
          healthCheckRating: enumHealthCheckRating
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

          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={type}
              onChange={({ target }) => setType(target.value)}
              input={<OutlinedInput label="Type" />}
            >
              {typeStrings.map((type) => (
                <MenuItem
                  key={type}
                  value={type}
                >
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Description"
            variant="standard" fullWidth
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />

          <InputLabel style={{marginTop: "0.5em"}}>Date</InputLabel>
          <TextField
            type="date"
            variant="standard" fullWidth
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
          <TextField
            label="Specialist"
            variant="standard" fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />

          <FormControl fullWidth style={{marginTop: "1em"}}>
            <InputLabel>Diagnosis codes</InputLabel>
            <Select
              multiple
              value={diagnosisCodes}
              onChange={({ target }) => setDiagnosisCodes(target.value)}
              input={<OutlinedInput label="Diagnosis codes" />}
            >
              {diagnoses.map((diagnose) => (
                <MenuItem
                  key={diagnose.code}
                  value={diagnose.code}
                >
                  {diagnose.code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          { type === 'HealthCheck' &&
            <FormControl fullWidth style={{marginTop: "1em"}}>
              <InputLabel>Health check rating</InputLabel>
              <Select
                value={healthCheckRating}
                onChange={({ target }) => setHealthCheckRating(target.value)}
                input={<OutlinedInput label="Health check rating" />}
              >
                <MenuItem
                  key={HealthCheckRating.Healthy}
                  value={HealthCheckRating.Healthy}
                >
                  {HealthCheckRating.Healthy}
                </MenuItem>
                <MenuItem
                  key={HealthCheckRating.LowRisk}
                  value={HealthCheckRating.LowRisk}
                >
                  {HealthCheckRating.LowRisk}
                </MenuItem>
                <MenuItem
                  key={HealthCheckRating.HighRisk}
                  value={HealthCheckRating.HighRisk}
                >
                  {HealthCheckRating.HighRisk}
                </MenuItem>
                <MenuItem
                  key={HealthCheckRating.CriticalRisk}
                  value={HealthCheckRating.CriticalRisk}
                >
                  {HealthCheckRating.CriticalRisk}
                </MenuItem>
              </Select>
            </FormControl>
          }
          { type === 'Hospital' &&
          <div>
            <InputLabel style={{marginTop: "0.5em"}}>Discharge</InputLabel>
            <TextField
              type="Date"
              variant="standard"
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField fullWidth
              label="Discharge criteria"
              variant="standard"
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </div>
          }
          { type === 'OccupationalHealthcare' &&
          <div>
            <InputLabel style={{marginTop: "0.5em"}}>Discharge begin date</InputLabel>
            <TextField
              type="date"
              variant="standard"
              value={sickLeaveStartDate}
              onChange={({ target }) => setSickLeaveStartDate(target.value)}
            /><div />
            <InputLabel style={{marginTop: "0.5em"}}>Discharge end date</InputLabel>
            <TextField
              type="date"
              variant="standard"
              value={sickLeaveEndDate}
              onChange={({ target }) => setSickLeaveEndDate(target.value)}
            />
            <TextField fullWidth
              label="Employer name"
              variant="standard"
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            </div>
          }
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