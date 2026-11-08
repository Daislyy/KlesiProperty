"use client";

export default function IntroSection() {
  const metrics = [
    { value: "+100", label: "Unit Terkurasi", desc: "Rumah cluster, ruko, & kavling" },
    { value: "+500", label: "Keluarga Terbantu", desc: "Transaksi aman & transparan" },
    { value: "100%", label: "Legalitas Terverifikasi", desc: "Sertifikat SHM / PBG BPN" },
  ];

  return (
    <section id="keunggulan" className="w-full py-16 sm:py-24 bg-[#faf9f6]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Heading */}
          <div className="lg:col-span-5 space-y-2">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
              Standar &amp; Reputasi
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 leading-[1.12]">
              Kenyamanan Hidup Berkualitas di Kawasan Jabodetabek
            </h2>
          </div>

          {/* Right Description & Numbers */}
          <div className="lg:col-span-7 space-y-10">
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
              Kami menghadirkan pilihan properti siap huni dan investasi tanah kavling dengan kepastian hukum yang jelas di berbagai kawasan berkembang Jabodetabek. Kantor operasional kami berpusat di Cilodong, Kota Depok, melayani pendampingan survey hingga legalitas tuntas.
            </p>

            {/* Metrics Row */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-6 border-t border-neutral-200/80">
              {metrics.map((item, index) => (
                <div key={index} className="space-y-1.5">
                  <div className="text-2xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
                    {item.value}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-neutral-900">
                    {item.label}
                  </div>
                  <div className="text-[11px] sm:text-xs text-neutral-500 hidden sm:block">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
