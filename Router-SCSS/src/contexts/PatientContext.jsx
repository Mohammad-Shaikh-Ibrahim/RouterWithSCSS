import { createContext, useState } from 'react';
import { initialPatients } from '../data/patientsData';

export const PatientContext = createContext();

export function PatientProvider({ children }) {
    const [patients, setPatients] = useState(initialPatients);

    const addPatient = (newPatient) => {
        setPatients(prevPatients => [...prevPatients, {
            ...newPatient,
            id: Math.max(...prevPatients.map(p => p.id)) + 1
        }]);
    };

    const updatePatient = (id, updatedData) => {
        setPatients(prevPatients =>
            prevPatients.map(patient =>
                patient.id === id ? { ...patient, ...updatedData } : patient
            )
        );
    };

    const deletePatient = (id) => {
        setPatients(prevPatients =>
            prevPatients.filter(patient => patient.id !== id)
        );
    };

    return (
        <PatientContext.Provider value={{
            patients,
            addPatient,
            updatePatient,
            deletePatient
        }}>
            {children}
        </PatientContext.Provider>
    );
} 