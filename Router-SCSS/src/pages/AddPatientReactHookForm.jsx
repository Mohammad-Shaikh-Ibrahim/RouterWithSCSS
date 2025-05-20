import { useForm, Controller } from 'react-hook-form';
import {
  Box, Button, Card, FormControl, FormLabel, Grid, MenuItem,
  RadioGroup, Radio, TextField, Checkbox, FormControlLabel,
  Typography, FormGroup
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePatients } from '../hooks/usePatients';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  gender: yup.string().required("Gender is required"),
  birthDate: yup
    .date()
    .typeError("Please enter a valid date")
    .required("Date of birth is required")
    .max(new Date(), "Birth date cannot be in the future"),
  disorders: yup.array().min(1, "At least one disorder must be selected"),
  template: yup.string().required("Workspace template is required"),
});

const disorderOptions = ['PD', 'ET', 'Dyst_G', 'Dyst_NG', 'OCD', 'Tourette', 'Epilepsy', 'Other'];

const AddPatientReactHookForm = () => {
  const { addPatient } = usePatients();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      gender: '',
      birthDate: null,
      disorders: [],
      template: '',
    }
  });

  const disorders = watch('disorders');
  const gender = watch('gender');

  const handleDisorderChange = (event) => {
    const value = event.target.name;
    const updated = disorders.includes(value)
      ? disorders.filter((d) => d !== value)
      : [...disorders, value];
    setValue('disorders', updated);
  };

  const onSubmit = (data) => {
    const formattedBirthDate = data.birthDate.toISOString().split('T')[0];
    const newPatient = {
      ...data,
      birthDate: formattedBirthDate
    };
    addPatient(newPatient);
    navigate('/');
  };

  return (
    <Card sx={{ p: 3, maxWidth: '80%', mx: 'auto', my: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ my: 4 }}>Add a patient</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>

          {/* First Name */}
          <Grid size={3}>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="First name *"
                  fullWidth
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              )}
            />
          </Grid>

          {/* Last Name */}
          <Grid size={3}>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Last name *"
                  fullWidth
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              )}
            />
          </Grid>

          {/* Gender */}
          <Grid size={12}>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.gender}>
                  <FormLabel>Gender *</FormLabel>
                  <RadioGroup row {...field}>
                    {['Male', 'Female'].map((option) => (
                      <Box
                        key={option}
                        p={1}
                        mr={2}
                        border={1}
                        borderRadius={1}
                        sx={{
                          borderColor: gender === option ? 'primary.main' : 'grey.300',
                          backgroundColor: gender === option ? 'secondary.main' : 'transparent',
                        }}
                      >
                        <FormControlLabel
                          value={option}
                          control={<Radio color="primary" />}
                          label={option}
                        />
                      </Box>
                    ))}
                  </RadioGroup>
                  <Typography variant="caption" color="error">{errors.gender?.message}</Typography>
                </FormControl>
              )}
            />
          </Grid>

          {/* Birth Date */}
          <Grid size={3}>
            <Controller
              name="birthDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Date of birth *"
                  value={field.value}
                  onChange={field.onChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.birthDate,
                      helperText: errors.birthDate?.message,
                    },
                  }}
                />
              )}
            />
          </Grid>

          {/* Disorders */}
          <Grid size={12}>
            <FormControl component="fieldset" error={!!errors.disorders}>
              <FormLabel component="legend">Disorders *</FormLabel>
              <FormGroup row>
                {disorderOptions.map((disorder) => (
                  <Box
                    key={disorder}
                    p={0.5}
                    mr={1.5}
                    border={1}
                    borderRadius={1}
                    sx={{
                      borderColor: disorders.includes(disorder) ? 'primary.main' : 'grey.300',
                      backgroundColor: disorders.includes(disorder) ? 'secondary.main' : 'transparent',
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={disorders.includes(disorder)}
                          onChange={handleDisorderChange}
                          name={disorder}
                          color="primary"
                        />
                      }
                      label={disorder}
                    />
                  </Box>
                ))}
              </FormGroup>
              <Typography variant="caption" color="error">{errors.disorders?.message}</Typography>
            </FormControl>
          </Grid>

          {/* Template */}
          <Grid size={4}>
            <Controller
              name="template"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  label="Workspace template *"
                  fullWidth
                  error={!!errors.template}
                  helperText={errors.template?.message}
                  {...field}
                >
                  <MenuItem value="Left">Left</MenuItem>
                  <MenuItem value="Right">Right</MenuItem>
                  <MenuItem value="Both">Both</MenuItem>
                </TextField>
              )}
            />
          </Grid>

          {/* Buttons */}
          <Grid size={12}>
            <Button variant="contained" color="primary" type="submit">Save</Button>
            <Button
              variant="outlined"
              color="primary"
              sx={{ ml: 2 }}
              onClick={() => navigate('/')}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};

export default AddPatientReactHookForm;