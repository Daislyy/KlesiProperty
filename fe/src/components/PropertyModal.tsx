"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X } from "lucide-react";
import { Property } from "@/types";
import { resolveImageUrl, formatRupiah } from "@/lib/api";

interface Props {
  property: Property | null;
  onClose: () => void;
  onSelectSurvey: (id: number) => void;
}

export default function PropertyModal({ property, onClose, onSelectSurvey }: Props) {
  if (!property) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[#0f1f1a]/70 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header Foto */}
          <div className="relative h-72 w-full bg-[#e2ede7]">
            <Image
              src={resolveImageUrl(property.primary_image)}
              alt={property.title}
              fill
              className="object-cover"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-[#0f1f1a] text-white p-2 hover:bg-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Isi Detail */}
          <div className="p-6">
            <div className="flex items-baseline justify-between gap-4 mb-2">
              <span className="text-2xl font-bold text-[#28a870]">
                {formatRupiah(property.price)}
              </span>
              <span className="text-xs font-bold bg-[#eaf6f0] text-[#28a870] px-3 py-1 capitalize">
                {property.type} / {property.status}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-[#0f1f1a] mb-2">
              {property.title}
            </h3>

            <p className="text-sm text-[#3d5047] flex items-center gap-1.5 mb-6">
              <MapPin className="w-4 h-4 text-[#28a870]" />
              {property.address || property.location}
            </p>

            {/* Grid Angka Spesifikasi */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#f7faf8] mb-6 text-sm">
              <div>
                <p className="text-xs text-[#6a8075]">Kamar Tidur</p>
                <p className="font-bold text-[#0f1f1a]">{property.bedrooms} Ruang</p>
              </div>
              <div>
                <p className="text-xs text-[#6a8075]">Kamar Mandi</p>
                <p className="font-bold text-[#0f1f1a]">{property.bathrooms} Ruang</p>
              </div>
              <div>
                <p className="text-xs text-[#6a8075]">Luas Tanah</p>
                <p className="font-bold text-[#0f1f1a]">{property.land_area || "-"} m²</p>
              </div>
              <div>
                <p className="text-xs text-[#6a8075]">Luas Bangunan</p>
                <p className="font-bold text-[#0f1f1a]">{property.building_area || "-"} m²</p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-bold text-[#0f1f1a] mb-2">
                Deskripsi Lengkap
              </h4>
              <p className="text-sm text-[#3d5047] leading-relaxed">
                {property.description || "Unit siap huni dengan struktur pondasi kuat dan instalasi saluran rapi."}
              </p>
            </div>

            {property.facilities && (
              <div className="mb-6">
                <h4 className="text-sm font-bold text-[#0f1f1a] mb-2">
                  Fasilitas & Kelengkapan
                </h4>
                <p className="text-sm text-[#3d5047] leading-relaxed">
                  {property.facilities}
                </p>
              </div>
            )}

            {/* Tombol Aksi */}
            <div className="flex gap-3 pt-6">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#survey"
                onClick={() => {
                  onSelectSurvey(property.id);
                  onClose();
                }}
                className="flex-1 py-3 text-center text-sm font-bold text-white bg-[#28a870] hover:bg-[#1f8b5b] transition-colors"
              >
                Ajukan Survey Unit Ini
              </motion.a>
              <button
                onClick={onClose}
                className="px-6 py-3 text-sm font-bold text-[#3d5047] bg-[#eaf6f0] hover:bg-[#d8ece1] transition-colors"
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
