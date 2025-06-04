import { Controller } from "react-hook-form";
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, Typography } from "@mui/material";
import { StyledBox } from "../shared/FormStyles";

const DisordersCheckboxGroup = ({
  name = "disorders",
  control,
  errors,
  options = [],
  label = "Disorders *",
}) => {
  return (
    <FormControl component="fieldset" error={!!errors[name]}>
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup row>
        <Controller
          name={name}
          control={control}
          rules={{
            validate: (value) =>
              value && value.length > 0 ? true : "At least one disorder must be selected",
          }}
          render={({ field }) => (
            <>
              {options.map((option) => {
                const checked = field.value?.includes(option);
                return (
                  <StyledBox key={option} selected={checked}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked}
                          onChange={(e) => {
                            const newValues = e.target.checked
                              ? [...(field.value || []), option]
                              : (field.value || []).filter((v) => v !== option);
                            field.onChange(newValues);
                          }}
                          name={option}
                          color="primary"
                        />
                      }
                      label={option}
                    />
                  </StyledBox>
                );
              })}
            </>
          )}
        />
      </FormGroup>
      <Typography variant="caption" color="error">
        {errors[name]?.message}
      </Typography>
    </FormControl>
  );
};

export default DisordersCheckboxGroup;
