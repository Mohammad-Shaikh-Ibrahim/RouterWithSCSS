import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
    Box, Button, Card, FormControl, FormLabel, Grid, MenuItem,
    RadioGroup, Radio, TextField, Checkbox, FormControlLabel,
    Typography, FormGroup
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { usePatients } from '../hooks/usePatients';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const validationSchema = Yup.object().shape({
    firstName: Yup.string()
        .matches(/^[^\d]*$/, "First name cannot contain numbers")
        .min(2, "First name must be at least 2 characters")
        .max(50, "First name cannot exceed 50 characters")
        .required("First name is required"),

    lastName: Yup.string()
        .matches(/^[^\d]*$/, "Last name cannot contain numbers")
        .min(2, "Last name must be at least 2 characters")
        .max(50, "Last name cannot exceed 50 characters")
        .required("Last name is required"),
    gender: Yup.string().required("Gender is required"),
    birthDate: Yup
        .date()
        .typeError("Please enter a valid date")
        .required("Date of birth is required")
        .max(new Date(), "Birth date cannot be in the future"),
    disorders: Yup.array().min(1, "At least one disorder must be selected"),
    template: Yup.string().required("Workspace template is required"),
});

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

const AddPatientFormikForm = () => {
    const { addPatient } = usePatients();
    const navigate = useNavigate();

    const initialValues = {
        firstName: '',
        lastName: '',
        gender: '',
        birthDate: null,
        disorders: [],
        template: '',
    };

    const handleSubmit = (values, { setSubmitting }) => {
        const formattedBirthDate = values.birthDate.toISOString().split('T')[0];
        const newPatient = {
            ...values,
            birthDate: formattedBirthDate
        };
        addPatient(newPatient);
        navigate('/');
        setSubmitting(false);
    };

    return (
        <StyledCard>
            <StyledTitle variant="h4" gutterBottom>Add a patient</StyledTitle>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, setFieldValue, isSubmitting }) => (
                    <Form>
                        <Grid container spacing={3}>
                            {/* First Name */}
                            <Grid size={3}>
                                <Field name="firstName">
                                    {({ field }) => (
                                        <TextField
                                            {...field}
                                            label="First name *"
                                            fullWidth
                                            error={touched.firstName && !!errors.firstName}
                                            helperText={touched.firstName && errors.firstName}
                                        />
                                    )}
                                </Field>
                            </Grid>

                            {/* Last Name */}
                            <Grid size={3}>
                                <Field name="lastName">
                                    {({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Last name *"
                                            fullWidth
                                            error={touched.lastName && !!errors.lastName}
                                            helperText={touched.lastName && errors.lastName}
                                        />
                                    )}
                                </Field>
                            </Grid>

                            {/* Gender */}
                            <Grid size={12}>
                                <FormControl error={touched.gender && !!errors.gender}>
                                    <FormLabel>Gender *</FormLabel>
                                    <Field name="gender">
                                        {({ field }) => (
                                            <RadioGroup row {...field}>
                                                {['Male', 'Female'].map((option) => (
                                                    <StyledGenderBox
                                                        key={option}
                                                        selected={values.gender === option}
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
                                    </Field>
                                    <Typography variant="caption" color="error">
                                        {touched.gender && errors.gender}
                                    </Typography>
                                </FormControl>
                            </Grid>

                            {/* Birth Date */}
                            <Grid size={3}>
                                <Field name="birthDate">
                                    {({ field, form }) => (
                                        <DatePicker
                                            label="Date of birth *"
                                            value={field.value}
                                            onChange={(newValue) => {
                                                form.setFieldValue('birthDate', newValue);
                                            }}
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true,
                                                    error: touched.birthDate && !!errors.birthDate,
                                                    helperText: touched.birthDate && errors.birthDate,
                                                },
                                            }}
                                        />
                                    )}
                                </Field>
                            </Grid>

                            {/* Disorders */}
                            <Grid size={12}>
                                <FormControl component="fieldset" error={touched.disorders && !!errors.disorders}>
                                    <FormLabel component="legend">Disorders *</FormLabel>
                                    <FormGroup row>
                                        {disorderOptions.map((disorder) => (
                                            <StyledDisorderBox
                                                key={disorder}
                                                selected={values.disorders.includes(disorder)}
                                            >
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={values.disorders.includes(disorder)}
                                                            onChange={(e) => {
                                                                const newDisorders = e.target.checked
                                                                    ? [...values.disorders, disorder]
                                                                    : values.disorders.filter(d => d !== disorder);
                                                                setFieldValue('disorders', newDisorders);
                                                            }}
                                                            name={disorder}
                                                            color="primary"
                                                        />
                                                    }
                                                    label={disorder}
                                                />
                                            </StyledDisorderBox>
                                        ))}
                                    </FormGroup>
                                    <Typography variant="caption" color="error">
                                        {touched.disorders && errors.disorders}
                                    </Typography>
                                </FormControl>
                            </Grid>

                            {/* Template */}
                            <Grid size={4}>
                                <Field name="template">
                                    {({ field }) => (
                                        <TextField
                                            select
                                            label="Workspace template *"
                                            fullWidth
                                            error={touched.template && !!errors.template}
                                            helperText={touched.template && errors.template}
                                            {...field}
                                        >
                                            <MenuItem value="Left">Left</MenuItem>
                                            <MenuItem value="Right">Right</MenuItem>
                                            <MenuItem value="Both">Both</MenuItem>
                                        </TextField>
                                    )}
                                </Field>
                            </Grid>

                            {/* Buttons */}
                            <Grid size={12}>
                                <StyledButton
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    disabled={isSubmitting}
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
                    </Form>
                )}
            </Formik>
        </StyledCard>
    );
};

export default AddPatientFormikForm; 