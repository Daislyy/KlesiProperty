"use client";

import Image from "next/image";

export default function DreamHomeSection() {
  return (
    <section className="w-full py-16 sm:py-24 bg-[#faf9f6]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Heading, Text & Portrait Image */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <div className="space-y-3">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
                Harmoni Ruang
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 leading-[1.12]">
                Temukan Hunian Impian Anda
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                Setiap properti dipilih berdasarkan standar konstruksi yang kokoh, aksesibilitas jalan yang lebar, dan status sertifikat yang bersih tanpa sengketa.
              </p>
            </div>

            {/* Portrait Architectural Lifestyle Photo */}
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-sm bg-neutral-100 border border-neutral-200/80 group">
              <Image
                src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80"
                alt="Detail Interior Estetik Hunian"
                fill
                sizes="(max-width: 1024px) 100vw, 450px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Right Column: Large Landscape Photo + Lower Photo */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Large Living Room Photo */}
            <div className="relative aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-md bg-neutral-100 border border-neutral-200/80 group">
              <Image
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80"
                alt="Ruang Keluarga Minimalis Elegan"
                fill
                sizes="(max-width: 1024px) 100vw, 700px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Bottom Staircase Photo */}
            <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden shadow-sm bg-neutral-100 border border-neutral-200/80 group">
              <Image
                src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=80"
                alt="Tangga Arsitektural dan Penataan Ruang Terbuka"
                fill
                sizes="(max-width: 1024px) 100vw, 700px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
