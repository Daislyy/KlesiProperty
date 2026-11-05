"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Upload, Trash2, CheckCircle2 } from "lucide-react";
import { Property } from "@/types";
import { API_BASE, resolveImageUrl } from "@/lib/api";

interface Props {
  property: Property;
  token: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ImageUploadModal({ property, token, onClose, onSuccess }: Props) {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [images, setImages] = useState(property.images || []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFiles || selectedFiles.length === 0) return;

    setUploading(true);
    setStatusMsg("");

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("images", selectedFiles[i]);
    }

    try {
      const res = await fetch(`${API_BASE}/api/admin/properties/${property.id}/images`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatusMsg("Foto berhasil diunggah.");
        setImages((prev) => [...prev, ...data.data]);
        setSelectedFiles(null);
        onSuccess();
      } else {
        setStatusMsg(data.message || "Gagal mengunggah foto.");
      }
    } catch {
      setStatusMsg("Gagal menghubungi server backend.");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (imageId: number) => {
    if (!confirm("Hapus foto ini dari galeri properti?")) return;

    try {
      const res = await fetch(`${API_BASE}/api/admin/images/${imageId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setImages((prev) => prev.filter((img) => img.id !== imageId));
        onSuccess();
      }
    } catch {
      setImages((prev) => prev.filter((img) => img.id !== imageId));
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0f1f1a]/70 flex items-center justify-center p-4">
      <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 mb-6">
          <div>
            <h3 className="text-xl font-bold text-[#0f1f1a]">
              Kelola Galeri Foto: {property.title}
            </h3>
            <p className="text-xs text-[#6a8075] mt-0.5">
              Unggah foto asli lapangan (maksimal 10 file sekaligus). Foto pertama menjadi foto sampul.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#3d5047] hover:text-[#0f1f1a]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Upload Form */}
        <form onSubmit={handleUpload} className="mb-8 p-4 bg-[#f7faf8]">
          <label className="block text-xs font-bold text-[#0f1f1a] mb-2">
            Pilih Foto dari Perangkat
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setSelectedFiles(e.target.files)}
              className="w-full text-xs text-[#3d5047] file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-bold file:bg-[#28a870] file:text-white hover:file:bg-[#1f8b5b]"
            />
            <button
              type="submit"
              disabled={uploading || !selectedFiles || selectedFiles.length === 0}
              className="px-5 py-2 text-xs font-bold text-white bg-[#0f1f1a] hover:bg-black disabled:opacity-50 transition-colors flex items-center justify-center gap-1.5 shrink-0"
            >
              <Upload className="w-3.5 h-3.5" />
              {uploading ? "Mengunggah..." : "Upload Foto"}
            </button>
          </div>

          {statusMsg && (
            <p className="text-xs font-semibold text-[#1f8b5b] mt-2 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {statusMsg}
            </p>
          )}
        </form>

        {/* Galeri Foto yang Ada */}
        <div>
          <h4 className="text-sm font-bold text-[#0f1f1a] mb-3">
            Daftar Foto Tersimpan ({images.length})
          </h4>

          {images.length === 0 ? (
            <div className="p-8 text-center bg-[#f7faf8] text-[#6a8075] text-xs">
              Belum ada foto yang diunggah. Unggah foto pertama untuk ditampilkan di halaman depan.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {images.map((img) => (
                <div key={img.id} className="relative group bg-[#e2ede7] h-36">
                  <Image
                    src={resolveImageUrl(img.image_url)}
                    alt="Foto properti"
                    fill
                    className="object-cover"
                  />
                  {img.is_primary && (
                    <span className="absolute top-2 left-2 bg-[#28a870] text-white text-[10px] font-bold px-2 py-0.5">
                      Foto Utama
                    </span>
                  )}
                  <button
                    onClick={() => handleDeleteImage(img.id)}
                    className="absolute top-2 right-2 bg-red-600 text-white p-1.5 opacity-90 hover:opacity-100 transition-opacity"
                    title="Hapus foto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-6 mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-xs font-bold text-white bg-[#0f1f1a] hover:bg-black"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
}
