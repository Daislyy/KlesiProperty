"use client";

import Image from "next/image";

export default function GalleryFeatures() {
  const galleryItems = [
    {
      title: "Ruang Keluarga Terbuka",
      tag: "Living Space",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
      aspect: "aspect-[4/3]",
    },
    {
      title: "Kamar Mandi & Sirkulasi Alami",
      tag: "Private Suite",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
      aspect: "aspect-[4/3]",
    },
    {
      title: "Kamar Tidur Utama",
      tag: "Master Bedroom",
      image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80",
      aspect: "aspect-[4/3]",
    },
  ];

  const features = [
    {
      title: "Strategic Location",
      desc: "Tersebar di koridor strategis Jabodetabek dengan akses cepat menuju jalan tol utama, stasiun KRL/LRT, serta fasilitas umum terpadu.",
    },
    {
      title: "Modern Design",
      desc: "Dirancang dengan konsep bukaan kaca lebar untuk pencahayaan alami optimal, sirkulasi silang yang sejuk, serta penataan ruang keluarga yang lega.",
    },
    {
      title: "Guaranteed Security",
      desc: "Keamanan lingkungan dengan sistem satu pintu (one gate system) 24 jam dan jaminan kepemilikan sertifikat SHM yang telah diverifikasi BPN.",
    },
  ];

  return (
    <section className="w-full py-14 sm:py-20 bg-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Horizontal 3-Image Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-2xs hover:shadow-lg transition-all duration-300"
            >
              <div className={`relative ${item.aspect} w-full`}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
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
            </div>
          ))}
        </div>

        {/* 3 Value Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 pt-4 border-t border-neutral-100">
          {features.map((feat, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="text-lg sm:text-xl font-extrabold text-neutral-950 tracking-tight">
                {feat.title}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
