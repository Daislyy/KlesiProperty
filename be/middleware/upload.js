import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Folder tempat menyimpano foto upload
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const nama = `property-${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, nama + path.extname(file.originalname).toLowerCase());
  }
});

const fileFilter = (req, file, cb) => {
  const boleh = ['image/jpeg', 'image/png', 'image/webp'];
  if (boleh.includes(file.mimetype)) cb(null, true);
  else cb(new Error('Format file tidak didukung! Hanya JPG, PNG, WEBP.'), false);
};

// Limit size multer 2mb
export const uploadPropertyImages = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }
});
