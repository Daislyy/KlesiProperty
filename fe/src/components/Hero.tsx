"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Calendar, Search, MapPin, ShieldCheck, Sparkles } from "lucide-react";
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
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const heroImage =
    featuredProperty?.primary_image ||
    featuredProperty?.images?.[0]?.image_url ||
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85";

  return (
    <section className="relative w-full pt-32 sm:pt-40 pb-16 sm:pb-24 bg-gradient-to-b from-[#0f1115] via-[#1a1d24] to-[#faf9f6] overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="max-w-3xl mx-auto space-y-5">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05]"
          >
            More Comfortable.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
              More Classy.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto font-normal leading-relaxed"
          >
            Hunian modern dan investasi lahan dengan legalitas SHM terverifikasi di wilayah Jabodetabek. Layanan terpadu dengan kantor operasional di Kota Depok.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-2 flex flex-wrap items-center justify-center gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("katalog")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-neutral-950 text-xs sm:text-sm font-semibold shadow-lg hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <span>Jelajahi Katalog</span>
              <ArrowDown className="w-4 h-4 text-neutral-700" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                if (onSelectSurvey && featuredProperty) onSelectSurvey(featuredProperty.id);
                scrollTo("survey");
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white text-xs sm:text-sm font-medium border border-white/20 backdrop-blur-md hover:bg-white/20 transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>Jadwal Survey</span>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-1 max-w-md mx-auto"
          >
            <div
              onClick={() => scrollTo("katalog")}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md shadow-xl border border-white/40 cursor-pointer hover:bg-white transition-all text-left group"
            >
              <Search className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 transition-colors shrink-0" />
              <span className="text-xs sm:text-sm text-neutral-500 flex-1 truncate font-normal">
                Cari Depok, Bogor, Jakarta, Bekasi, Tangerang...
              </span>
              <span className="px-3 py-1 rounded-full bg-neutral-950 text-white text-[11px] font-semibold group-hover:bg-neutral-800 transition-colors">
                Cari
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 sm:mt-16 relative max-w-4xl mx-auto"
        >
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 group">
            <Image
              src={resolveImageUrl(heroImage)}
              alt={featuredProperty ? featuredProperty.title : "Hunian Unggulan KlesiProperty"}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-104"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#faf9f6] via-transparent to-transparent opacity-80 pointer-events-none" />

            {featuredProperty && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md p-4 sm:p-5 rounded-xl bg-neutral-950/85 backdrop-blur-md text-white border border-white/15 text-left shadow-2xl z-10"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2 py-0.5 rounded bg-white text-neutral-950 text-[10px] font-black uppercase tracking-wider">
                    Sorotan Utama
                  </span>
                  <span className="text-[11px] text-neutral-300 font-medium capitalize flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
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

                <div className="flex items-center justify-between gap-4 pt-2.5 border-t border-white/15">
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
                        className="px-3.5 py-1.5 rounded-lg bg-white text-neutral-950 text-xs font-bold hover:bg-neutral-200 transition-colors cursor-pointer shadow-xs"
                      >
                        Detail
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        if (onSelectSurvey) onSelectSurvey(featuredProperty.id);
                        scrollTo("survey");
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-medium transition-colors cursor-pointer"
                    >
                      Survey
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
