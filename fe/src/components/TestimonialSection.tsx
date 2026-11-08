"use client";

import { Quote } from "lucide-react";

export default function TestimonialSection() {
  const testimonials = [
    {
      name: "Muhammad Attar Putra Pratama",
      role: "Pembeli Rumah Cluster Depok",
      initials: "MA",
      content:
        "Proses verifikasi sertifikat SHM sangat transparan. Dari awal survey lokasi hingga penandatanganan akta di kantor notaris selalu didampingi dengan jelas dan aman.",
    },
    {
      name: "Muhammad Raffi Barzally",
      role: "Pembeli Rumah Siap Huni Bogor",
      initials: "MR",
      content:
        "Pengecekan riwayat tanah di BPN sangat terbuka dan tidak ada biaya tersembunyi. Tim KlesiProperty menjelaskan seluruh detail spesifikasi bangunan dan perizinan secara profesional.",
    },
    {
      name: "Galih Rakhasiwi",
      role: "Pembeli Tanah Kavling Jabodetabek",
      initials: "GR",
      content:
        "Jalur komunikasi sangat responsif. Dokumen perizinan lengkap dan legalitas tanah terbukti aman sesuai penjelasan awal. Rekomendasi terpercaya bagi yang mencari aset di kawasan Jabodetabek.",
    },
  ];

  return (
    <section id="testimoni" className="w-full py-16 sm:py-24 bg-white border-t border-neutral-200/80 scroll-mt-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16 space-y-2">
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
            Pengalaman Klien
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 leading-[1.15]">
            Pengalaman Transaksi Nyata &amp; Transparan
          </h2>
          <p className="text-sm text-neutral-500 font-normal">
            Kepercayaan pembeli dibangun melalui kepastian legalitas sertifikat dan pendampingan menyeluruh.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="p-6 sm:p-8 rounded-2xl bg-[#faf9f6] border border-neutral-200 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-6 group hover:-translate-y-1"
            >
              <div className="space-y-4">
                <Quote className="w-6 h-6 text-neutral-400" />
                <p className="text-sm text-neutral-700 leading-relaxed font-normal">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>

              {/* Client Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-neutral-200/80">
                <div className="w-10 h-10 rounded-full bg-neutral-950 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {item.initials}
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-neutral-950 truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs text-neutral-500 truncate">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
