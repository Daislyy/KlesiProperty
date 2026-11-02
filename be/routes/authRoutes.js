import { Router } from 'express';
import { login } from '../controllers/authController.js';
import { validateLogin } from '../middleware/validator.js';

const router = Router();

// POST /api/auth/login
router.post('/login', validateLogin, login);

export default router;
