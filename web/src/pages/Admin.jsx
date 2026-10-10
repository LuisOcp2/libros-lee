import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api.js';
import { useAuth } from '../context/AuthContext.jsx';

const empty = { title: '', author: '', format: 'pdf', drive_file_id: '', drive_url: '', cover_url: '' };

export default function Admin() {
  const [form, setForm] = useState(empty);
  const [books, setBooks] = useState([]);
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const load = () => api.get('/books').then((r) => setBooks(r.data));

  useEffect(() => {
    if (user?.role !== 'admin') return nav('/');
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/books', form);
      setForm(empty);
      load();
    } catch (err) {
      alert(err.response?.data?.error || 'Error al guardar');
    }
  };

  const remove = async (id) => {
    if (!confirm('¿Eliminar este libro?')) return;
    await api.delete(`/books/${id}`);
    load();
  };

  return (
    <div className="container">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Panel Admin</h1>
        <div>
          <button onClick={() => nav('/')} style={{ width: 'auto', padding: '8px 16px', marginRight: 8 }}>Biblioteca</button>
          <button onClick={logout} style={{ width: 'auto', padding: '8px 16px' }}>Salir</button>
        </div>
      </header>

      <form onSubmit={submit} className="card">
        <h3>Añadir libro</h3>
        <input placeholder="Título" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <input placeholder="Autor" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
        <select value={form.format} onChange={(e) => setForm({ ...form, format: e.target.value })}>
          <option value="pdf">PDF</option>
          <option value="epub">EPUB</option>
        </select>
        <input placeholder="Drive File ID" value={form.drive_file_id} onChange={(e) => setForm({ ...form, drive_file_id: e.target.value })} />
        <input placeholder="Drive URL (descarga directa)" value={form.drive_url} onChange={(e) => setForm({ ...form, drive_url: e.target.value })} required />
        <input placeholder="URL de portada (opcional)" value={form.cover_url} onChange={(e) => setForm({ ...form, cover_url: e.target.value })} />
        <button>Guardar libro</button>
      </form>

      <h3>Libros ({books.length})</h3>
      {books.map((b) => (
        <div key={b.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <strong>{b.title}</strong>
            <p style={{ fontSize: 12 }}>{b.author} · {b.format.toUpperCase()}</p>
          </div>
          <button onClick={() => remove(b.id)} style={{ width: 'auto', padding: '8px 12px', background: '#ef4444' }}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}
