import { useForm, Controller } from 'react-hook-form';
import {
  Box, Button, Card, FormControl, FormLabel, Grid, MenuItem,
  RadioGroup, Radio, TextField, Checkbox, FormControlLabel,
  Typography, FormGroup
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { usePatients } from '../hooks/usePatients';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const disorderOptions = ['PD', 'ET', 'Dyst_G', 'Dyst_NG', 'OCD', 'Tourette', 'Epilepsy', 'Other'];

const StyledCard = styled(Card)`
  padding: 24px;
  max-width: 80%;
  margin: 32px auto;
`;

const StyledTitle = styled(Typography)`
  margin: 32px 0;
`;

const StyledButton = styled(Button)`
  padding-left: 48px;
  padding-right: 48px;
`;

const StyledCancelButton = styled(Button)`
  margin-left: 16px;
`;

const StyledGenderBox = styled(Box)`
  padding: 8px;
  margin-right: 16px;
  border: 1px solid ${props => props.selected ? '#b92031' : '#e0e0e0'};
  border-radius: 4px;
  background-color: ${props => props.selected ? 'rgba(244, 67, 54, 0.085)' : 'transparent'};
`;

const StyledDisorderBox = styled(Box)`
  padding: 4px;
  margin-right: 12px;
  border: 1px solid ${props => props.selected ? '#b92031' : '#e0e0e0'};
  border-radius: 4px;
  background-color: ${props => props.selected ? 'rgba(244, 67, 54, 0.085)' : 'transparent'};
`;

const AddPatientReactHookForm = () => {
  const { addPatient } = usePatients();
  const navigate = useNavigate();

  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      gender: '',
      birthDate: null,
      disorders: [],
      template: '',
    }
  });

  const onSubmit = (data) => {
    const d = new Date(data.birthDate);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    const formattedBirthDate = `${year}-${month}-${day}`;
    const newPatient = {
      ...data,
      birthDate: formattedBirthDate
    };
    addPatient(newPatient);
    navigate('/');
  };

  const watchedValues = watch();

  return (
    <StyledCard>
      <StyledTitle variant="h4" gutterBottom>Add a patient</StyledTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {/* First Name */}
          <Grid size={3}>
            <Controller
              name="firstName"
              control={control}
              rules={{
                required: "First name is required",
                pattern: {
                  value: /^[^\d]*$/,
                  message: "First name cannot contain numbers"
                },
                minLength: {
                  value: 2,
                  message: "First name must be at least 2 characters"
                },
                maxLength: {
                  value: 50,
                  message: "First name cannot exceed 50 characters"
                }
              }}
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
              rules={{
                required: "Last name is required",
                pattern: {
                  value: /^[^\d]*$/,
                  message: "Last name cannot contain numbers"
                },
                minLength: {
                  value: 2,
                  message: "Last name must be at least 2 characters"
                },
                maxLength: {
                  value: 50,
                  message: "Last name cannot exceed 50 characters"
                }
              }}
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
            <FormControl error={!!errors.gender}>
              <FormLabel>Gender *</FormLabel>
              <Controller
                name="gender"
                control={control}
                rules={{ required: "Gender is required" }}
                render={({ field }) => (
                  <RadioGroup row {...field}>
                    {['Male', 'Female'].map((option) => (
                      <StyledGenderBox
                        key={option}
                        selected={watchedValues.gender === option}
                      >
                        <FormControlLabel
                          value={option}
                          control={<Radio color="primary" />}
                          label={option}
                        />
                      </StyledGenderBox>
                    ))}
                  </RadioGroup>
                )}
              />
              <Typography variant="caption" color="error">
                {errors.gender?.message}
              </Typography>
            </FormControl>
          </Grid>

          {/* Birth Date */}
          <Grid size={3}>
            <Controller
              name="birthDate"
              control={control}
              rules={{
                required: "Date of birth is required",
                validate: (value) => {
                  if (!value) return "Date of birth is required";
                  if (value > new Date()) {
                    return "Birth date cannot be in the future";
                  }
                  return true;
                }
              }}
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
                  <StyledDisorderBox
                    key={disorder}
                    selected={watchedValues.disorders?.includes(disorder)}
                  >
                    <Controller
                      name="disorders"
                      control={control}
                      rules={{
                        validate: (value) => value.length > 0 || "At least one disorder must be selected"
                      }}
                      render={({ field }) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={field.value?.includes(disorder)}
                              onChange={(e) => {
                                const newDisorders = e.target.checked
                                  ? [...(field.value || []), disorder]
                                  : (field.value || []).filter(d => d !== disorder);
                                field.onChange(newDisorders);
                              }}
                              name={disorder}
                              color="primary"
                            />
                          }
                          label={disorder}
                        />
                      )}
                    />
                  </StyledDisorderBox>
                ))}
              </FormGroup>
              <Typography variant="caption" color="error">
                {errors.disorders?.message}
              </Typography>
            </FormControl>
          </Grid>

          {/* Template */}
          <Grid size={4}>
            <Controller
              name="template"
              control={control}
              rules={{ required: "Workspace template is required" }}
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
            <StyledButton
              variant="contained"
              color="primary"
              type="submit"
            >
              Save
            </StyledButton>
            <StyledCancelButton
              variant="text"
              color="black"
              onClick={() => navigate('/')}
            >
              Cancel
            </StyledCancelButton>
          </Grid>
        </Grid>
      </form>
    </StyledCard>
  );
};

export default AddPatientReactHookForm;