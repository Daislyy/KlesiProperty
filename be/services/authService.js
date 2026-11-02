import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import 'dotenv/config';

// Proses login: cek email & password, kalau cocok kasih token JWT
export const login = async (email, password) => {
  // Cari user berdasarkan email
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);

  if (rows.length === 0) {
    const err = new Error('Email atau password salah.');
    err.statusCode = 401;
    throw err;
  }

  const user = rows[0];

  // Cocokkan password yang diketik dengan hash di database
  const cocok = await bcrypt.compare(password, user.password);
  if (!cocok) {
    const err = new Error('Email atau password salah.');
    err.statusCode = 401;
    throw err;
  }

  // Buat token JWT (berlaku sesuai setting di .env)
  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );

  // Kirim token + data user (tanpa password)
  return {
    token,
    user: { id: user.id, name: user.name, email: user.email }
  };
};
