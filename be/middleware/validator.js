import { body, validationResult } from 'express-validator';

const cekValidasi = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Data tidak valid, cek lagi input-nya.',
      errors: errors.array().map(e => ({ field: e.path, message: e.msg }))
    });
  }
  next();
};

// Validasi form login
export const validateLogin = [
  body('email').trim().notEmpty().withMessage('Email wajib diisi').isEmail().withMessage('Format email salah'),
  body('password').notEmpty().withMessage('Password wajib diisi'),
  cekValidasi
];

// Validasi form pengajuan survey dari pengunjung
export const validateSurvey = [
  body('property_id').notEmpty().withMessage('ID properti wajib diisi').isInt({ min: 1 }).withMessage('ID properti harus angka'),
  body('name').trim().notEmpty().withMessage('Nama wajib diisi'),
  body('phone').trim().notEmpty().withMessage('No HP wajib diisi'),
  body('survey_date').notEmpty().withMessage('Tanggal survey wajib diisi').isISO8601().withMessage('Format tanggal harus YYYY-MM-DD'),
  body('survey_time').notEmpty().withMessage('Jam survey wajib diisi'),
  body('message').optional().trim(),
  cekValidasi
];

// Validasi form tambah/edit properti
export const validateProperty = [
  body('title').trim().notEmpty().withMessage('Judul properti wajib diisi'),
  body('type').trim().notEmpty().withMessage('Tipe wajib diisi').isIn(['rumah', 'ruko', 'tanah']).withMessage('Tipe harus: rumah/ruko/tanah'),
  body('price').notEmpty().withMessage('Harga wajib diisi').isNumeric().withMessage('Harga harus angka'),
  body('location').trim().notEmpty().withMessage('Lokasi wajib diisi'),
  body('description').optional().trim(),
  body('address').optional().trim(),
  body('land_area').optional({ nullable: true }).isInt({ min: 0 }).withMessage('Luas tanah harus angka'),
  body('building_area').optional({ nullable: true }).isInt({ min: 0 }).withMessage('Luas bangunan harus angka'),
  body('bedrooms').optional().isInt({ min: 0 }).withMessage('Kamar tidur harus angka'),
  body('bathrooms').optional().isInt({ min: 0 }).withMessage('Kamar mandi harus angka'),
  body('facilities').optional().trim(),
  body('map_url').optional().trim(),
  body('is_featured').optional().isBoolean().withMessage('is_featured harus true/false'),
  body('status').optional().isIn(['tersedia', 'terjual']).withMessage('Status harus: tersedia/terjual'),
  cekValidasi
];

// Validasi ubah status survey
export const validateSurveyStatus = [
  body('status').trim().notEmpty().withMessage('Status wajib diisi')
    .isIn(['baru', 'dikonfirmasi', 'dihubungi', 'selesai', 'batal', 'dibatalkan']).withMessage('Status tidak valid'),
  cekValidasi
];
