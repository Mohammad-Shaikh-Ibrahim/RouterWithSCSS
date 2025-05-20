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

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
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
        <Card sx={{ p: 3, maxWidth: '80%', mx: 'auto', my: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ my: 4 }}>Add a patient</Typography>
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
                                                    <Box
                                                        key={option}
                                                        p={1}
                                                        mr={2}
                                                        border={1}
                                                        borderRadius={1}
                                                        sx={{
                                                            borderColor: values.gender === option ? 'primary.main' : 'grey.300',
                                                            backgroundColor: values.gender === option ? 'secondary.main' : 'transparent',
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
                                            <Box
                                                key={disorder}
                                                p={0.5}
                                                mr={1.5}
                                                border={1}
                                                borderRadius={1}
                                                sx={{
                                                    borderColor: values.disorders.includes(disorder) ? 'primary.main' : 'grey.300',
                                                    backgroundColor: values.disorders.includes(disorder) ? 'secondary.main' : 'transparent',
                                                }}
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
                                            </Box>
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
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    disabled={isSubmitting}
                                    sx={{ px: 6 }}
                                >
                                    Save
                                </Button>
                                <Button
                                    variant="text"
                                    color="black"
                                    sx={{ ml: 2 }}
                                    onClick={() => navigate('/')}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Card>
    );
};

export default AddPatientFormikForm; 