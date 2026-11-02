import jwt from 'jsonwebtoken';
import 'dotenv/config';

// Cek apakah request punya token JWT yang valid
export const verifyToken = (req, res, next) => {
  try {
    const header = req.headers['authorization'];

    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Token tidak ditemukan. Pakai format: Bearer <token>'
      });
    }

    // Ambil token dari header, lalu verifikasi
    const token = header.split(' ')[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: 'Token tidak valid atau sudah expired.'
    });
  }
};
