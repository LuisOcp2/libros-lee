import { Router } from 'express';
import { pool } from '../db.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/:bookId', authenticate, async (req, res) => {
  const { rows } = await pool.query(
    'SELECT progress FROM reading_progress WHERE user_id=$1 AND book_id=$2',
    [req.user.id, req.params.bookId]
  );
  res.json({ progress: rows[0]?.progress ?? 0 });
});

router.put('/:bookId', authenticate, async (req, res) => {
  const { progress } = req.body;
  await pool.query(
    `INSERT INTO reading_progress (user_id, book_id, progress) VALUES ($1,$2,$3)
     ON CONFLICT (user_id, book_id) DO UPDATE SET progress=$3, updated_at=now()`,
    [req.user.id, req.params.bookId, progress]
  );
  res.json({ ok: true });
});

export default router;
