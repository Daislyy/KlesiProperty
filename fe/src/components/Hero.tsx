"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, ShieldCheck, Check } from "lucide-react";
import { Property } from "@/types";
import { resolveImageUrl, formatRupiah } from "@/lib/api";

interface HeroProps {
  featuredProperty?: Property;
  onSelectDetail?: (p: Property) => void;
  onSelectSurvey?: (id: number) => void;
}

export default function Hero({ featuredProperty, onSelectDetail, onSelectSurvey }: HeroProps) {
  const property = featuredProperty;

  // Estimasi KPR bulanan (DP 20%, 15 thn, 6.5%)
  const price = property?.price || 850000000;
  const principal = price * 0.8;
  const rate = 0.065 / 12;
  const months = 180;
  const estInstallment = Math.round(
    (principal * (rate * Math.pow(1 + rate, months))) / (Math.pow(1 + rate, months) - 1)
  );

  return (
    <section className="pt-28 pb-16 lg:pt-36 lg:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        {/* Kolom Narasi & Headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7"
        >
          {/* Tag Penanda Resmi */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#eaf6f0] text-[#1f8b5b] text-xs font-bold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#28a870]" />
            Katalog Properti Terkurasi · Area Bandung Raya
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-[#0f1f1a] leading-[1.08] mb-6">
            Hunian kurasi bergaransi legalitas di Bandung Raya.
          </h1>

          <p className="text-base sm:text-lg text-[#3d5047] leading-relaxed mb-8 max-w-xl">
            Klesi Property memeriksa langsung riwayat sertifikat SHM ke BPN, menguji debit air tanah saat kemarau, dan mendokumentasikan kondisi fisik asli setiap unit sebelum dipasarkan.
          </p>

          {/* Tombol Aksi */}
          <div className="flex flex-wrap items-center gap-3.5 mb-10">
            <motion.a
              href="#katalog"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3.5 text-sm font-bold text-white bg-[#28a870] hover:bg-[#1f8b5b] transition-colors flex items-center gap-2"
            >
              Lihat Properti Tersedia
              <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="#survey"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3.5 text-sm font-bold text-[#0f1f1a] bg-[#eaf6f0] hover:bg-[#d8ece1] transition-colors"
            >
              Jadwalkan Survey Lokasi
            </motion.a>
          </div>

          {/* Protokol Verifikasi 4 Titik */}
          <div className="bg-[#f0f6f3] p-5">
            <p className="text-xs font-bold text-[#0f1f1a] mb-2.5">
              Protokol verifikasi wajib tiap unit:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-[#3d5047]">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#28a870]" />
                </div>
                <span>Validasi SHM BPN</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#28a870]" />
                </div>
                <span>Uji Mutu Struktur</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#28a870]" />
                </div>
                <span>Cek Sanitasi & Air</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#28a870]" />
                </div>
                <span>ROW Jalan ≥ 6 Meter</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Kolom Visual Listing Unggulan */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative"
        >
          <div className="bg-white p-2.5 shadow-sm">
            {/* Foto Properti Utama */}
            <div className="relative h-[340px] sm:h-[400px] w-full bg-[#e2ede7] overflow-hidden group">
              <Image
                src={resolveImageUrl(property?.primary_image)}
                alt={property?.title || "Properti Kurasi"}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 540px"
              />

              {/* Status Pill */}
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="bg-[#0f1f1a] text-white text-[11px] font-bold px-2.5 py-1">
                  Unit Kurasi Utama
                </span>
                <span className="bg-[#28a870] text-white text-[11px] font-bold px-2.5 py-1 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  SHM Bersih
                </span>
              </div>

              <div className="absolute top-3 right-3 bg-white/95 text-[#0f1f1a] text-xs font-bold px-2.5 py-1">
                {property?.location || "Bandung Barat"}
              </div>
            </div>

            {/* Info Box di Bawah Foto */}
            <div className="p-5 bg-white">
              <div className="flex items-baseline justify-between mb-1.5">
                <h2 className="text-xl font-bold text-[#0f1f1a] line-clamp-1">
                  {property?.title || "Rumah Kebun Parahyangan"}
                </h2>
                <span className="text-lg font-extrabold text-[#28a870] shrink-0">
                  {formatRupiah(price)}
                </span>
              </div>

              <p className="text-xs text-[#6a8075] flex items-center gap-1 mb-4">
                <MapPin className="w-3.5 h-3.5 text-[#28a870] shrink-0" />
                <span>{property?.address || "Jl. Kolonel Masturi No. 42, Cisarua"}</span>
              </p>

              {/* Spesifikasi Ringkas */}
              <div className="grid grid-cols-4 gap-2 py-2.5 px-3 bg-[#f7faf8] text-center mb-4">
                <div>
                  <p className="text-[11px] text-[#6a8075]">K. Tidur</p>
                  <p className="text-xs font-bold text-[#0f1f1a]">{property?.bedrooms || 3} KT</p>
                </div>
                <div>
                  <p className="text-[11px] text-[#6a8075]">K. Mandi</p>
                  <p className="text-xs font-bold text-[#0f1f1a]">{property?.bathrooms || 2} KM</p>
                </div>
                <div>
                  <p className="text-[11px] text-[#6a8075]">L. Tanah</p>
                  <p className="text-xs font-bold text-[#0f1f1a]">{property?.land_area || 140} m²</p>
                </div>
                <div>
                  <p className="text-[11px] text-[#6a8075]">Bangunan</p>
                  <p className="text-xs font-bold text-[#0f1f1a]">{property?.building_area || 88} m²</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="text-[#3d5047]">
                  Cicilan KPR: <span className="font-bold text-[#1f8b5b]">{formatRupiah(estInstallment)}/bln</span>
                </div>
                <div className="flex gap-2">
                  {property && onSelectDetail && (
                    <button
                      type="button"
                      onClick={() => onSelectDetail(property)}
                      className="font-bold text-xs text-[#0f1f1a] hover:text-[#28a870] underline underline-offset-4"
                    >
                      Detail
                    </button>
                  )}
                  <a
                    href="#survey"
                    onClick={() => onSelectSurvey && property && onSelectSurvey(property.id)}
                    className="font-bold text-xs text-[#28a870] hover:text-[#1f8b5b] underline underline-offset-4"
                  >
                    Atur Survey
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
