"use client";

import { useState, useMemo } from "react";
import { Search, X, ArrowRight, RotateCcw } from "lucide-react";
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
  // State Filter & Pencarian
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterLocation, setFilterLocation] = useState("all");
  const [filterPrice, setFilterPrice] = useState("all");
  const [filterBedrooms, setFilterBedrooms] = useState("all");

  // Dapatkan daftar lokasi unik dari data
  const locations = useMemo(() => {
    const locSet = new Set<string>();
    properties.forEach((p) => {
      if (p.location) {
        const mainLoc = p.location.split(",")[0].trim();
        locSet.add(mainLoc);
      }
    });
    return Array.from(locSet);
  }, [properties]);

  // Logika Filter & Pencarian Gabungan
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      // 1. Filter Tipe
      if (filterType !== "all" && p.type.toLowerCase() !== filterType.toLowerCase()) {
        return false;
      }

      // 2. Filter Lokasi
      if (
        filterLocation !== "all" &&
        !p.location.toLowerCase().includes(filterLocation.toLowerCase())
      ) {
        return false;
      }

      // 3. Filter Rentang Harga
      if (filterPrice !== "all") {
        const price = Number(p.price) || 0;
        if (filterPrice === "under800" && price >= 800000000) return false;
        if (filterPrice === "800to1500" && (price < 800000000 || price > 1500000000))
          return false;
        if (filterPrice === "above1500" && price <= 1500000000) return false;
      }

      // 4. Filter Kamar Tidur
      if (filterBedrooms !== "all") {
        const beds = Number(p.bedrooms) || 0;
        if (filterBedrooms === "2" && beds < 2) return false;
        if (filterBedrooms === "3" && beds < 3) return false;
      }

      // 5. Searching
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = p.title?.toLowerCase().includes(q);
        const matchLoc = p.location?.toLowerCase().includes(q);
        const matchAddr = p.address?.toLowerCase().includes(q);
        const matchDesc = p.description?.toLowerCase().includes(q);
        const matchFacilities = p.facilities?.toLowerCase().includes(q);
        if (!matchTitle && !matchLoc && !matchAddr && !matchDesc && !matchFacilities) {
          return false;
        }
      }

      return true;
    });
  }, [properties, filterType, filterLocation, filterPrice, filterBedrooms, searchQuery]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    filterType !== "all" ||
    filterLocation !== "all" ||
    filterPrice !== "all" ||
    filterBedrooms !== "all";

  const handleResetFilters = () => {
    setSearchQuery("");
    setFilterType("all");
    setFilterLocation("all");
    setFilterPrice("all");
    setFilterBedrooms("all");
  };

  return (
    <section id="katalog" className="w-full py-16 sm:py-24 bg-white scroll-mt-20 border-t border-neutral-200/80">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
              Katalog Terverifikasi
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950">
              Pilihan Hunian &amp; Lahan di Jabodetabek
            </h2>
            <p className="text-sm text-neutral-500 max-w-xl">
              Unit terawat dan siap huni dengan sertifikat resmi, bebas sengketa, dan siap serah terima.
            </p>
          </div>

          {/* Type Filter Pills (Monochrome Black & White) */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-neutral-100 border border-neutral-200 self-start md:self-auto">
            {[
              { id: "all", label: "Semua" },
              { id: "rumah", label: "Rumah" },
              { id: "tanah", label: "Tanah" },
              { id: "ruko", label: "Komersial" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilterType(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  filterType === cat.id
                    ? "bg-neutral-950 text-white shadow-xs"
                    : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200/60"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Secondary Filter Bar */}
        <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-[#faf9f6] border border-neutral-200 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama, kota (misal: Depok, Bogor, Jakarta)..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-950"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-900 rounded-full cursor-pointer"
                  aria-label="Hapus kata kunci"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Lokasi */}
            <div className="md:col-span-3">
              <select
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 bg-white text-xs sm:text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-950 cursor-pointer"
              >
                <option value="all">Semua Lokasi</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter Harga */}
            <div className="md:col-span-2">
              <select
                value={filterPrice}
                onChange={(e) => setFilterPrice(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 bg-white text-xs sm:text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-950 cursor-pointer"
              >
                <option value="all">Semua Harga</option>
                <option value="under800">&lt; Rp 800 Jt</option>
                <option value="800to1500">Rp 800 Jt - 1,5 M</option>
                <option value="above1500">&gt; Rp 1,5 M</option>
              </select>
            </div>

            {/* Filter Kamar Tidur */}
            <div className="md:col-span-2">
              <select
                value={filterBedrooms}
                onChange={(e) => setFilterBedrooms(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 bg-white text-xs sm:text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-950 cursor-pointer"
              >
                <option value="all">Semua Kamar</option>
                <option value="2">Minimal 2 Kamar</option>
                <option value="3">Minimal 3 Kamar</option>
                </select>
            </div>
          </div>

          {/* Baris Informasi Hasil & Reset */}
          <div className="flex items-center justify-between pt-2 border-t border-neutral-200/80 text-xs text-neutral-500">
            <div>
              Menampilkan{" "}
              <span className="font-bold text-neutral-950">
                {filteredProperties.length}
              </span>{" "}
              dari {properties.length} unit properti
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-200/80 hover:bg-neutral-300 text-neutral-800 font-medium transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filter</span>
              </button>
            )}
          </div>
        </div>

        {/* Property Grid */}
        {filteredProperties.length === 0 ? (
          <div className="p-16 text-center bg-neutral-50 rounded-2xl border border-neutral-200 text-neutral-500 space-y-3">
            <p className="text-base font-bold text-neutral-900">
              Tidak ada properti yang cocok dengan kriteria pencarian.
            </p>
            <p className="text-xs text-neutral-500 max-w-md mx-auto">
              Coba gunakan kata kunci yang lebih umum, ubah rentang harga, atau reset filter untuk melihat seluruh unit yang tersedia.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-950 text-white rounded-full text-xs font-semibold hover:bg-neutral-800 transition-colors shadow-xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Hapus Semua Filter</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProperties.map((item) => (
              <PropertyCard
                key={item.id}
                property={item}
                onDetail={onSelectDetail}
                onSurvey={onSelectSurvey}
              />
            ))}
          </div>
        )}

        {/* Bottom CTA to Survey */}
        <div className="mt-14 text-center">
          <a
            href="#survey"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-950 text-xs sm:text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Butuh Konsultasi atau Survey Lapangan?</span>
            <ArrowRight className="w-4 h-4 text-neutral-900" />
          </a>
        </div>
      </div>
    </section>
  );
}
