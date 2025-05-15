import './Students.scss';
import { Link } from 'react-router-dom';
import { useStudents } from '../hooks/useStudents';
import StudentForm from '../components/StudentForm';

export default function Students() {
    const students = useStudents();

    return (
        <>
            <div className='container'>
                <div className="students">
                    <h1>Students</h1>
                    <table className="student-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.id}>
                                    <td>{student.id}</td>
                                    <td>{student.name}</td>
                                    <td>
                                        <Link to={`/studentDetails/${student.id}`} className="details-btn">
                                            Read More..
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <StudentForm />
            </div>
        </>
    );
}
