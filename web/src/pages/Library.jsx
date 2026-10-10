import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Library() {
  const [books, setBooks] = useState([]);
  const { user, logout } = useAuth();

  useEffect(() => {
    api.get('/books').then((r) => setBooks(r.data));
  }, []);

  return (
    <div className="container">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Mi biblioteca</h1>
        <button onClick={logout} style={{ width: 'auto', padding: '8px 16px' }}>Salir</button>
      </header>
      {books.map((b) => (
        <div key={b.id} className="card">
          <h3>{b.title}</h3>
          <p>{b.author} · {b.format.toUpperCase()}</p>
          <Link to={`/read/${b.id}`}><button>Abrir</button></Link>
        </div>
      ))}
      {books.length === 0 && <p>No hay libros aún. Un admin puede añadirlos desde la API.</p>}
    </div>
  );
}
