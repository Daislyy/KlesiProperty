"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Bed, Bath, Maximize2, ShieldCheck, ArrowUpRight, Calendar } from "lucide-react";
import { Property } from "@/types";
import { resolveImageUrl, formatRupiah } from "@/lib/api";

interface Props {
  property: Property;
  index: number;
  onDetail: (p: Property) => void;
  onSurvey: (id: number) => void;
}

export default function PropertyCard({ property, index, onDetail, onSurvey }: Props) {
  // Estimasi cicilan KPR (DP 20%, tenor 15 tahun, suku bunga 6.5%)
  const principal = property.price * 0.8;
  const rate = 0.065 / 12;
  const months = 180;
  const estInstallment =
    principal > 0
      ? (principal * (rate * Math.pow(1 + rate, months))) / (Math.pow(1 + rate, months) - 1)
      : 0;

  const isLand = property.type.toLowerCase() === "tanah";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-3xl p-3.5 sm:p-4 border border-[#dce9e1] shadow-[0_4px_24px_rgba(15,31,26,0.04)] hover:shadow-[0_12px_36px_rgba(15,31,26,0.08)] transition-all flex flex-col justify-between group"
    >
      <div>
        {/* Frame Foto Membulat Cantik */}
        <div className="relative h-56 sm:h-60 w-full bg-[#e2ede7] rounded-2xl overflow-hidden">
          <Image
            src={resolveImageUrl(property.primary_image)}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-600 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Badges Pill Melayang */}
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className="bg-[#0f1f1a]/85 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full capitalize">
              {property.type}
            </span>
            <span className="bg-[#28a870] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
              <ShieldCheck className="w-3 h-3" />
              SHM
            </span>
          </div>

          <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-[#0f1f1a] text-[10px] font-bold px-2.5 py-0.5 rounded-full capitalize shadow-sm">
            {property.status}
          </span>
        </div>

        {/* Informasi Utama Unit */}
        <div className="pt-4 pb-2 px-1">
          <div className="mb-2">
            <span className="text-xl sm:text-2xl font-extrabold text-[#28a870] block tracking-tight">
              {formatRupiah(property.price)}
            </span>
            <p className="text-[11px] font-semibold text-[#1f8b5b] mt-0.5">
              Cicilan KPR mulai {formatRupiah(Math.round(estInstallment))}/bln
            </p>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-[#0f1f1a] line-clamp-1 mb-1">
            {property.title}
          </h3>

          <p className="text-xs text-[#3d5047] flex items-center gap-1.5 mb-3.5">
            <MapPin className="w-3.5 h-3.5 text-[#28a870] shrink-0" />
            <span className="truncate">{property.location}</span>
          </p>

          {/* Spesifikasi Matriks dengan Sudut Halus */}
          <div className="grid grid-cols-3 gap-2 py-2 px-2.5 bg-[#f7faf8] rounded-xl text-xs text-[#3d5047] border border-[#edf3f0]">
            {isLand ? (
              <>
                <div className="col-span-2 flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5 text-[#28a870]" />
                  <span>Luas {property.land_area} m²</span>
                </div>
                <div className="flex items-center text-[11px] font-semibold text-[#1f8b5b]">
                  Siap Bangun
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-1">
                  <Bed className="w-3.5 h-3.5 text-[#28a870]" />
                  <span>{property.bedrooms} KT</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bath className="w-3.5 h-3.5 text-[#28a870]" />
                  <span>{property.bathrooms} KM</span>
                </div>
                <div className="flex items-center gap-1">
                  <Maximize2 className="w-3.5 h-3.5 text-[#28a870]" />
                  <span>{property.land_area}/{property.building_area} m²</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Tombol Aksi Pill */}
      <div className="px-1 pt-2 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onDetail(property)}
          className="flex-1 py-2 text-xs font-bold text-[#0f1f1a] bg-[#eaf6f0] hover:bg-[#d8ece1] rounded-full transition-colors flex items-center justify-center gap-1 cursor-pointer"
        >
          <span>Spesifikasi</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#28a870]" />
        </button>
        <a
          href="#survey"
          onClick={() => onSurvey(property.id)}
          className="flex-1 py-2 text-xs font-bold text-center text-white bg-[#28a870] hover:bg-[#1f8b5b] rounded-full transition-colors flex items-center justify-center gap-1 shadow-sm"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Pilih Survey</span>
        </a>
      </div>
    </motion.div>
  );
}
