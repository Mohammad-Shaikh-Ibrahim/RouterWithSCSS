import { Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const RHFDatePicker = ({ name, control, errors, label }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: `${label} is required` }}
      render={({ field }) => (
        <DatePicker
          label={label}
          {...field}
          slotProps={{
            textField: {
              fullWidth: true,
              error: !!errors?.[name],
              helperText: errors?.[name]?.message,
            },
          }}
        />
      )}
    />
  );
};

export default RHFDatePicker;
