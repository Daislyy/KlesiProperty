"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Droplets, Ruler, FileText, CheckCircle2 } from "lucide-react";

const PROTOCOLS = [
  {
    icon: FileText,
    stage: "Tahap 01",
    title: "Validasi Buku Tanah & Riwayat BPN",
    detail:
      "Pemeriksaan nomor hak milik, plotting sertifikat di kantor pertanahan BPN, serta surat bebas sengketa. Kami memastikan tanah tidak sedang diagunkan, berstatus sita sita jaminan, atau bermasalah waris.",
    criteria: "Sertifikat SHM Asli & Bebas Blokir",
  },
  {
    icon: Droplets,
    stage: "Tahap 02",
    title: "Uji Debit Air & Sistem Sanitasi",
    detail:
      "Pengecekan kelancaran debit sumur bor mandiri atau sambungan PDAM, kejernihan air, kemiringan pipa buang limbah rumah tangga, dan jarak ideal septic tank terhadap titik sumber air bersih.",
    criteria: "Air Jernih Bebas Bau & Saluran Lancar",
  },
  {
    icon: Ruler,
    stage: "Tahap 03",
    title: "Audit Fisik, Sloof & Konstruksi Bangunan",
    detail:
      "Pemeriksaan integritas sloof beton bertulang, dinding tanpa retak struktural miring, serta rangka atap baja ringan berstandar SNI. Menjamin kenyamanan dan keamanan jangka panjang penghuni.",
    criteria: "Struktur SNI Tanpa Retak Struktural",
  },
  {
    icon: ShieldCheck,
    stage: "Tahap 04",
    title: "ROW Jalan & Aksesibilitas Lingkungan",
    detail:
      "Pengukuran lebar jalan depan unit minimal ROW 6 meter untuk simpangan dua mobil, kontur saluran drainase bebas banjir, serta jaringan kabel listrik PLN dan penerangan lingkungan yang tertata.",
    criteria: "ROW Minimal 6M & Bebas Banjir",
  },
];

export default function QualityStandards() {
  return (
    <section id="standar" className="py-20 lg:py-28 scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Kolom Kiri: Prinsip Kurasi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#eaf6f0] text-[#1f8b5b] text-xs font-bold mb-4">
            Standar Pengujian Fisik & Hukum
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f1f1a] tracking-tight leading-tight mb-5">
            Pemeriksaan ketat sebelum unit disetujui untuk tayang.
          </h2>

          <p className="text-base text-[#3d5047] leading-relaxed mb-8">
            Kami menolak pengajuan properti yang memiliki riwayat sengketa batas tanah, legalitas girik belum tuntas, struktur dinding retak parah, atau suplai air yang terhenti saat musim kemarau.
          </p>

          <div className="bg-[#0f1f1a] text-white p-6 sm:p-7 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#3ecf8e]" />
              Jaminan Transaksi Klesi
            </h3>
            <ul className="space-y-3 text-xs text-[#cce3d7] leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3ecf8e] shrink-0 mt-0.5" />
                <span>Seluruh sertifikat SHM dan IMB/PBG telah diperiksa legalitasnya di BPN.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3ecf8e] shrink-0 mt-0.5" />
                <span>Foto dokumentasi merupakan kondisi riil lapangan tanpa manipulasi visual.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3ecf8e] shrink-0 mt-0.5" />
                <span>Pendampingan notaris PPAT rekanan resmi saat proses akad jual beli (AJB).</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Kolom Kanan: 4 Tahapan Protokol */}
        <div className="lg:col-span-7 space-y-4">
          {PROTOCOLS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white border border-[#e2ede7] p-6 transition-colors hover:border-[#28a870]"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#eaf6f0] flex items-center justify-center text-[#28a870] shrink-0">
                      <Icon className="w-4 h-4 text-[#28a870]" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#0f1f1a]">
                      {item.title}
                    </h3>
                  </div>
                  <span className="text-[11px] font-bold text-[#28a870] bg-[#eaf6f0] px-2.5 py-1 shrink-0">
                    {item.stage}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#3d5047] leading-relaxed mb-4 pl-12">
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
