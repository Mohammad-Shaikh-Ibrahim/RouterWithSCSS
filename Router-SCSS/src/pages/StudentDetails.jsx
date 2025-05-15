import './StudentDetails.scss';
import { Link, useParams,Navigate } from "react-router-dom";
import { useStudents } from '../hooks/useStudents';

export default function StudentDetails() {
  const { stdId } = useParams();
  const students = useStudents();
  const student = students.find(std => std.id === parseInt(stdId));

if (!student) {
  return <Navigate to="/error" replace />;
}

  return (
    <div className="student-details">
      <h1>Student Details</h1>

      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Major</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{student.age}</td>
            <td>{student.major}</td>
          </tr>
        </tbody>
      </table>
      <Link to=".." className="back-link">Back to Students</Link>
    </div>
  );
}
