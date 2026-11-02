import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

import { testConnection } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import surveyRoutes from './routes/surveyRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware dasar
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Cek apakah server jalan
app.get('/', (req, res) => {
  res.json({ success: true, message: 'API IS RUNNING' });
});

// Pasang semua rute
app.use('/api/auth', authRoutes);           
app.use('/api/properties', propertyRoutes);  
app.use('/api/surveys', surveyRoutes);      
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/admin', adminRoutes); 

// Tangani 404 & error
app.use(notFoundHandler);
app.use(errorHandler);

// Jalankan server
const start = async () => {
  await testConnection();
  app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
  });
};

start();
