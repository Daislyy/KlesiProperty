import * as propertyService from '../services/propertyService.js';

// GET /api/properties — daftar properti + filter + pagination
export const getProperties = async (req, res, next) => {
  try {
    const { type, min_price, max_price, location, keyword, page, limit } = req.query;
    const result = await propertyService.getAllProperties(
      { type, min_price, max_price, location, keyword },
      { page, limit }
    );
    res.json({ success: true, message: 'Berhasil ambil daftar properti.', data: result.properties, pagination: result.pagination });
  } catch (err) { next(err); }
};

// GET /api/properties/featured — properti unggulan buat landing page
export const getFeaturedProperties = async (req, res, next) => {
  try {
    const data = await propertyService.getFeaturedProperties();
    res.json({ success: true, message: 'Berhasil ambil properti unggulan.', data });
  } catch (err) { next(err); }
};

// GET /api/properties/:slug — detail properti + semua fotonya
export const getPropertyBySlug = async (req, res, next) => {
  try {
    const data = await propertyService.getPropertyBySlug(req.params.slug);
    res.json({ success: true, message: 'Berhasil ambil detail properti.', data });
  } catch (err) { next(err); }
};

// POST /api/admin/properties — tambah properti baru (admin)
export const createProperty = async (req, res, next) => {
  try {
    const data = await propertyService.createProperty(req.body);
    res.status(201).json({ success: true, message: 'Properti berhasil ditambahkan.', data });
  } catch (err) { next(err); }
};

// PUT /api/admin/properties/:id — edit properti (admin)
export const updateProperty = async (req, res, next) => {
  try {
    const data = await propertyService.updateProperty(req.params.id, req.body);
    res.json({ success: true, message: 'Properti berhasil diupdate.', data });
  } catch (err) { next(err); }
};

// DELETE /api/admin/properties/:id — hapus properti (admin)
export const deleteProperty = async (req, res, next) => {
  try {
    const data = await propertyService.deleteProperty(req.params.id);
    res.json({ success: true, message: `Properti "${data.title}" berhasil dihapus.`, data });
  } catch (err) { next(err); }
};

// POST /api/admin/properties/:id/images — upload foto properti (admin)
export const uploadPropertyImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'Tidak ada foto yang diupload.' });
    }
    const data = await propertyService.addPropertyImages(req.params.id, req.files);
    res.status(201).json({ success: true, message: `${data.length} foto berhasil diupload.`, data });
  } catch (err) { next(err); }
};

// DELETE /api/admin/images/:id — hapus foto (admin)
export const deletePropertyImage = async (req, res, next) => {
  try {
    const data = await propertyService.deletePropertyImage(req.params.id);
    res.json({ success: true, message: 'Foto berhasil dihapus.', data });
  } catch (err) { next(err); }
};
