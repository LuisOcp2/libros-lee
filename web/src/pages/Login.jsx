import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email, password });
      login(data.token, data.user);
      nav('/');
    } catch (err) {
      alert(err.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="container">
      <h1>Libros Lee</h1>
      <form onSubmit={submit} className="card">
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button>Iniciar sesión</button>
        <p><Link to="/register">¿No tienes cuenta? Regístrate</Link></p>
      </form>
    </div>
  );
}
