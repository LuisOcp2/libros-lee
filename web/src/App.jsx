import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Library from './pages/Library.jsx';
import Reader from './pages/Reader.jsx';
import Admin from './pages/Admin.jsx';

export default function App() {
  const { token, user } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={token ? <Library /> : <Navigate to="/login" />} />
      <Route path="/read/:id" element={token ? <Reader /> : <Navigate to="/login" />} />
      <Route path="/admin" element={token && user?.role === 'admin' ? <Admin /> : <Navigate to="/" />} />
    </Routes>
  );
}
