"use client";

import { useState } from "react";
import { X, Save, Home, MapPin, Layers, Sparkles, FileText, CheckCircle2 } from "lucide-react";
import { Property } from "@/types";
import { API_BASE } from "@/lib/api";

interface Props {
  property: Property | null;
  token: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PropertyFormModal({ property, token, onClose, onSuccess }: Props) {
  const isEdit = !!property;

  const [title, setTitle] = useState(property?.title || "");
  const [type, setType] = useState(property?.type || "rumah");
  const [price, setPrice] = useState(property?.price?.toString() || "");
  const [location, setLocation] = useState(property?.location || "");
  const [address, setAddress] = useState(property?.address || "");
  const [landArea, setLandArea] = useState(property?.land_area?.toString() || "");
  const [buildingArea, setBuildingArea] = useState(property?.building_area?.toString() || "");
  const [bedrooms, setBedrooms] = useState(property?.bedrooms?.toString() || "2");
  const [bathrooms, setBathrooms] = useState(property?.bathrooms?.toString() || "1");
  const [facilities, setFacilities] = useState(property?.facilities || "");
  const [description, setDescription] = useState(property?.description || "");
  const [status, setStatus] = useState(property?.status || "tersedia");
  const [isFeatured, setIsFeatured] = useState(property?.is_featured || false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const payload = {
      title,
      type,
      price: Number(price),
      location,
      address: address || null,
      land_area: landArea ? Number(landArea) : null,
      building_area: buildingArea ? Number(buildingArea) : null,
      bedrooms: Number(bedrooms) || 0,
      bathrooms: Number(bathrooms) || 0,
      facilities: facilities || null,
      description: description || null,
      status,
      is_featured: Boolean(isFeatured),
    };

    try {
      const url = isEdit
        ? `${API_BASE}/api/admin/properties/${property.id}`
        : `${API_BASE}/api/admin/properties`;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        onSuccess();
        onClose();
      } else {
        setErrorMsg(data.message || "Gagal menyimpan data properti.");
      }
    } catch {
      onSuccess();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0f1f1a]/70 flex items-center justify-center p-4">
      <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#eaf6f0] flex items-center justify-center text-[#28a870]">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0f1f1a]">
                {isEdit ? "Perbarui Data Unit" : "Tambah Unit Baru"}
              </h3>
              <p className="text-xs text-[#6a8075] mt-0.5">
                Pastikan data legalitas dan kondisi fisik unit telah diverifikasi tim Klesi.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#3d5047] hover:text-[#0f1f1a]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 mb-4 bg-red-50 text-xs text-red-800">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Kelompok 1: Info Dasar */}
          <div>
            <span className="text-xs font-bold text-[#28a870] flex items-center gap-1.5 mb-3">
              <FileText className="w-3.5 h-3.5" />
              Informasi Umum
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#0f1f1a] mb-1">
                  Nama Properti
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Rumah Kebun Parahyangan"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 bg-[#f7faf8] border border-[#cce3d7] text-sm focus:outline-none focus:border-[#28a870]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0f1f1a] mb-1">
                  Kategori Tipe
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full p-2.5 bg-[#f7faf8] border border-[#cce3d7] text-sm focus:outline-none focus:border-[#28a870]"
                >
                  <option value="rumah">Rumah</option>
                  <option value="ruko">Ruko</option>
                  <option value="tanah">Tanah</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0f1f1a] mb-1">
                  Harga Resmi (IDR)
                </label>
                <input
                  type="number"
                  required
                  placeholder="850000000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-2.5 bg-[#f7faf8] border border-[#cce3d7] text-sm focus:outline-none focus:border-[#28a870]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0f1f1a] mb-1">
                  Kawasan / Kota
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Bandung Barat"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-2.5 bg-[#f7faf8] border border-[#cce3d7] text-sm focus:outline-none focus:border-[#28a870]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0f1f1a] mb-1">
                  Status Ketersediaan
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full p-2.5 bg-[#f7faf8] border border-[#cce3d7] text-sm focus:outline-none focus:border-[#28a870]"
                >
                  <option value="tersedia">Tersedia</option>
                  <option value="terjual">Terjual</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#0f1f1a] mb-1">
                  Alamat Lengkap
                </label>
                <input
                  type="text"
                  placeholder="Jl. Kolonel Masturi No. 42"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2.5 bg-[#f7faf8] border border-[#cce3d7] text-sm focus:outline-none focus:border-[#28a870]"
                />
              </div>
            </div>
          </div>

          {/* Kelompok 2: Dimensi & Ruang */}
          <div>
            <span className="text-xs font-bold text-[#28a870] flex items-center gap-1.5 mb-3">
              <Layers className="w-3.5 h-3.5" />
              Dimensi & Spesifikasi Ruang
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0f1f1a] mb-1">
                  Luas Tanah (m²)
                </label>
                <input
                  type="number"
                  placeholder="140"
                  value={landArea}
                  onChange={(e) => setLandArea(e.target.value)}
                  className="w-full p-2.5 bg-[#f7faf8] border border-[#cce3d7] text-sm focus:outline-none focus:border-[#28a870]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0f1f1a] mb-1">
                  Luas Bangunan (m²)
                </label>
                <input
                  type="number"
                  placeholder="88"
                  value={buildingArea}
                  onChange={(e) => setBuildingArea(e.target.value)}
                  className="w-full p-2.5 bg-[#f7faf8] border border-[#cce3d7] text-sm focus:outline-none focus:border-[#28a870]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0f1f1a] mb-1">
                  Kamar Tidur
                </label>
                <input
                  type="number"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full p-2.5 bg-[#f7faf8] border border-[#cce3d7] text-sm focus:outline-none focus:border-[#28a870]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0f1f1a] mb-1">
                  Kamar Mandi
                </label>
                <input
                  type="number"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  className="w-full p-2.5 bg-[#f7faf8] border border-[#cce3d7] text-sm focus:outline-none focus:border-[#28a870]"
                />
              </div>
            </div>
          </div>

          {/* Kelompok 3: Fasilitas & Keterangan */}
          <div>
            <span className="text-xs font-bold text-[#28a870] flex items-center gap-1.5 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Kelengkapan & Deskripsi
            </span>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0f1f1a] mb-1">
                  Fasilitas & Legalitas
                </label>
                <input
                  type="text"
                  placeholder="Carport 2 Mobil, Listrik 2200W, SHM, Air PDAM"
                  value={facilities}
                  onChange={(e) => setFacilities(e.target.value)}
                  className="w-full p-2.5 bg-[#f7faf8] border border-[#cce3d7] text-sm focus:outline-none focus:border-[#28a870]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0f1f1a] mb-1">
                  Deskripsi Keunggulan Unit
                </label>
                <textarea
                  rows={3}
                  placeholder="Sirkulasi udara, view pegunungan, jarak ke pintu tol..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 bg-[#f7faf8] border border-[#cce3d7] text-sm focus:outline-none focus:border-[#28a870]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 accent-[#28a870]"
                />
                <label htmlFor="isFeatured" className="text-xs font-semibold text-[#0f1f1a]">
                  Tampilkan sebagai Unit Rekomendasi Utama (Tampil di Hero Halaman Depan)
                </label>
              </div>
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 text-sm font-bold text-white bg-[#28a870] hover:bg-[#1f8b5b] transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              {loading ? "Menyimpan Data..." : isEdit ? "Perbarui Unit" : "Simpan Unit"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-sm font-bold text-[#3d5047] bg-[#eaf6f0] hover:bg-[#d8ece1]"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
