"use client";

import { motion } from "framer-motion";
import { Building2, Users2, ShieldCheck } from "lucide-react";

export default function IntroSection() {
  const metrics = [
    {
      value: "+100",
      label: "Unit Terkurasi",
      desc: "Rumah cluster, ruko komersial, & kavling",
      icon: Building2,
    },
    {
      value: "+500",
      label: "Keluarga Terbantu",
      desc: "Konsultasi jujur, transparan, & tanpa komisi tersembunyi",
      icon: Users2,
    },
    {
      value: "100%",
      label: "Legalitas Terverifikasi",
      desc: "Status hak milik (SHM) & PBG resmi BPN",
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="keunggulan" className="w-full py-20 sm:py-28 bg-[#faf9f6]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-3"
          >
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest block">
              Standar &amp; Reputasi
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 leading-[1.12]">
              Kenyamanan Hidup Berkualitas di Koridor Jabodetabek
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7 space-y-8"
          >
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
              Kami menghadirkan pilihan properti siap huni dan investasi lahan dengan kepastian hukum yang jelas di berbagai kawasan berkembang Jabodetabek. Kantor operasional kami berpusat di Cilodong, Kota Depok, melayani pendampingan survey hingga legalitas tuntas.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {metrics.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                    className="p-5 rounded-xl bg-white border border-neutral-200/90 shadow-2xs hover:shadow-md transition-all space-y-2"
                  >
                    <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900 mb-3">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
                      {item.value}
                    </div>
                    <div className="text-xs font-bold text-neutral-900">
                      {item.label}
                    </div>
                    <div className="text-[11px] text-neutral-500 leading-snug">
                      {item.desc}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
