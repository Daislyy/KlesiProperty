import { Router } from 'express';
import { createSurvey } from '../controllers/surveyController.js';
import { validateSurvey } from '../middleware/validator.js';

const router = Router();

// POST /api/surveys
router.post('/', validateSurvey, createSurvey);

export default router;
