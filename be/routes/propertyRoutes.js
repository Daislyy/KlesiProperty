import { Router } from 'express';
import { getProperties, getFeaturedProperties, getPropertyBySlug } from '../controllers/propertyController.js';

const router = Router();

router.get('/', getProperties);                // GET /api/properties
router.get('/featured', getFeaturedProperties); // GET /api/properties/featured (taruh sebelum /:slug biar ga bentrok)
router.get('/:slug', getPropertyBySlug);        // GET /api/properties/:slug

export default router;
