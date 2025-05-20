import './Patients.scss';
import { Link } from 'react-router-dom';
import { usePatients } from '../hooks/usePatients';
import AddPatientReactHookForm from './AddPatientReactHookForm';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../layouts/theme';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const Patients = () => {
    const { patients } = usePatients();

    return (
        <>
            <div className='container'>
                <div className="patients">
                    <h1>Patients</h1>
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
                <ThemeProvider theme={theme}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <AddPatientReactHookForm />
                    </LocalizationProvider>
                </ThemeProvider>
            </div>
        </>
    );
}

export default Patients; 