"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, ShieldCheck, Calendar } from "lucide-react";
import { Property } from "@/types";
import { resolveImageUrl, formatRupiah } from "@/lib/api";

interface Props {
  property: Property | null;
  onClose: () => void;
  onSelectSurvey: (id: number) => void;
}

export default function PropertyModal({ property, onClose, onSelectSurvey }: Props) {
  if (!property) return null;

  // Kumpulkan semua foto yang tersedia (hingga 3 foto)
  const images =
    property.images && property.images.length > 0
      ? property.images.map((img) => img.image_url)
      : [property.primary_image || ""];

  return (
    <PropertyModalContent
      property={property}
      images={images}
      onClose={onClose}
      onSelectSurvey={onSelectSurvey}
    />
  );
}

function PropertyModalContent({
  property,
  images,
  onClose,
  onSelectSurvey,
}: {
  property: Property;
  images: string[];
  onClose: () => void;
  onSelectSurvey: (id: number) => void;
}) {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const activePhoto = images[activePhotoIdx] || property.primary_image;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[#0f1f1a]/70 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-[#dce9e1]"
        >
          {/* Foto Aktif */}
          <div className="relative h-72 sm:h-80 w-full bg-[#e2ede7] overflow-hidden">
            <Image
              src={resolveImageUrl(activePhoto)}
              alt={property.title}
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 bg-[#0f1f1a]/80 backdrop-blur-sm text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#0f1f1a] transition-colors cursor-pointer shadow-md"
              aria-label="Tutup jendela detail"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-[#28a870] text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5" />
                SHM Terverifikasi
              </span>
              <span className="bg-[#0f1f1a]/85 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1 rounded-full capitalize">
                {property.status}
              </span>
            </div>
          </div>

          {/* Thumbnails Galeri (Jika ada 2 atau 3 foto) */}
          {images.length > 1 && (
            <div className="flex gap-2.5 p-3.5 bg-[#f7faf8] border-b border-[#eaf2ee]">
              {images.map((imgUrl, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActivePhotoIdx(i)}
                  className={`relative w-20 h-14 rounded-xl overflow-hidden cursor-pointer transition-all border ${
                    activePhotoIdx === i
                      ? "ring-2 ring-[#28a870] border-transparent opacity-100"
                      : "opacity-60 hover:opacity-100 border-[#dce9e1]"
                  }`}
                >
                  <Image src={resolveImageUrl(imgUrl)} alt={`Foto ${i + 1}`} fill className="object-cover" />
                  <span className="absolute bottom-0.5 right-1 text-[9px] font-extrabold text-white bg-black/60 px-1.5 py-0.2 rounded-full">
                    {i + 1}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Isi Spesifikasi Lengkap */}
          <div className="p-6 sm:p-8">
            <div className="flex items-baseline justify-between gap-4 mb-2">
              <span className="text-2xl font-extrabold text-[#28a870] tracking-tight">
                {formatRupiah(property.price)}
              </span>
              <span className="text-xs font-bold bg-[#eaf6f0] text-[#1f8b5b] px-3 py-1 rounded-full capitalize border border-[#cce3d7]">
                Tipe: {property.type}
              </span>
            </div>

            <h3 className="text-xl font-bold text-[#0f1f1a] mb-2">
              {property.title}
            </h3>

            <p className="text-xs text-[#6a8075] flex items-center gap-1.5 mb-6">
              <MapPin className="w-4 h-4 text-[#28a870] shrink-0" />
              <span>{property.address || property.location}</span>
            </p>

            {/* Matriks Ukuran */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-[#f7faf8] rounded-2xl mb-6 text-xs text-[#3d5047] border border-[#edf3f0]">
              <div>
                <p className="text-[10px] text-[#6a8075]">Kamar Tidur</p>
                <p className="font-bold text-sm text-[#0f1f1a]">{property.bedrooms} Ruang</p>
              </div>
              <div>
                <p className="text-[10px] text-[#6a8075]">Kamar Mandi</p>
                <p className="font-bold text-sm text-[#0f1f1a]">{property.bathrooms} Ruang</p>
              </div>
              <div>
                <p className="text-[10px] text-[#6a8075]">Luas Tanah</p>
                <p className="font-bold text-sm text-[#0f1f1a]">{property.land_area || "-"} m²</p>
              </div>
              <div>
                <p className="text-[10px] text-[#6a8075]">Luas Bangunan</p>
                <p className="font-bold text-sm text-[#0f1f1a]">{property.building_area || "-"} m²</p>
              </div>
            </div>

            {/* Deskripsi */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-[#0f1f1a] mb-2">
                Deskripsi Kondisi Fisik
              </h4>
              <p className="text-xs sm:text-sm text-[#3d5047] leading-relaxed">
                {property.description || "Unit siap huni dengan struktur pondasi kokoh dan instalasi saluran rapi."}
              </p>
            </div>

            {/* Fasilitas */}
            {property.facilities && (
              <div className="mb-8">
                <h4 className="text-xs font-bold text-[#0f1f1a] mb-2">
                  Fasilitas & Kelengkapan Hukum
                </h4>
                <p className="text-xs sm:text-sm text-[#3d5047] leading-relaxed p-4 bg-[#f7faf8] rounded-2xl border border-[#edf3f0]">
                  {property.facilities}
                </p>
              </div>
            )}

            {/* Tombol Aksi Pill */}
            <div className="flex gap-3 pt-4 border-t border-[#f0f5f2]">
              <button
                type="button"
                onClick={() => {
                  onSelectSurvey(property.id);
                  onClose();
                }}
                className="flex-1 py-3 text-center text-xs font-bold text-white bg-[#28a870] hover:bg-[#1f8b5b] rounded-full transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Pilih Survey Unit Ini</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-xs font-bold text-[#3d5047] bg-[#eaf6f0] hover:bg-[#d8ece1] rounded-full transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
