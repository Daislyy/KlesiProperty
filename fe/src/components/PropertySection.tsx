"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, X, Sparkles, Filter } from "lucide-react";
import PropertyCard from "./PropertyCard";
import { Property } from "@/types";

interface Props {
  properties: Property[];
  onSelectDetail: (p: Property) => void;
  onSelectSurvey: (id: number) => void;
}

export default function PropertySection({
  properties,
  onSelectDetail,
  onSelectSurvey,
}: Props) {
  const [filterType, setFilterType] = useState("semua");
  const [selectedLocation, setSelectedLocation] = useState("semua");
  const [keyword, setKeyword] = useState("");

  const locations = [
    "semua",
    "Bandung Barat",
    "Cimahi",
    "Dago Atas, Bandung",
    "Sukajadi, Bandung",
    "Lembang",
  ];

  const filteredProperties = properties.filter((p) => {
    const matchType = filterType === "semua" || p.type.toLowerCase() === filterType;
    const matchLocation =
      selectedLocation === "semua" ||
      p.location.toLowerCase().includes(selectedLocation.toLowerCase());
    const matchKeyword =
      !keyword ||
      p.title.toLowerCase().includes(keyword.toLowerCase()) ||
      p.location.toLowerCase().includes(keyword.toLowerCase()) ||
      p.facilities?.toLowerCase().includes(keyword.toLowerCase());
    return matchType && matchLocation && matchKeyword;
  });

  return (
    <section id="katalog" className="py-20 lg:py-24 scroll-mt-24">
      {/* Header Katalog */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#eaf6f0] text-[#1f8b5b] text-xs font-bold rounded-full mb-3 border border-[#cce3d7]">
            <Sparkles className="w-3.5 h-3.5 text-[#28a870]" />
            <span>Listing Terkurasi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f1f1a] tracking-tight mb-2">
            Katalog Properti Terverifikasi
          </h2>
          <p className="text-sm sm:text-base text-[#3d5047] max-w-xl">
            Setiap unit telah melalui inspeksi fisik langsung dan audit sertifikat BPN sebelum ditayangkan.
          </p>
        </div>

        {/* Tab Filter Tipe Properti - Pill Buttons */}
        <div className="flex flex-wrap items-center gap-2 bg-[#f0f6f3] p-1.5 rounded-full border border-[#dbe8e0]">
          {[
            { label: "Semua Unit", value: "semua" },
            { label: "Rumah", value: "rumah" },
            { label: "Tanah Kavling", value: "tanah" },
          ].map(({ label, value }) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilterType(value)}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                filterType === value
                  ? "bg-[#28a870] text-white shadow-sm"
                  : "text-[#3d5047] hover:text-[#0f1f1a]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Bar Pencarian & Filter Kawasan */}
      <div className="space-y-3.5 mb-10">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6a8075]" />
          <input
            type="text"
            placeholder="Cari nama unit, alamat, kawasan (contoh: Dago, Cimahi, Kolonel Masturi)..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full pl-11 pr-10 py-3.5 bg-white border border-[#dce9e1] rounded-2xl text-sm text-[#0f1f1a] placeholder:text-[#6a8075] focus:outline-none focus:border-[#28a870] shadow-[0_2px_12px_rgba(15,31,26,0.03)]"
          />
          {keyword && (
            <button
              type="button"
              onClick={() => setKeyword("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6a8075] hover:text-[#0f1f1a] cursor-pointer"
              aria-label="Hapus kata kunci pencarian"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Lokasi Chips Pill */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[#6a8075] font-semibold mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-[#28a870]" />
            Kawasan:
          </span>
          {locations.map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={() => setSelectedLocation(loc)}
              className={`px-3.5 py-1.5 rounded-full font-semibold transition-all capitalize cursor-pointer border ${
                selectedLocation === loc
                  ? "bg-[#0f1f1a] text-white border-[#0f1f1a] shadow-sm"
                  : "bg-white text-[#3d5047] border-[#dce9e1] hover:bg-[#eaf6f0]"
              }`}
            >
              {loc}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Properti atau Status Kosong */}
      {filteredProperties.length === 0 ? (
        <div className="p-16 text-center bg-white rounded-3xl border border-[#dce9e1] shadow-sm text-[#3d5047]">
          <p className="text-base font-bold text-[#0f1f1a]">
            Tidak ada unit properti yang cocok dengan filter Anda.
          </p>
          <p className="text-xs text-[#6a8075] mt-1 mb-5">
            Silakan atur ulang kata kunci atau pilih kawasan lain.
          </p>
          <button
            type="button"
            onClick={() => {
              setFilterType("semua");
              setSelectedLocation("semua");
              setKeyword("");
            }}
            className="px-6 py-2.5 text-xs font-bold text-white bg-[#28a870] hover:bg-[#1f8b5b] rounded-full transition-colors cursor-pointer shadow-sm"
          >
            Reset Filter Pencarian
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredProperties.map((item, i) => (
            <PropertyCard
              key={item.id}
              property={item}
              index={i}
              onDetail={onSelectDetail}
              onSurvey={onSelectSurvey}
            />
          ))}
        </div>
      )}
    </section>
  );
}
