import {TextField} from '@mui/material';
const TextInput = ({ label, register, error, ...rest }) => {
  return (
    <TextField
      label={label}
      fullWidth
      {...register}
      {...rest}
      error={!!error}
      helperText={error?.message}
    />
  );
};
export default TextInput;