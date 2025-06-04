import { MenuItem, Typography } from "@mui/material";
import { StyledButton } from '../shared/FormStyles'
import TextInput from "./TextInput"

const WorkspaceTemplateFields = ({
    fieldPrefix,
    fields,
    register,
    errors,
    watch,
    append,
    handleWorkspaceChange,
    workspaceError,
}) => {
    return (
        <>
            {fields.map((field, index) => {
                const fieldPath = `${fieldPrefix}.workspaces[${index}].name`;

                return (
                    <TextInput
                        select
                        key={field.id}
                        label={`Workspace template * ${index + 1}`}
                        onChange={(e) => handleWorkspaceChange(index, e.target.value)}
                        fullWidth
                        margin="dense"
                        value={watch(fieldPath) || ""}
                        error={!!errors?.[fieldPrefix]?.workspaces?.[index]?.name}
                        helperText={errors?.[fieldPrefix]?.workspaces?.[index]?.name?.message}
                        {...register(fieldPath, {
                            required: "Workspace template is required",
                        })}
                    >
                        <MenuItem value="Left">Left</MenuItem>
                        <MenuItem value="Right">Right</MenuItem>
                        <MenuItem value="Both">Both</MenuItem>
                    </TextInput>
                );
            })}

            <StyledButton
                variant="outlined"
                onClick={() => append({ name: "" })}
                sx={{ mt: 1 }}
            >
                Add Another Workspace
            </StyledButton>

            {workspaceError && (
                <Typography color="error">{workspaceError}</Typography>
            )}
        </>
    );
};

export default WorkspaceTemplateFields;
