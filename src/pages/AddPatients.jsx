import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import PatientSection from '../components/customForm/PatientSection';

import { Grid } from '@mui/material';

import {
    StyledCard,
    StyledButton,
    StyledCancelButton,
} from '../components/shared/FormStyles';


const disorderOptions = ['PD', 'ET', 'Dyst_G', 'Dyst_NG', 'OCD', 'Tourette', 'Epilepsy', 'Other'];

const AddPatients = () => {
    const navigate = useNavigate();
    const [workspaceErrorLeft, setWorkspaceErrorLeft] = useState(null);
    const [workspaceErrorRight, setWorkspaceErrorRight] = useState(null);

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            rightPatient: {
                firstName: '',
                lastName: '',
                gender: '',
                birthDate: null,
                disorders: [],
                workspaces: [{ name: '' }],
            },
            leftPatient: {
                firstName: '',
                lastName: '',
                gender: '',
                birthDate: null,
                disorders: [],
                workspaces: [{ name: '' }],
            }
        }
    });



    const { fields: leftFields, append: leftAppend, update: leftUpdate } = useFieldArray({
        control,
        name: 'leftPatient.workspaces',
    });

    const { fields: rightFields, append: rightAppend, update: rightUpdate } = useFieldArray({
        control,
        name: 'rightPatient.workspaces',
    });

    const handleWorkspaceChange = (patient, index, value) => {
        if (patient === 'left') {
            leftUpdate(index, { name: value.trim() });
        } else {
            rightUpdate(index, { name: value.trim() });
        }
    };

    const validateWorkspaces = () => {
        const leftWorkspaces = (watch('leftPatient.workspaces') || []).map(w => w.name.trim()).filter(n => n !== '');
        const rightWorkspaces = (watch('rightPatient.workspaces') || []).map(w => w.name.trim()).filter(n => n !== '');

        let valid = true;
        if (leftWorkspaces.length === 0) {
            setWorkspaceErrorLeft('At least one workspace is required for left patient');
            valid = false;
        } else {
            setWorkspaceErrorLeft(null);
        }

        if (rightWorkspaces.length === 0) {
            setWorkspaceErrorRight('At least one workspace is required for right patient');
            valid = false;
        } else {
            setWorkspaceErrorRight(null);
        }

        return valid;
    };


    const handleformatDate = (inputDate) => {
        if (!inputDate) return null;

        const d = new Date(inputDate);
        if (isNaN(d.getTime())) return null;

        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    const onSubmit = (data) => {
        if (!validateWorkspaces()) return;

        const formattedLeftBirth = handleformatDate(data.leftPatient.birthDate);
        const formattedRightBirth = handleformatDate(data.rightPatient.birthDate);

        const newPatient = {
            ...data,
            leftPatient: {
                ...data.leftPatient,
                birthDate: formattedLeftBirth,
            },
            rightPatient: {
                ...data.rightPatient,
                birthDate: formattedRightBirth,
            },
        };

        alert(`
        Patient Left Added!!
        Name: ${newPatient.leftPatient.firstName} ${newPatient.leftPatient.lastName}
        Gender: ${newPatient.leftPatient.gender}
        Birth Date: ${newPatient.leftPatient.birthDate}
        Disorders: ${newPatient.leftPatient.disorders.join(', ')}
        Workspaces: ${newPatient.leftPatient.workspaces.map(ws => ws.name).join(', ')}

        Patient Right Added!!
        Name: ${newPatient.rightPatient.firstName} ${newPatient.rightPatient.lastName}
        Gender: ${newPatient.rightPatient.gender}
        Birth Date: ${newPatient.rightPatient.birthDate}
        Disorders: ${newPatient.rightPatient.disorders.join(', ')}
        Workspaces: ${newPatient.rightPatient.workspaces.map(ws => ws.name).join(', ')}     
    `);

        navigate('/');
    };


    return (
        <StyledCard>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3} >

                    <Grid container spacing={1} >
                        <Grid size={6} >
                            <PatientSection
                                title="Add Left Patient"
                                fieldPrefix="leftPatient"
                                register={register}
                                control={control}
                                errors={errors}
                                watch={watch}
                                disorderOptions={disorderOptions}
                                fields={leftFields}
                                append={leftAppend}
                                handleWorkspaceChange={(index, value) => handleWorkspaceChange('left', index, value)}
                                workspaceError={workspaceErrorLeft}
                            />
                        </Grid>
                        <Grid size={6} >
                            <PatientSection
                                title="Add Right Patient"
                                fieldPrefix="rightPatient"
                                register={register}
                                control={control}
                                errors={errors}
                                watch={watch}
                                disorderOptions={disorderOptions}
                                fields={rightFields}
                                append={rightAppend}
                                handleWorkspaceChange={(index, value) => handleWorkspaceChange('right', index, value)}
                                workspaceError={workspaceErrorRight}
                            />
                        </Grid>
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
            </form >
        </StyledCard >
    );
};

export default AddPatients;