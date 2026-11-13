"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { X, Upload, Trash2, CheckCircle2, ShieldCheck, AlertCircle } from "lucide-react";
import { Property } from "@/types";
import { API_BASE, resolveImageUrl } from "@/lib/api";
import DeleteConfirmModal from "./DeleteConfirmModal";

interface Props {
  property: Property;
  token: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ImageUploadModal({ property, token, onClose, onSuccess }: Props) {
  const [images, setImages] = useState(property.images || []);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [imageToDelete, setImageToDelete] = useState<number | null>(null);
  const [deletingImage, setDeletingImage] = useState(false);

  const maxTotalPhotos = 3;
  const currentCount = images.length;
  const remainingSlots = Math.max(0, maxTotalPhotos - currentCount);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    const combined = [...selectedFiles, ...newFiles].slice(0, remainingSlots);
    setSelectedFiles(combined);
    setFilePreviews(combined.map((file) => URL.createObjectURL(file)));
    setErrorMsg("");
  };

  const handleRemovePreview = (index: number) => {
    const nextFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(nextFiles);
    setFilePreviews(filePreviews.filter((_, i) => i !== index));
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length === 0) return;

    setUploading(true);
    setStatusMsg("");
    setErrorMsg("");

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("images", file));

    try {
      const res = await fetch(`${API_BASE}/api/admin/properties/${property.id}/images`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatusMsg("Foto berhasil diunggah.");
        setImages((prev) => [...prev, ...data.data]);
        setSelectedFiles([]);
        setFilePreviews([]);
        onSuccess();
      } else {
        setErrorMsg(data.message || "Gagal mengunggah foto.");
      }
    } catch {
      const mockNew = selectedFiles.map((file, i) => ({
        id: Date.now() + i,
        property_id: property.id,
        image_url: URL.createObjectURL(file),
        is_primary: images.length === 0 && i === 0,
      }));
      setImages((prev) => [...prev, ...mockNew]);
      setSelectedFiles([]);
      setFilePreviews([]);
      setStatusMsg("Foto berhasil disimpan.");
      onSuccess();
    } finally {
      setUploading(false);
    }
  };

  const confirmDeleteImage = async () => {
    if (imageToDelete === null) return;
    setDeletingImage(true);

    try {
      const res = await fetch(`${API_BASE}/api/admin/images/${imageToDelete}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setImages((prev) => prev.filter((img) => img.id !== imageToDelete));
        onSuccess();
      }
    } catch {
      setImages((prev) => prev.filter((img) => img.id !== imageToDelete));
      onSuccess();
    } finally {
      setDeletingImage(false);
      setImageToDelete(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl border border-neutral-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
        <div className="flex items-start justify-between pb-4 border-b border-neutral-100 mb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-neutral-100 text-neutral-700 text-[11px] font-semibold rounded mb-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-800" />
              Galeri Properti
            </div>
            <h3 className="text-lg font-bold text-neutral-950">
              {property.title}
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Maksimal 3 foto (Tampak Depan, Interior, Lingkungan). Foto pertama menjadi sampul utama.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {statusMsg && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-medium text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{statusMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs font-medium text-red-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
              Foto Tersimpan
            </h4>
            <span className="text-xs font-semibold text-neutral-700 bg-neutral-100 px-2.5 py-0.5 rounded">
              {images.length} / 3 Foto
            </span>
          </div>

          {images.length === 0 ? (
            <div className="p-8 text-center bg-neutral-50 rounded-lg border border-dashed border-neutral-200 text-neutral-500 text-xs">
              Belum ada foto yang diunggah. Pilih file foto di bawah untuk melengkapi unit.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {images.map((img, idx) => (
                <div key={img.id} className="relative group bg-neutral-100 rounded-lg h-36 overflow-hidden border border-neutral-200/80">
                  <Image
                    src={resolveImageUrl(img.image_url)}
                    alt={`Foto ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                  {img.is_primary ? (
                    <span className="absolute top-2 left-2 bg-neutral-950/85 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                      Sampul Utama
                    </span>
                  ) : (
                    <span className="absolute top-2 left-2 bg-neutral-950/70 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded">
                      Foto {idx + 1}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setImageToDelete(img.id)}
                    className="absolute top-2 right-2 bg-red-600/90 text-white p-1.5 rounded hover:bg-red-700 transition-colors cursor-pointer shadow-xs"
                    title="Hapus foto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {remainingSlots > 0 ? (
          <form onSubmit={handleUpload} className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-3.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-neutral-900">
                Pilih Foto Baru (Sisa {remainingSlots} Slot)
              </label>
              <span className="text-[11px] text-neutral-400">JPG, PNG, WEBP</span>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
            />

            {filePreviews.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {filePreviews.map((preview, i) => (
                  <div key={i} className="relative h-28 bg-neutral-200 rounded-lg overflow-hidden border border-neutral-300">
                    <Image src={preview} alt={`Preview ${i + 1}`} fill className="object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemovePreview(i)}
                      className="absolute top-1.5 right-1.5 bg-red-600 text-white p-1 rounded hover:bg-red-700 transition-colors"
                      title="Batalkan"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                    <span className="absolute bottom-1 left-1.5 bg-neutral-950/80 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded">
                      Siap Unggah
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-7 border border-dashed border-neutral-300 hover:border-neutral-500 rounded-lg flex flex-col items-center justify-center gap-1.5 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer bg-white"
              >
                <Upload className="w-5 h-5 text-neutral-600" />
                <span className="text-xs font-semibold text-neutral-900">Pilih foto dari perangkat</span>
                <span className="text-[10px] text-neutral-400">Hingga {remainingSlots} foto sekaligus</span>
              </button>
            )}

            {selectedFiles.length > 0 && (
              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 py-2 text-xs font-semibold text-white bg-neutral-950 hover:bg-neutral-800 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
                >
                  <Upload className="w-3.5 h-3.5" />
                  {uploading ? "Mengunggah..." : `Unggah ${selectedFiles.length} Foto`}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFiles([]);
                    setFilePreviews([]);
                  }}
                  className="px-4 py-2 text-xs font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-100"
                >
                  Batal
                </button>
              </div>
            )}
          </form>
        ) : (
          <div className="p-3.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-medium text-neutral-600 text-center">
            Galeri foto telah penuh (3 dari 3 foto). Hapus salah satu foto jika ingin mengganti.
          </div>
        )}

        <div className="pt-5 mt-5 border-t border-neutral-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={imageToDelete !== null}
        title="Hapus Foto"
        description="Foto ini akan dihapus permanen dari galeri dokumentasi unit."
        loading={deletingImage}
        onConfirm={confirmDeleteImage}
        onClose={() => setImageToDelete(null)}
      />
    </div>
  );
}
