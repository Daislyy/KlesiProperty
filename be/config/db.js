import mysql from 'mysql2/promise';
import 'dotenv/config';

// Buat koneksi pool ke MySQL (biar bisa nampung banyak request bareng)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10
});

// Cek koneksi database pas server mulai jalan
export const testConnection = async () => {
  try {
    const conn = await pool.getConnection();
    console.log('✅ Database terhubung:', process.env.DB_NAME);
    conn.release();
  } catch (err) {
    console.error('❌ Gagal konek database:', err.message);
  }
};

export default pool;
