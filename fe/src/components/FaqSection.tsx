"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    q: "Apakah jadwal survey lokasi dikenakan biaya?",
    a: "Tidak ada biaya sama sekali. Seluruh pendampingan survey ke lokasi unit properti bersama konsultan Klesi Property bersifat gratis dan tanpa komitmen tanda jadi di awal.",
  },
  {
    q: "Bagaimana proses verifikasi legalitas sertifikat di Klesi?",
    a: "Sebelum listing diterbitkan, tim kami memeriksa keaslian buku tanah SHM ke BPN melalui pengecekan fisik warkah dan aplikasi Sentuh Tanahku untuk memastikan tidak ada sengketa waris atau status agunan perbankan macet.",
  },
  {
    q: "Apakah pembeli bisa mengajukan KPR lewat bank pilihan sendiri?",
    a: "Bisa. Anda bebas memilih bank manapun. Tim Klesi juga bekerja sama dengan bank rekanan (BTN, Mandiri, BCA, dan BSI) untuk membantu proses pengumpulan berkas hingga penerbitan surat penegasan persetujuan kredit (SP3K).",
  },
  {
    q: "Apakah saya bisa bernegosiasi langsung dengan pemilik unit?",
    a: "Ya. Kami memfasilitasi pertemuan tatap muka terbuka antara calon pembeli dan pemilik rumah saat proses negosiasi harga akhir agar tercipta transparansi penuh tanpa mark-up sepihak.",
  },
  {
    q: "Berapa lama estimasi waktu dari kesepakatan hingga serah terima kunci?",
    a: "Untuk pembelian tunai keras berkisar antara 7-14 hari kerja setelah verifikasi notaris PPAT dan penandatanganan AJB. Untuk skema KPR, biasanya memerlukan 3-4 minggu bergantung pada kecepatan verifikasi data perbankan.",
  },
  {
    q: "Bagaimana dengan biaya pajak pembeli (BPHTB) dan jasa notaris?",
    a: "Biaya BPHTB (5% setelah dikurangi NPOPTKP) dan biaya pembuatan Akta Jual Beli (AJB) dihitung secara transparan di depan bersama notaris PPAT rekanan sebelum transaksi dimulai.",
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIdx(openIdx === i ? null : i);
  };

  return (
    <section className="py-20 lg:py-24 border-t border-[#e2ede7]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Kolom Kiri */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#eaf6f0] text-[#1f8b5b] text-xs font-bold mb-3">
            Pusat Informasi & Konsultasi
          </div>
          <h2 className="text-3xl font-extrabold text-[#0f1f1a] tracking-tight leading-tight mb-4">
            Pertanyaan seputar transaksi & survey.
          </h2>
          <p className="text-xs sm:text-sm text-[#3d5047] leading-relaxed mb-6">
            Pahami hak Anda sebagai pembeli, tata cara pemeriksaan fisik, dan transparansi proses akad sebelum menjadwalkan kunjungan lapangan.
          </p>

          <div className="p-5 bg-white border border-[#e2ede7]">
            <h3 className="text-xs font-bold text-[#0f1f1a] uppercase tracking-wider mb-1">
              Konsultasi Langsung
            </h3>
            <p className="text-xs text-[#6a8075] leading-relaxed mb-3">
              Ada pertanyaan spesifik mengenai batas patok atau regulasi IMB/PBG di kawasan Bandung Barat & Cimahi?
            </p>
            <a
              href="#survey"
              className="inline-flex items-center text-xs font-bold text-[#28a870] hover:text-[#1f8b5b] underline underline-offset-4"
            >
              Jadwalkan Konsultasi dengan Tim Lapangan →
            </a>
          </div>
        </motion.div>

        {/* Kolom Kanan: Accordion */}
        <div className="lg:col-span-8 space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white border border-[#e2ede7] transition-colors hover:border-[#28a870]"
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#0f1f1a] hover:text-[#28a870] transition-colors"
                >
                  <span>{faq.q}</span>
                  <div className="w-6 h-6 bg-[#f7faf8] flex items-center justify-center text-[#28a870] shrink-0">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-[#3d5047] leading-relaxed border-t border-[#f7faf8]">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
