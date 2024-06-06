import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/LoginPage';
import StudentDashboard from './pages/StudentDashboard';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Navigate to="/caafi" />} />
              <Route path="/caafi" element={<Login/>} />
              <Route path="/alumnos-caafi" element={<StudentDashboard/>} />
              <Route path="*" element={<h1>404</h1>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
