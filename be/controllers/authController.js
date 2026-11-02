import * as authService from '../services/authService.js';

// POST /api/auth/login — login admin
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await authService.login(email, password);
    res.json({ success: true, message: 'Login berhasil.', data });
  } catch (err) {
    next(err);
  }
};
