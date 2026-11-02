import slugify from 'slugify';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Buat slug unik dari judul
const buatSlugUnik = async (title, excludeId = null) => {
  const base = slugify(title, { lower: true, strict: true });
  let slug = base;
  let angka = 1;

  while (true) {
    const query = excludeId
      ? 'SELECT id FROM properties WHERE slug = ? AND id != ?'
      : 'SELECT id FROM properties WHERE slug = ?';
    const values = excludeId ? [slug, excludeId] : [slug];
    const [rows] = await pool.query(query, values);

    if (rows.length === 0) return slug;
    slug = `${base}-${angka++}`;
  }
};

// Hapus file gambar dari folder uploads
const hapusFile = (imageUrl) => {
  if (!imageUrl?.startsWith('/uploads/')) return;
  const filePath = path.join(__dirname, '..', imageUrl);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
};

// Ambil daftar properti + filter + pagination
export const getAllProperties = async (filters, pagination) => {
  const page = Math.max(1, parseInt(pagination.page) || 1);
  const limit = Math.max(1, parseInt(pagination.limit) || 10);
  const offset = (page - 1) * limit;

  const where = [];
  const values = [];

  if (filters.type)      { where.push('p.type = ?');       values.push(filters.type); }
  if (filters.min_price) { where.push('p.price >= ?');      values.push(Number(filters.min_price)); }
  if (filters.max_price) { where.push('p.price <= ?');      values.push(Number(filters.max_price)); }
  if (filters.location)  { where.push('p.location LIKE ?'); values.push(`%${filters.location}%`); }
  if (filters.keyword) {
    where.push('(p.title LIKE ? OR p.description LIKE ? OR p.address LIKE ?)');
    values.push(`%${filters.keyword}%`, `%${filters.keyword}%`, `%${filters.keyword}%`);
  }

  const whereSQL = where.length ? `WHERE ${where.join(' AND ')}` : '';

  const [countResult] = await pool.query(`SELECT COUNT(*) AS total FROM properties p ${whereSQL}`, values);
  const total = countResult[0].total;

  const [properties] = await pool.query(`
    SELECT p.*,
      (SELECT image_url FROM property_images WHERE property_id = p.id AND is_primary = TRUE LIMIT 1) AS primary_image
    FROM properties p ${whereSQL}
    ORDER BY p.created_at DESC LIMIT ? OFFSET ?
  `, [...values, limit, offset]);

  return {
    properties,
    pagination: { currentPage: page, limit, total, totalPages: Math.ceil(total / limit) }
  };
};

// Ambil properti unggulan
export const getFeaturedProperties = async () => {
  const [rows] = await pool.query(`
    SELECT p.*,
      (SELECT image_url FROM property_images WHERE property_id = p.id AND is_primary = TRUE LIMIT 1) AS primary_image
    FROM properties p
    WHERE p.is_featured = TRUE AND p.status = 'tersedia'
    ORDER BY p.created_at DESC LIMIT 6
  `);
  return rows;
};

// Ambil detail properti berdasarkan slug
export const getPropertyBySlug = async (slug) => {
  const [rows] = await pool.query('SELECT * FROM properties WHERE slug = ? LIMIT 1', [slug]);
  if (rows.length === 0) {
    const err = new Error('Properti tidak ditemukan.');
    err.statusCode = 404;
    throw err;
  }

  const property = rows[0];
  const [images] = await pool.query(
    'SELECT id, image_url, is_primary FROM property_images WHERE property_id = ? ORDER BY is_primary DESC',
    [property.id]
  );

  return { ...property, images };
};

