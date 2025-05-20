import './Patients.scss';
import { Link, useNavigate } from 'react-router-dom';
import { usePatients } from '../hooks/usePatients';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../layouts/theme';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Patients = () => {
    const { patients } = usePatients();
    const navigate = useNavigate();

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='container'>
                    <div className="patients">
                        <div className="header">
                            <h1>Patients</h1>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon />}
                                onClick={() => navigate('/add-patient')}
                                className="add-patient-btn"
                            >
                                Add New Patient
                            </Button>
                        </div>
                        <table className="patient-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Gender</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patients.map((patient) => (
                                    <tr key={patient.id}>
                                        <td>{patient.id}</td>
                                        <td>{`${patient.firstName} ${patient.lastName}`}</td>
                                        <td>{patient.gender}</td>
                                        <td>
                                            <Link to={`/patientDetails/${patient.id}`} className="details-btn">
                                                Read More..
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </LocalizationProvider>
        </ThemeProvider>
    );
}

export default Patients; 