import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../layouts/theme';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AddPatientReactHookForm from './AddPatientReactHookForm';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './AddPatientPage.scss';

const AddPatientPage = () => {
    const navigate = useNavigate();

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="add-patient-page">
                    <div className="header">
                        <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate('/')}
                            className="back-btn"
                        >
                            Back to Patients
                        </Button>
                        <h1>Add New Patient</h1>
                    </div>
                    <AddPatientReactHookForm />
                </div>
            </LocalizationProvider>
        </ThemeProvider>
    );
};

export default AddPatientPage; 