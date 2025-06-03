import { useForm } from 'react-hook-form';
import {
  Box, Button, FormControl, FormLabel, Grid, MenuItem,
  RadioGroup, Radio, TextField, Checkbox, FormControlLabel,
  Typography, FormGroup
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { usePatients } from '../hooks/usePatients';
import { useNavigate } from 'react-router-dom';
import {
  StyledCard,
  StyledTitle,
  StyledButton,
  StyledCancelButton,
  StyledGenderBox,
  StyledDisorderBox
} from '../components/shared/FormStyles';

const disorderOptions = ['PD', 'ET', 'Dyst_G', 'Dyst_NG', 'OCD', 'Tourette', 'Epilepsy', 'Other'];

const AddPatientReactHookForm = () => {
  const { addPatient } = usePatients();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors }
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      gender: '',
      birthDate: null,
      disorders: [],
      template: '',
    }
  });

  const watchedValues = watch();

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

  const handleDateChange = (date) => {
    setValue('birthDate', date, { shouldValidate: true });
    trigger('birthDate');
  };

  const handleGenderChange = (e) => {
    setValue('gender', e.target.value, { shouldValidate: true });
    trigger('gender');
  };

  return (
    <StyledCard>
      <StyledTitle variant="h4" gutterBottom>Add a patient</StyledTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>

          {/* First Name */}
          <Grid size={3}>
            <TextField
              label="First name *"
              fullWidth
              {...register('firstName', {
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
              })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>

          {/* Last Name */}
          <Grid size={3}>
            <TextField
              label="Last name *"
              fullWidth
              {...register('lastName', {
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
              })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Grid>

          {/* Gender */}
          <Grid size={12}>
            <FormControl error={!!errors.gender}>
              <FormLabel>Gender *</FormLabel>
              <RadioGroup
                row
                value={watchedValues.gender}
                onChange={handleGenderChange}
              >
                {['Male', 'Female'].map(option => (
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
              <Typography variant="caption" color="error">
                {errors.gender?.message}
              </Typography>
            </FormControl>
          </Grid>

          {/* Birth Date */}
          <Grid size={3}>
            <DatePicker
              label="Date of birth *"
              value={watchedValues.birthDate}
              onChange={handleDateChange}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!errors.birthDate,
                  helperText: errors.birthDate?.message,
                },
              }}
            />
          </Grid>

          {/* Disorders */}
          <Grid size={12}>
            <FormControl component="fieldset" error={!!errors.disorders}>
              <FormLabel component="legend">Disorders *</FormLabel>
              <FormGroup row>
                {disorderOptions.map(disorder => {
                  const checked = watchedValues.disorders?.includes(disorder);
                  return (
                    <StyledDisorderBox key={disorder} selected={checked}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checked}
                            onChange={(e) => {
                              const current = watchedValues.disorders || [];
                              let newDisorders;
                              if (e.target.checked) {
                                newDisorders = [...current, disorder];
                              } else {
                                newDisorders = current.filter(d => d !== disorder);
                              }
                              setValue('disorders', newDisorders, { shouldValidate: true });
                              trigger('disorders');
                            }}
                            name={disorder}
                            color="primary"
                          />
                        }
                        label={disorder}
                      />
                    </StyledDisorderBox>
                  );
                })}
              </FormGroup>
              <Typography variant="caption" color="error">
                {errors.disorders?.message}
              </Typography>
            </FormControl>
          </Grid>

          {/* Template */}
          <Grid size={4}>
            <TextField
              select
              label="Workspace template *"
              fullWidth
              error={!!errors.template}
              helperText={errors.template?.message}
              value={watchedValues.template}
              {...register('template', { required: "Workspace template is required" })}
            >
              <MenuItem value="Left">Left</MenuItem>
              <MenuItem value="Right">Right</MenuItem>
              <MenuItem value="Both">Both</MenuItem>
            </TextField>
          </Grid>

          {/* Buttons */}
          <Grid size={12}>
            <StyledButton variant="contained" color="primary" type="submit">
              Save
            </StyledButton>
            <StyledCancelButton variant="text" color="black" onClick={() => navigate('/')}>
              Cancel
            </StyledCancelButton>
          </Grid>

        </Grid>
      </form>
    </StyledCard>
  );
};

export default AddPatientReactHookForm;