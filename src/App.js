import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/LoginPage';
import SingUpPersonal from './pages/SingUpPersonal';
import SelectStudent from './pages/SelectStudent';
import Dashboard from './pages/Dashboard';
import BinnacleHistory from './pages/BinnacleHistory';
import StatsReports from './pages/StatsReports';
import RegistrationRequest from './pages/RegistrationRequest';
import TestLogin from './pages/TestLogin';
import PersonalManagment from './pages/PersonalManagment';
import AcceptInscription from './pages/AcceptInscription';
import StudentManagement from './pages/StudentManagement';
import Bitacora from './pages/Bitacora';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Navigate to="/caafi" />} />
              <Route path="/caafi" element={<Login/>} />
              <Route path="/registro" element={<SelectStudent/>} />
              <Route path="/solicitud-registro" element={<RegistrationRequest/>} />
              <Route path="/inicio" element={<Dashboard/>} />
              <Route path="/registrar-personal-caafi" element={<SingUpPersonal/>} />
              <Route path="/reportes" element={<StatsReports/>} />
              <Route path="/historial-bitacoras" element={<BinnacleHistory/>} />
              <Route path="/gestion-personal" element={<PersonalManagment/>} />
              <Route path="/inscripciones" element={<AcceptInscription/>} />
              <Route path="/gestion-alumnos" element={<StudentManagement/>} />
              <Route path="/bitacora" element={<Bitacora/>} />
              <Route path="/test-login" element={<TestLogin />} /> 
              <Route path="*" element={<h1>404</h1>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
