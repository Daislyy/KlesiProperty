"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Droplets, Ruler, FileText, CheckCircle2, Award } from "lucide-react";

const AUDIT_STEPS = [
  {
    icon: FileText,
    stage: "Tahap 01",
    title: "Validasi Buku Tanah & Riwayat BPN",
    detail:
      "Pengecekan nomor hak milik sertifikat langsung ke kantor pertanahan BPN. Kami memastikan tanah bebas dari sengketa ahli waris, tidak berstatus sita jaminan perbankan, dan memiliki garis batas koordinat yang sah.",
    criteria: "Sertifikat SHM Asli & Bebas Blokir",
  },
  {
    icon: Droplets,
    stage: "Tahap 02",
    title: "Uji Debit Air & Sistem Sanitasi",
    detail:
      "Pemeriksaan debit sumur bor mandiri atau sambungan PDAM, kejernihan air tanah saat musim kemarau, kemiringan pipa buang limbah rumah tangga, dan jarak aman septic tank terhadap titik sumber air bersih.",
    criteria: "Air Jernih Bebas Bau & Saluran Lancar",
  },
  {
    icon: Ruler,
    stage: "Tahap 03",
    title: "Audit Fisik, Sloof & Konstruksi Bangunan",
    detail:
      "Pemeriksaan ketebalan sloof beton bertulang, dinding tanpa retak struktural geser, serta pemasangan rangka atap baja ringan berstandar SNI untuk memastikan ketahanan bangunan dalam jangka panjang.",
    criteria: "Struktur SNI Tanpa Retak Struktural",
  },
  {
    icon: ShieldCheck,
    stage: "Tahap 04",
    title: "ROW Jalan & Aksesibilitas Lingkungan",
    detail:
      "Pengukuran lebar badan jalan depan unit minimal ROW 6 meter untuk kemudahan simpangan dua mobil, kontur saluran drainase bebas banjir, serta jaringan kabel listrik PLN lingkungan yang tertata rapi.",
    criteria: "ROW Minimal 6M & Bebas Genangan",
  },
];

export default function QualityStandards() {
  return (
    <section id="standar" className="py-20 lg:py-28 scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Kolom Kiri: Prinsip Kurasi Hukum */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#eaf6f0] text-[#1f8b5b] text-xs font-bold rounded-full mb-4 border border-[#cce3d7]">
            <Award className="w-3.5 h-3.5 text-[#28a870]" />
            <span>Standar Pengujian Fisik & Hukum</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f1f1a] tracking-tight leading-tight mb-5">
            Pemeriksaan menyeluruh sebelum listing disetujui.
          </h2>

          <p className="text-base text-[#3d5047] leading-relaxed mb-8">
            Kami menolak pengajuan properti yang memiliki riwayat sengketa batas tanah, legalitas girik belum tuntas, struktur dinding retak struktural, atau suplai air yang terhenti saat musim kemarau.
          </p>

          {/* Kartu Jaminan Transaksi - Desain Rounded Elegan */}
          <div className="bg-[#0f1f1a] text-white p-7 sm:p-8 rounded-3xl border border-[#1d352c] shadow-lg space-y-5">
            <h3 className="text-base font-bold text-white flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#1d352c] flex items-center justify-center text-[#3ecf8e]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span>Jaminan Transaksi Klesi</span>
            </h3>

            <ul className="space-y-3.5 text-xs text-[#cce3d7] leading-relaxed">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#3ecf8e] shrink-0 mt-0.5" />
                <span>Seluruh sertifikat SHM dan PBG/IMB diverifikasi langsung ke instansi resmi BPN.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#3ecf8e] shrink-0 mt-0.5" />
                <span>Foto dokumentasi adalah kondisi riil lapangan tanpa manipulasi visual.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#3ecf8e] shrink-0 mt-0.5" />
                <span>Pendampingan notaris PPAT rekanan resmi saat proses akad jual beli (AJB).</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Kolom Kanan: 4 Tahap Protokol Teknis */}
        <div className="lg:col-span-7 space-y-4">
          {AUDIT_STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-[#dce9e1] shadow-[0_4px_20px_rgba(15,31,26,0.03)] hover:shadow-[0_8px_30px_rgba(15,31,26,0.06)] transition-all group"
              >
                <div className="flex items-start justify-between gap-4 mb-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#eaf6f0] flex items-center justify-center text-[#28a870] shrink-0 group-hover:bg-[#28a870] group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#0f1f1a]">
                      {item.title}
                    </h3>
                  </div>
                  <span className="text-[11px] font-bold text-[#28a870] bg-[#eaf6f0] px-3 py-1 rounded-full shrink-0 border border-[#cce3d7]">
                    {item.stage}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#3d5047] leading-relaxed mb-3.5 pl-12">
                  {item.detail}
                </p>

                <div className="pl-12 flex items-center gap-2 text-xs font-semibold text-[#1f8b5b]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#28a870]" />
                  <span>Kriteria: {item.criteria}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
