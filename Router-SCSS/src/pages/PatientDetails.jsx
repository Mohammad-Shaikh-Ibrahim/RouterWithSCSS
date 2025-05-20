import './PatientDetails.scss';
import { Link, useParams, Navigate } from "react-router-dom";
import { usePatients } from '../hooks/usePatients';

export default function PatientDetails() {
    const { patientId } = useParams();
    const { patients } = usePatients();
    const patient = patients.find(pat => pat.id === parseInt(patientId));

    if (!patient) {
        return <Navigate to="/error" replace />;
    }

    return (
        <div className="patient-details">
            <h1>Patient Details</h1>

            <table className="patient-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Birth Date</th>
                        <th>Disorders</th>
                        <th>Template</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{patient.id}</td>
                        <td>{patient.firstName}</td>
                        <td>{patient.lastName}</td>
                        <td>{patient.age}</td>
                        <td>{patient.gender}</td>
                        <td>{patient.birthDate}</td>
                        <td>{patient.disorders.join(', ')}</td>
                        <td>{patient.template}</td>
                    </tr>
                </tbody>
            </table>
            <Link to=".." className="back-link">Back to Patients</Link>
        </div>
    );
} 