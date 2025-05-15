import './App.css';
import Students from './pages/Students';
import StudentDetails from './pages/StudentDetails';
import ErrorPage from './pages/ErrorPage';
import { StudentProvider } from './contexts/StudentContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Students /> },
      { path: 'students', element: <Students /> },
      { path: 'error', element: <ErrorPage /> },
      { path: 'studentDetails/:stdId', element: <StudentDetails /> },
    ],
  },
]);

function App() {
  
  return (
    <>
    <StudentProvider>
      <RouterProvider router={router} />
    </StudentProvider>
    </>
  );
}

export default App;
