import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/register', form);
      login(data.token, data.user);
      nav('/');
    } catch (err) {
      alert(err.response?.data?.error || 'Error al registrarse');
    }
  };

  return (
    <div className="container">
      <h1>Crear cuenta</h1>
      <form onSubmit={submit} className="card">
        <input placeholder="Nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Contraseña" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button>Registrarse</button>
        <p><Link to="/login">¿Ya tienes cuenta? Inicia sesión</Link></p>
      </form>
    </div>
  );
}
