import pool from '../config/db.js';

// Simpan pengajuan survey dari pengunjung
export const createSurveyRequest = async (data) => {
  // Cek dulu propertinya ada atua engga
  const [props] = await pool.query('SELECT id, title FROM properties WHERE id = ?', [data.property_id]);
  if (props.length === 0) {
    const err = new Error('Properti yang dipilih tidak ditemukan.');
    err.statusCode = 404;
    throw err;
  }

  const [result] = await pool.query(`
    INSERT INTO survey_requests (property_id, name, phone, survey_date, survey_time, message, status)
    VALUES (?, ?, ?, ?, ?, ?, 'baru')
  `, [data.property_id, data.name, data.phone, data.survey_date, data.survey_time, data.message || null]);

  const [rows] = await pool.query('SELECT * FROM survey_requests WHERE id = ?', [result.insertId]);
  return { ...rows[0], property_title: props[0].title };
};

// Ambil semua pengajuan survey (bisa difilter berdasarkan status)
export const getAllSurveys = async (statusFilter) => {
  let query = `
    SELECT s.*, p.title AS property_title, p.slug AS property_slug, p.location AS property_location
    FROM survey_requests s
    LEFT JOIN properties p ON p.id = s.property_id
  `;

  const values = [];
  if (statusFilter) {
    query += ' WHERE s.status = ?';
    values.push(statusFilter);
  }
  query += ' ORDER BY s.created_at DESC';

  const [rows] = await pool.query(query, values);
  return rows;
};

// Ubah status pengajuan survey (baru -> dikonfirmasi -> selesai / dibatalkan)
export const updateSurveyStatus = async (id, status) => {
  const [existing] = await pool.query('SELECT id FROM survey_requests WHERE id = ?', [id]);
  if (existing.length === 0) {
    const err = new Error('Pengajuan survey tidak ditemukan.');
    err.statusCode = 404;
    throw err;
  }

  await pool.query('UPDATE survey_requests SET status = ? WHERE id = ?', [status, id]);

  const [rows] = await pool.query(`
    SELECT s.*, p.title AS property_title
    FROM survey_requests s
    LEFT JOIN properties p ON p.id = s.property_id
    WHERE s.id = ?
  `, [id]);

  return rows[0];
};
