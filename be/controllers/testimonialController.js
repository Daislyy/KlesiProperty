import * as testimonialService from '../services/testimonialService.js';

// GET /api/testimonials — ambil daftar testimoni
export const getTestimonials = async (req, res, next) => {
  try {
    const data = await testimonialService.getTestimonials();
    res.json({ success: true, message: 'Berhasil ambil testimoni.', data });
  } catch (err) { next(err); }
};
