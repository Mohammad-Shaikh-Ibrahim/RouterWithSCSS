import { Grid } from '@mui/material';
import { StyledTitle } from '../shared/FormStyles';
import TextInput from './TextInput';
import GenderRadioGroup from './GenderRadioGroup';
import RHFDatePicker from './RHFDatePicker';
import DisordersCheckboxGroup from './DisordersCheckboxGroup ';
import WorkspaceTemplateFields from './WorkspaceTemplateFields';

const PatientSection = ({
    title,
    fieldPrefix,
    register,
    control,
    errors,
    watch,
    disorderOptions,
    fields,
    append,
    handleWorkspaceChange,
    workspaceError
}) => {
    return (
        <>
            <Grid size={12}>
                <StyledTitle variant="h4" gutterBottom>{title}</StyledTitle>
            </Grid>

            <Grid container size={12} spacing={1} marginBottom={2}>
                {/* First Name */}
                <Grid size={4}>
                    <TextInput
                        label="First name *"
                        {...register(`${fieldPrefix}.firstName`, {
                            required: "First name is required",
                            pattern: {
                                value: /^[^\d]*$/,
                                message: "First name cannot contain numbers"
                            },
                            minLength: { value: 2, message: "First name must be at least 2 characters" },
                            maxLength: { value: 50, message: "First name cannot exceed 50 characters" }
                        })}
                        error={!!errors?.[fieldPrefix]?.firstName}
                        helperText={errors?.[fieldPrefix]?.firstName?.message}
                    />
                </Grid>

                {/* Last Name */}
                <Grid size={4} >
                    <TextInput
                        label="Last name *"
                        {...register(`${fieldPrefix}.lastName`, {
                            required: "Last name is required",
                            pattern: {
                                value: /^[^\d]*$/,
                                message: "Last name cannot contain numbers"
                            },
                            minLength: { value: 2, message: "Last name must be at least 2 characters" },
                            maxLength: { value: 50, message: "Last name cannot exceed 50 characters" }
                        })}
                        error={!!errors?.[fieldPrefix]?.lastName}
                        helperText={errors?.[fieldPrefix]?.lastName?.message}
                    />
                </Grid>
            </Grid>

            {/* Gender */}
            <Grid size={12} marginBottom={2}>
                <GenderRadioGroup
                    name={`${fieldPrefix}.gender`}
                    control={control}
                    errors={errors}
                />
            </Grid>

            {/* Birth Date */}
            <Grid size={3} marginBottom={2}>
                <RHFDatePicker
                    name={`${fieldPrefix}.birthDate`}
                    control={control}
                    errors={errors}
                    label="Date of birth *"
                />
            </Grid>

            {/* Disorders */}
            <Grid size={12} marginBottom={2}>
                <DisordersCheckboxGroup
                    name={`${fieldPrefix}.disorders`}
                    control={control}
                    errors={errors}
                    options={disorderOptions}
                    label="Disorders *"
                />
            </Grid>

            {/* Workspace Template */}
            <Grid size={4} marginBottom={2}>
                <WorkspaceTemplateFields
                    fieldPrefix={fieldPrefix}
                    fields={fields}
                    register={register}
                    errors={errors}
                    watch={watch}
                    append={append}
                    handleWorkspaceChange={(index, value) => handleWorkspaceChange(index, value)}
                    workspaceError={workspaceError}
                />
            </Grid>
        </>
    );
};

export default PatientSection;
