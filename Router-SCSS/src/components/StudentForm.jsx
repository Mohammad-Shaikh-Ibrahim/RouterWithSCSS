import './StudentForm.scss';
import { useState } from "react";

export default function StudentForm() {
    const [students, setStudents] = useState({
        name: "",
        age: "",
        major: ""
    });
    return (
        <div className="student-form">
            <h1>Student Form</h1>
            <form onSubmit={(event) => {
                event.preventDefault();
                console.log(students);
            }}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input 
                    type="text" 
                    id="name" 
                    name="name" required
                    value={students.name}
                    onChange={(event) => setStudents({ ...students, name: event.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age:</label>
                    <input 
                    type="number" 
                    id="age" 
                    name="age" 
                    required 
                    value={students.age}
                    onChange={(event) => setStudents({ ...students, age: event.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="major">Major:</label>
                    <input 
                    type="text" 
                    id="major" 
                    name="major" 
                    required 
                    value={students.major}
                    onChange={(event) => setStudents({ ...students, major: event.target.value })}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}