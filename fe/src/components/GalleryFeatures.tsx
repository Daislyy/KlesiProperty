"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function GalleryFeatures() {
  const galleryItems = [
    {
      title: "Ruang Keluarga Terbuka",
      tag: "Living Space",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Kamar Mandi & Sirkulasi Alami",
      tag: "Private Suite",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Kamar Tidur Utama",
      tag: "Master Bedroom",
      image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const features = [
    {
      num: "01",
      title: "Strategic Location",
      desc: "Tersebar di koridor strategis Jabodetabek dengan akses cepat menuju jalan tol utama, stasiun KRL/LRT, serta fasilitas umum terpadu.",
    },
    {
      num: "02",
      title: "Modern Architectural",
      desc: "Dirancang dengan konsep bukaan kaca lebar untuk pencahayaan alami optimal, sirkulasi silang yang sejuk, dan penataan ruang lega.",
    },
    {
      num: "03",
      title: "Guaranteed Security",
      desc: "Keamanan lingkungan terpadu one-gate system 24 jam dan kepastian legalitas kepemilikan SHM terverifikasi BPN.",
    },
  ];

  return (
    <section className="w-full py-16 sm:py-24 bg-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-2xs hover:shadow-lg transition-all"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                />
              </div>
              <div className="p-4 sm:p-5 bg-white border-t border-neutral-100 flex items-center justify-between gap-2">
                <p className="text-xs sm:text-sm font-bold text-neutral-900">
                  {item.title}
                </p>
                <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                  {item.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 pt-6 border-t border-neutral-100">
          {features.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="space-y-2.5"
            >
              <span className="text-xs font-mono font-bold text-neutral-400">
                {feat.num}
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-neutral-950 tracking-tight">
                {feat.title}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
