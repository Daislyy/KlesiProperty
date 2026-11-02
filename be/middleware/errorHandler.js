import multer from 'multer';

// Kalau URL yang diakses ga ada, kirim 404
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint tidak ditemukan: ${req.method} ${req.originalUrl}`
  });
};

// Tangkap semua error yang terjadi di aplikasi
export const errorHandler = (err, req, res, next) => {
  console.error('🔥 Error:', err.message);

  // Error dari multer (upload file)
  if (err instanceof multer.MulterError) {
    const pesan = err.code === 'LIMIT_FILE_SIZE'
      ? 'Ukuran file melebihi 2MB.'
      : `Upload error: ${err.message}`;
    return res.status(400).json({ success: false, message: pesan });
  }

  // Error format file tidak didukung
  if (err.message?.includes('Format file tidak didukung')) {
    return res.status(400).json({ success: false, message: err.message });
  }

  // Error umum
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Terjadi kesalahan di server.'
  });
};
