import { Router } from 'express';
import { pool } from '../db.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, async (_req, res) => {
  const { rows } = await pool.query('SELECT id, title, author, format, cover_url, drive_url FROM books ORDER BY title');
  res.json(rows);
});

router.post('/', authenticate, requireAdmin, async (req, res) => {
  const { title, author, format, drive_file_id, drive_url, cover_url } = req.body;
  const { rows } = await pool.query(
    'INSERT INTO books (title, author, format, drive_file_id, drive_url, cover_url) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
    [title, author, format, drive_file_id, drive_url, cover_url]
  );
  res.status(201).json(rows[0]);
});

router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  await pool.query('DELETE FROM books WHERE id=$1', [req.params.id]);
  res.status(204).end();
});

export default router;
