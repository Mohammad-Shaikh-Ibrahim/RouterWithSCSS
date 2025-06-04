import { Controller } from 'react-hook-form';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';
import {StyledBox} from '../shared/FormStyles';

const GenderRadioGroup = ({ 
  name, 
  control, 
  errors, 
  options = ['Male', 'Female'], 
  label = 'Gender *', }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: 'Gender is required' }}
      render={({ field }) => (
        <FormControl error={!!errors[name]} component="fieldset">
          <FormLabel component="legend">{label}</FormLabel>
          <RadioGroup row {...field}>
            {options.map(option => (
              <StyledBox key={option} selected={field.value === option}>
                <FormControlLabel
                  value={option}
                  control={<Radio color="primary" />}
                  label={option}
                />
              </StyledBox>
            ))}
          </RadioGroup>
          <Typography variant="caption" color="error">
            {errors[name]?.message}
          </Typography>
        </FormControl>
      )}
    />
  );
};

export default GenderRadioGroup;
