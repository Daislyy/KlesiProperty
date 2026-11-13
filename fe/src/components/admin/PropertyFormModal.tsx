"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { X, Save, Home, Upload, Trash2, Star } from "lucide-react";
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
  const [bedrooms, setBedrooms] = useState(property?.bedrooms?.toString() || "3");
  const [bathrooms, setBathrooms] = useState(property?.bathrooms?.toString() || "2");
  const [facilities, setFacilities] = useState(property?.facilities || "");
  const [description, setDescription] = useState(property?.description || "");
  const [status, setStatus] = useState(property?.status || "tersedia");
  const [isFeatured, setIsFeatured] = useState<boolean>(Boolean(property?.is_featured));

  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    const combinedFiles = [...selectedPhotos, ...newFiles].slice(0, 3);
    setSelectedPhotos(combinedFiles);
    setPhotoPreviews(combinedFiles.map((file) => URL.createObjectURL(file)));
  };

  const handleRemovePhoto = (index: number) => {
    setSelectedPhotos((prev) => prev.filter((_, i) => i !== index));
    setPhotoPreviews((prev) => prev.filter((_, i) => i !== index));
  };

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
      is_featured: isFeatured,
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

      const resData = await res.json();
      const targetPropertyId = isEdit ? property.id : resData?.data?.id;

      if (selectedPhotos.length > 0 && targetPropertyId) {
        const formData = new FormData();
        selectedPhotos.forEach((file) => formData.append("images", file));

        await fetch(`${API_BASE}/api/admin/properties/${targetPropertyId}/images`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
      }

      onSuccess();
      onClose();
    } catch {
      onSuccess();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl border border-neutral-200 max-w-3xl w-full max-h-[92vh] overflow-y-auto p-6 shadow-2xl">
        <div className="flex items-start justify-between pb-4 border-b border-neutral-100 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-800">
              <Home className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-950">
                {isEdit ? "Perbarui Data Properti" : "Tambah Properti Baru"}
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Pastikan data legalitas SHM dan spesifikasi fisik sesuai hasil survei lapangan.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-lg text-xs font-medium text-red-800">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
              1. Identitas & Legalitas Unit
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Judul Properti
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Rumah Kebun Parahyangan"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Tipe Properti
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full p-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
                >
                  <option value="rumah">Rumah</option>
                  <option value="tanah">Tanah</option>
                  <option value="ruko">Komersial</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Harga Resmi (IDR)
                </label>
                <input
                  type="number"
                  required
                  placeholder="850000000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Kawasan / Kota
                </label>
                <input
                  type="text"
                  required
                  list="lokasi-rekomendasi"
                  placeholder="Cilodong, Depok"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
                />
                <datalist id="lokasi-rekomendasi">
                  <option value="Cilodong, Depok" />
                  <option value="Depok" />
                  <option value="Bogor" />
                  <option value="Jakarta" />
                  <option value="Bekasi" />
                  <option value="Tangerang" />
                </datalist>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full p-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
                >
                  <option value="tersedia">Tersedia</option>
                  <option value="terjual">Terjual</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                Alamat Lengkap Unit
              </label>
              <input
                type="text"
                placeholder="Jl. Raya Cilodong No. 12, Kota Depok"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
              />
            </div>
          </div>

          <div className="space-y-3.5 pt-4 border-t border-neutral-100">
            <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
              2. Spesifikasi Fisik & Fasilitas
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Luas Tanah (m²)
                </label>
                <input
                  type="number"
                  placeholder="140"
                  value={landArea}
                  onChange={(e) => setLandArea(e.target.value)}
                  className="w-full p-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Luas Bangunan (m²)
                </label>
                <input
                  type="number"
                  placeholder="88"
                  value={buildingArea}
                  onChange={(e) => setBuildingArea(e.target.value)}
                  className="w-full p-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Kamar Tidur
                </label>
                <input
                  type="number"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full p-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Kamar Mandi
                </label>
                <input
                  type="number"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  className="w-full p-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                Fasilitas & Legalitas Tambahan
              </label>
              <input
                type="text"
                placeholder="SHM Murni, Listrik 2200W, Air PDAM, Carport 2 Mobil, ROW Jalan 7M"
                value={facilities}
                onChange={(e) => setFacilities(e.target.value)}
                className="w-full p-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                Deskripsi Kondisi
              </label>
              <textarea
                rows={3}
                placeholder="Catatan orientasi hadap rumah, ventilasi, pencahayaan, atau renovasi..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 bg-amber-50/60 border border-amber-200 rounded-xl">
              <div className="flex items-center gap-2.5">
                <Star
                  className={`w-4 h-4 ${
                    isFeatured ? "text-amber-500 fill-amber-500" : "text-neutral-400"
                  }`}
                />
                <div>
                  <p className="text-xs font-semibold text-neutral-950">
                    Properti Unggulan (Hero Section)
                  </p>
                  <p className="text-[11px] text-neutral-500">
                    Tampilkan sebagai sorotan utama di bagian Hero Landing Page.
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neutral-950"></div>
              </label>
            </div>
          </div>

          <div className="space-y-3.5 pt-4 border-t border-neutral-100">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                  3. Foto Dokumentasi Unit (Maksimal 3 Foto)
                </h4>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  Foto asli lapangan (JPG, PNG, WEBP). Foto pertama menjadi sampul.
                </p>
              </div>
              <span className="text-xs font-semibold text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded">
                {selectedPhotos.length} / 3 Foto
              </span>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoSelect}
              multiple
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[0, 1, 2].map((slotIdx) => {
                const preview = photoPreviews[slotIdx];
                const labels = ["Tampak Depan", "Ruang Utama", "Akses / Jalan"];

                return (
                  <div
                    key={slotIdx}
                    className="relative bg-neutral-50 border border-dashed border-neutral-300 rounded-lg h-28 flex flex-col items-center justify-center p-2 text-center overflow-hidden"
                  >
                    {preview ? (
                      <>
                        <Image
                          src={preview}
                          alt={`Preview ${slotIdx + 1}`}
                          fill
                          className="object-cover"
                        />
                        <span className="absolute top-1.5 left-1.5 bg-neutral-950/80 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded">
                          {labels[slotIdx]}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(slotIdx)}
                          className="absolute top-1.5 right-1.5 bg-red-600 text-white p-1 rounded hover:bg-red-700 transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={selectedPhotos.length >= 3}
                        className="w-full h-full flex flex-col items-center justify-center gap-1 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
                      >
                        <Upload className="w-4 h-4 text-neutral-500" />
                        <span className="text-[11px] font-semibold text-neutral-800">
                          {labels[slotIdx]}
                        </span>
                        <span className="text-[9px] text-neutral-400">JPG, PNG maks 2MB</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-2.5 pt-4 border-t border-neutral-100">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2 text-xs font-semibold text-white bg-neutral-950 hover:bg-neutral-800 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{loading ? "Menyimpan Data..." : "Simpan Properti"}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
