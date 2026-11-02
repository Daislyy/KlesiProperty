import pool from '../config/db.js';

// Ambil semua testimoni untuk ditampilkan di landing page
export const getTestimonials = async () => {
  const [rows] = await pool.query('SELECT id, buyer_name, content, rating FROM testimonials ORDER BY id DESC');
  return rows;
};
