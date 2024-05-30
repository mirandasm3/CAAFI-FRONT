import { BrowserRouter, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Login from './pages/LoginPage';
import StudentDashboard from './pages/StudentDashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
              <Route path="/login" element={<Login/>} />
              <Route path="/alumnos-caafi" element={<StudentDashboard/>} />
              <Route path="/administador-caafi" element={<AdminDashboard/>} />
              <Route path="/cabina-caafi" element={<CabinDashboard/>} />
              <Route path="/registro-alumnos" element={<StudentRegister/>} />
              <Route path="/registro-personal" element={<PersonalRegister/>} />
              <Route path="/solicitudes-alumnos" element={<StudentsApplications/>} />
              <Route path="/bitacora" element={<Binnacle/>} />
              <Route path="/reportes" element={<Report/>} />
              <Route path="*" element={<h1>404</h1>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
