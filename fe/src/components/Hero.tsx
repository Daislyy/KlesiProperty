"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, ShieldCheck, Check, Sparkles, Calendar } from "lucide-react";
import { Property } from "@/types";
import { resolveImageUrl, formatRupiah } from "@/lib/api";

interface HeroProps {
  featuredProperty?: Property;
  onSelectDetail?: (p: Property) => void;
  onSelectSurvey?: (id: number) => void;
}

export default function Hero({ featuredProperty, onSelectDetail, onSelectSurvey }: HeroProps) {
  const property = featuredProperty;

  // Estimasi KPR bulanan (DP 20%, tenor 15 tahun, suku bunga 6.5%)
  const price = property?.price || 850000000;
  const principal = price * 0.8;
  const rate = 0.065 / 12;
  const months = 180;
  const estInstallment = Math.round(
    (principal * (rate * Math.pow(1 + rate, months))) / (Math.pow(1 + rate, months) - 1)
  );

  return (
    <section className="pt-28 pb-16 lg:pt-36 lg:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Kolom Kiri: Narasi & Nilai Tambah */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7"
        >
          {/* Tag Wilayah Kurasi */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#eaf6f0] text-[#1f8b5b] text-xs font-bold rounded-full mb-6 border border-[#cce3d7]">
            <span className="w-2 h-2 rounded-full bg-[#28a870] animate-pulse" />
            <span>Katalog Properti Terkurasi · Area Bandung Raya</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-extrabold tracking-tight text-[#0f1f1a] leading-[1.12] mb-6">
            Hunian kurasi bergaransi legalitas di Bandung Raya.
          </h1>

          <p className="text-base sm:text-lg text-[#3d5047] leading-relaxed mb-8 max-w-xl">
            Klesi Property memvalidasi langsung buku sertifikat SHM ke kantor BPN, menguji debit air tanah saat musim kemarau, dan memastikan konstruksi kokoh sebelum listing dipasarkan.
          </p>

          {/* Tombol Aksi Utama - Bentuk Pill Lembut */}
          <div className="flex flex-wrap items-center gap-3.5 mb-10">
            <a
              href="#katalog"
              className="px-6 py-3.5 text-xs sm:text-sm font-bold text-white bg-[#28a870] hover:bg-[#1f8b5b] rounded-full transition-colors flex items-center gap-2 shadow-sm"
            >
              <span>Lihat Properti Tersedia</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#survey"
              className="px-6 py-3.5 text-xs sm:text-sm font-bold text-[#0f1f1a] bg-[#eaf6f0] hover:bg-[#d8ece1] rounded-full transition-colors border border-[#cce3d7]"
            >
              Jadwalkan Survey Lokasi
            </a>
          </div>

          {/* Card Standar Pemeriksaan Cepat - Sudut Membulat Nyaman */}
          <div className="bg-[#eef7f2] border border-[#d6e8dc] rounded-2xl p-5 sm:p-6 shadow-[0_2px_12px_rgba(40,168,112,0.04)]">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#28a870]" />
              <p className="text-xs font-bold text-[#0f1f1a]">
                4 Titik Pemeriksaan Wajib Setiap Listing:
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold text-[#3d5047]">
              <div className="flex items-center gap-2 bg-white/80 px-2.5 py-1.5 rounded-xl border border-[#dbe8e0]">
                <div className="w-4 h-4 rounded-full bg-[#28a870] flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 text-white" />
                </div>
                <span>SHM BPN</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 px-2.5 py-1.5 rounded-xl border border-[#dbe8e0]">
                <div className="w-4 h-4 rounded-full bg-[#28a870] flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 text-white" />
                </div>
                <span>Uji Struktur</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 px-2.5 py-1.5 rounded-xl border border-[#dbe8e0]">
                <div className="w-4 h-4 rounded-full bg-[#28a870] flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 text-white" />
                </div>
                <span>Uji Air & Limbah</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 px-2.5 py-1.5 rounded-xl border border-[#dbe8e0]">
                <div className="w-4 h-4 rounded-full bg-[#28a870] flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 text-white" />
                </div>
                <span>ROW Jalan ≥ 6M</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Kolom Kanan: Kartu Properti Kurasi Utama */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#dce9e1] shadow-[0_12px_40px_rgba(15,31,26,0.06)] hover:shadow-[0_16px_50px_rgba(15,31,26,0.09)] transition-shadow">
            {/* Frame Foto Membulat */}
            <div className="relative h-64 sm:h-72 w-full bg-[#e2ede7] rounded-2xl overflow-hidden group">
              <Image
                src={resolveImageUrl(property?.primary_image)}
                alt={property?.title || "Properti Kurasi"}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 500px"
              />

              {/* Badges Pill Melayang */}
              <div className="absolute top-3 left-3 flex gap-1.5">
                <span className="bg-[#0f1f1a]/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full">
                  Pilihan Utama
                </span>
                <span className="bg-[#28a870] text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <ShieldCheck className="w-3 h-3" />
                  SHM Bersih
                </span>
              </div>

              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-[#0f1f1a] text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
                {property?.location || "Bandung Barat"}
              </div>
            </div>

            {/* Konten Informasi Properti */}
            <div className="pt-4 px-1">
              <div className="flex items-baseline justify-between mb-1.5">
                <h2 className="text-lg font-bold text-[#0f1f1a] line-clamp-1">
                  {property?.title || "Rumah Kebun Parahyangan"}
                </h2>
                <span className="text-lg font-extrabold text-[#28a870] shrink-0">
                  {formatRupiah(price)}
                </span>
              </div>

              <p className="text-xs text-[#6a8075] flex items-center gap-1.5 mb-4">
                <MapPin className="w-3.5 h-3.5 text-[#28a870] shrink-0" />
                <span className="truncate">{property?.address || "Jl. Kolonel Masturi No. 42"}</span>
              </p>

              {/* Spesifikasi Grid 4 Kotak Lembut */}
              <div className="grid grid-cols-4 gap-2 p-2.5 bg-[#f7faf8] rounded-xl text-center mb-4 border border-[#edf3f0]">
                <div>
                  <p className="text-[10px] text-[#6a8075]">K. Tidur</p>
                  <p className="text-xs font-bold text-[#0f1f1a]">{property?.bedrooms || 3} KT</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#6a8075]">K. Mandi</p>
                  <p className="text-xs font-bold text-[#0f1f1a]">{property?.bathrooms || 2} KM</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#6a8075]">L. Tanah</p>
                  <p className="text-xs font-bold text-[#0f1f1a]">{property?.land_area || 140} m²</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#6a8075]">Bangunan</p>
                  <p className="text-xs font-bold text-[#0f1f1a]">{property?.building_area || 88} m²</p>
                </div>
              </div>

              {/* Baris Cicilan & Aksi Langsung */}
              <div className="flex items-center justify-between text-xs pt-1">
                <div className="text-[#3d5047]">
                  Cicilan: <span className="font-bold text-[#1f8b5b]">{formatRupiah(estInstallment)}/bln</span>
                </div>
                <div className="flex items-center gap-2">
                  {property && onSelectDetail && (
                    <button
                      type="button"
                      onClick={() => onSelectDetail(property)}
                      className="px-3 py-1.5 rounded-full text-xs font-bold text-[#0f1f1a] bg-[#f0f6f3] hover:bg-[#e2ede7] transition-colors cursor-pointer"
                    >
                      Detail
                    </button>
                  )}
                  <a
                    href="#survey"
                    onClick={() => onSelectSurvey && property && onSelectSurvey(property.id)}
                    className="px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-[#28a870] hover:bg-[#1f8b5b] transition-colors flex items-center gap-1 shadow-sm"
                  >
                    <Calendar className="w-3 h-3" />
                    <span>Survey</span>
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
