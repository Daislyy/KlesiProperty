import { Router } from 'express';
import { verifyToken } from '../middleware/auth.js';
import { uploadPropertyImages } from '../middleware/upload.js';
import { validateProperty, validateSurveyStatus } from '../middleware/validator.js';
import * as propertyCtrl from '../controllers/propertyController.js';
import * as surveyCtrl from '../controllers/surveyController.js';

const router = Router();

// Semua rute di bawah ini butuh token JWT (harus login dulu)
router.use(verifyToken);

// --- Kelola Properti ---
router.post('/properties', validateProperty, propertyCtrl.createProperty);
router.put('/properties/:id', validateProperty, propertyCtrl.updateProperty);
router.delete('/properties/:id', propertyCtrl.deleteProperty);

// --- Kelola Foto Properti ---
router.post('/properties/:id/images', uploadPropertyImages.array('images', 10), propertyCtrl.uploadPropertyImages);
router.delete('/images/:id', propertyCtrl.deletePropertyImage);

// --- Kelola Survey ---
router.get('/surveys', surveyCtrl.getAllSurveys);
router.patch('/surveys/:id/status', validateSurveyStatus, surveyCtrl.updateSurveyStatus);

export default router;