// Tambah properti baru
export const createProperty = async (data) => {
  const slug = await buatSlugUnik(data.title);

  const [result] = await pool.query(`
    INSERT INTO properties 
      (title, slug, description, type, price, location, address,
       land_area, building_area, bedrooms, bathrooms, facilities,
       map_url, is_featured, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    data.title, slug, data.description || null, data.type, data.price,
    data.location, data.address || null, data.land_area || null,
    data.building_area || null, data.bedrooms || 0, data.bathrooms || 0,
    data.facilities || null, data.map_url || null, data.is_featured || false,
    data.status || 'tersedia'
  ]);

  const [rows] = await pool.query('SELECT * FROM properties WHERE id = ?', [result.insertId]);
  return rows[0];
};

// Update properti
export const updateProperty = async (id, data) => {
  const [existing] = await pool.query('SELECT * FROM properties WHERE id = ?', [id]);
  if (existing.length === 0) {
    const err = new Error('Properti tidak ditemukan.');
    err.statusCode = 404;
    throw err;
  }

  const lama = existing[0];
  const final = {
    title:         data.title ?? lama.title,
    description:   data.description ?? lama.description,
    type:          data.type ?? lama.type,
    price:         data.price ?? lama.price,
    location:      data.location ?? lama.location,
    address:       data.address ?? lama.address,
    land_area:     data.land_area ?? lama.land_area,
    building_area: data.building_area ?? lama.building_area,
    bedrooms:      data.bedrooms ?? lama.bedrooms,
    bathrooms:     data.bathrooms ?? lama.bathrooms,
    facilities:    data.facilities ?? lama.facilities,
    map_url:       data.map_url ?? lama.map_url,
    is_featured:   data.is_featured ?? lama.is_featured,
    status:        data.status ?? lama.status,
  };

  const slug = final.title !== lama.title ? await buatSlugUnik(final.title, id) : lama.slug;

  await pool.query(`
    UPDATE properties SET
      title=?, slug=?, description=?, type=?, price=?, location=?, address=?,
      land_area=?, building_area=?, bedrooms=?, bathrooms=?, facilities=?,
      map_url=?, is_featured=?, status=?
    WHERE id = ?
  `, [
    final.title, slug, final.description, final.type, final.price,
    final.location, final.address, final.land_area, final.building_area,
    final.bedrooms, final.bathrooms, final.facilities,
    final.map_url, final.is_featured, final.status, id
  ]);

  const [updated] = await pool.query('SELECT * FROM properties WHERE id = ?', [id]);
  return updated[0];
};

// Hapus properti
export const deleteProperty = async (id) => {
  const [rows] = await pool.query('SELECT id, title FROM properties WHERE id = ?', [id]);
  if (rows.length === 0) {
    const err = new Error('Properti tidak ditemukan.');
    err.statusCode = 404;
    throw err;
  }

  const [images] = await pool.query('SELECT image_url FROM property_images WHERE property_id = ?', [id]);
  images.forEach(img => hapusFile(img.image_url));

  await pool.query('DELETE FROM properties WHERE id = ?', [id]);
  return { id, title: rows[0].title };
};

// Upload foto properti
export const addPropertyImages = async (propertyId, files) => {
  const [props] = await pool.query('SELECT id FROM properties WHERE id = ?', [propertyId]);
  if (props.length === 0) {
    files.forEach(f => { if (fs.existsSync(f.path)) fs.unlinkSync(f.path); });
    const err = new Error('Properti tidak ditemukan.');
    err.statusCode = 404;
    throw err;
  }

  const [existing] = await pool.query('SELECT id, is_primary FROM property_images WHERE property_id = ?', [propertyId]);
  const sudahAdaPrimary = existing.some(img => img.is_primary);

  const hasil = [];
  for (let i = 0; i < files.length; i++) {
    const imageUrl = `/uploads/${files[i].filename}`;
    const isPrimary = !sudahAdaPrimary && i === 0;

    const [result] = await pool.query(
      'INSERT INTO property_images (property_id, image_url, is_primary) VALUES (?, ?, ?)',
      [propertyId, imageUrl, isPrimary]
    );

    hasil.push({ id: result.insertId, property_id: Number(propertyId), image_url: imageUrl, is_primary: isPrimary });
  }

  return hasil;
};

// Hapus satu foto properti
export const deletePropertyImage = async (imageId) => {
  const [rows] = await pool.query('SELECT * FROM property_images WHERE id = ?', [imageId]);
  if (rows.length === 0) {
    const err = new Error('Foto tidak ditemukan.');
    err.statusCode = 404;
    throw err;
  }

  const foto = rows[0];
  hapusFile(foto.image_url);
  await pool.query('DELETE FROM property_images WHERE id = ?', [imageId]);

  if (foto.is_primary) {
    const [sisa] = await pool.query(
      'SELECT id FROM property_images WHERE property_id = ? ORDER BY id ASC LIMIT 1',
      [foto.property_id]
    );
    if (sisa.length > 0) {
      await pool.query('UPDATE property_images SET is_primary = TRUE WHERE id = ?', [sisa[0].id]);
    }
  }

  return { id: imageId, property_id: foto.property_id };
};
