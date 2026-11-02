import * as surveyService from '../services/surveyService.js';

// POST /api/surveys — pengunjung ajukan jadwal survey
export const createSurvey = async (req, res, next) => {
  try {
    const data = await surveyService.createSurveyRequest(req.body);
    res.status(201).json({ success: true, message: 'Pengajuan survey berhasil dikirim.', data });
  } catch (err) { next(err); }
};

// GET /api/admin/surveys — lihat semua pengajuan survey (admin)
export const getAllSurveys = async (req, res, next) => {
  try {
    const data = await surveyService.getAllSurveys(req.query.status);
    res.json({ success: true, message: 'Berhasil ambil daftar survey.', data });
  } catch (err) { next(err); }
};

// PATCH /api/admin/surveys/:id/status — ubah status survey (admin)
export const updateSurveyStatus = async (req, res, next) => {
  try {
    const data = await surveyService.updateSurveyStatus(req.params.id, req.body.status);
    res.json({ success: true, message: `Status survey diubah jadi "${req.body.status}".`, data });
  } catch (err) { next(err); }
};
