"use client";

import Image from "next/image";
import { ArrowDown, Calendar, Search, MapPin, Maximize2, Bed, Bath } from "lucide-react";
import { Property } from "@/types";
import { resolveImageUrl, formatRupiah } from "@/lib/api";

interface HeroProps {
  featuredProperty?: Property;
  onSelectDetail?: (p: Property) => void;
  onSelectSurvey?: (id?: number) => void;
}

export default function Hero({
  featuredProperty,
  onSelectDetail,
  onSelectSurvey,
}: HeroProps) {
  const scrollToKatalog = () => {
    const el = document.getElementById("katalog");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToSurvey = () => {
    if (onSelectSurvey && featuredProperty) {
      onSelectSurvey(featuredProperty.id);
      return;
    }
    const el = document.getElementById("survey");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Ambil gambar utama dari properti unggulan, atau gambar default arsitektural jika belum ada
  const heroImage =
    featuredProperty?.primary_image ||
    featuredProperty?.images?.[0]?.image_url ||
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85";

  return (
    <section className="relative w-full pt-28 sm:pt-36 pb-14 sm:pb-24 bg-gradient-to-b from-[#111317] via-[#20242c] to-[#faf9f6] overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Editorial Headline */}
        <div className="max-w-3xl mx-auto space-y-4 rise">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-white/90 text-[11px] font-medium uppercase tracking-widest backdrop-blur-md">
            Kurasi Properti Eksklusif Jabodetabek
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.06]">
            More Comfortable.
            <br />
            More Classy.
          </h1>

          <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto font-normal leading-relaxed">
            Pilihan hunian modern dan investasi lahan berlegalitas aman di koridor Jabodetabek dengan kantor operasional di Kota Depok.
          </p>

          {/* Action CTA Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={scrollToKatalog}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-neutral-950 text-xs sm:text-sm font-semibold shadow-lg hover:bg-neutral-100 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>Jelajahi Unit</span>
              <ArrowDown className="w-4 h-4 text-neutral-700" />
            </button>
            <button
              onClick={scrollToSurvey}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 text-white text-xs sm:text-sm font-medium border border-white/25 backdrop-blur-md hover:bg-white/20 transition-all duration-200 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>Jadwalkan Survey</span>
            </button>
          </div>

          {/* Minimalist Quick Search Bar */}
          <div className="pt-2 max-w-md mx-auto">
            <div
              onClick={scrollToKatalog}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/95 backdrop-blur-md shadow-xl border border-white/30 cursor-pointer hover:bg-white transition-all text-left group"
            >
              <Search className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 transition-colors shrink-0" />
              <span className="text-xs sm:text-sm text-neutral-500 flex-1 truncate font-normal">
                Cari unit di Depok, Bogor, Jakarta, Bekasi, Tangerang...
              </span>
              <span className="px-3 py-1 rounded-full bg-neutral-950 text-white text-[11px] font-semibold group-hover:bg-neutral-800 transition-colors">
                Cari
              </span>
            </div>
          </div>
        </div>

        {/* Centerpiece Modern Architectural Showcase */}
        <div className="mt-10 sm:mt-14 relative max-w-4xl mx-auto rise-2">
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-lg sm:rounded-xl overflow-hidden shadow-2xl border border-white/15">
            <Image
              src={resolveImageUrl(heroImage)}
              alt={featuredProperty ? featuredProperty.title : "Hunian Unggulan KlesiProperty"}
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
            />
            {/* Smooth Monochromatic Fade at the Bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#faf9f6] via-transparent to-transparent opacity-80 sm:opacity-70 pointer-events-none" />

            {/* Info Keterangan Properti Unggulan di Hero Section */}
            {featuredProperty && (
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md p-4 sm:p-5 rounded-lg bg-neutral-950/90 backdrop-blur-md text-white border border-white/15 text-left shadow-2xl z-10">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2 py-0.5 rounded bg-white text-neutral-950 text-[10px] font-black uppercase tracking-widest">
                    Properti Unggulan
                  </span>
                  <span className="text-[11px] text-neutral-300 font-medium capitalize">
                    {featuredProperty.type} &bull; SHM
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight line-clamp-1 mb-1">
                  {featuredProperty.title}
                </h3>

                <div className="flex items-center gap-1 text-xs text-neutral-300 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  <span className="truncate">{featuredProperty.location}</span>
                </div>

                {/* Spesifikasi & Aksi */}
                <div className="flex items-center justify-between gap-4 pt-2 border-t border-white/15">
                  <div>
                    <span className="text-[10px] text-neutral-400 block uppercase font-medium">
                      Harga Penawaran
                    </span>
                    <span className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                      {formatRupiah(featuredProperty.price)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {onSelectDetail && (
                      <button
                        type="button"
                        onClick={() => onSelectDetail(featuredProperty)}
                        className="px-3 py-1.5 rounded bg-white text-neutral-950 text-xs font-bold hover:bg-neutral-200 transition-colors cursor-pointer shadow-xs"
                      >
                        Detail
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        if (onSelectSurvey) onSelectSurvey(featuredProperty.id);
                        const el = document.getElementById("survey");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="px-3 py-1.5 rounded bg-white/20 hover:bg-white/30 text-white text-xs font-medium transition-colors cursor-pointer"
                    >
                      Survey
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
