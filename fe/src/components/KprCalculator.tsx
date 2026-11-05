"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { formatRupiah } from "@/lib/api";

interface Props {
  initialPrice?: number;
}

export default function KprCalculator({ initialPrice = 850000000 }: Props) {
  const [propertyPrice, setPropertyPrice] = useState<number>(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [tenureYears, setTenureYears] = useState<number>(15);
  const [interestRate, setInterestRate] = useState<number>(6.5);

  // Perhitungan KPR rumus anuitas perbankan Indonesia
  const downPayment = (propertyPrice * downPaymentPercent) / 100;
  const loanPrincipal = propertyPrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = tenureYears * 12;

  const monthlyInstallment =
    loanPrincipal > 0 && monthlyRate > 0
      ? (loanPrincipal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : 0;

  // Rasio kemampuan bayar (Debt Service Ratio 40%)
  const minIncome = monthlyInstallment / 0.4;

  const pricePresets = [
    { label: "675 Jt (Cimahi)", val: 675000000 },
    { label: "850 Jt (Parahyangan)", val: 850000000 },
    { label: "920 Jt (Sariwangi)", val: 920000000 },
    { label: "1,85 M (Dago)", val: 1850000000 },
  ];

  return (
    <section id="kpr" className="py-20 lg:py-24 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#eaf6f0] text-[#1f8b5b] text-xs font-bold mb-3">
          Kalkulator Pembiayaan Transparan
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f1f1a] tracking-tight mb-3">
          Simulasi Angsuran Bulanan & KPR
        </h2>
        <p className="text-sm sm:text-base text-[#3d5047] leading-relaxed">
          Sesuaikan persentase uang muka dan jangka waktu pinjaman untuk mengukur kesiapan finansial sebelum melakukan survey lokasi.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Panel Input Parameter */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 bg-white border border-[#e2ede7] p-7 sm:p-8 space-y-6"
        >
          {/* Harga Properti */}
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <label className="text-xs font-bold text-[#0f1f1a]">
                Harga Properti
              </label>
              <span className="text-base sm:text-lg font-extrabold text-[#28a870]">
                {formatRupiah(propertyPrice)}
              </span>
            </div>

            {/* Presets Cepat */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-3">
              {pricePresets.map((p) => (
                <button
                  key={p.val}
                  type="button"
                  onClick={() => setPropertyPrice(p.val)}
                  className={`py-1.5 px-2 text-[11px] font-semibold transition-colors ${
                    propertyPrice === p.val
                      ? "bg-[#0f1f1a] text-white"
                      : "bg-[#f7faf8] border border-[#e2ede7] text-[#3d5047] hover:border-[#28a870]"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <input
              type="range"
              min={300000000}
              max={3000000000}
              step={25000000}
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full accent-[#28a870] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#6a8075] mt-1 font-semibold">
              <span>Rp 300 Juta</span>
              <span>Rp 1,5 Miliar</span>
              <span>Rp 3,0 Miliar</span>
            </div>
          </div>

          {/* Uang Muka (DP) */}
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <label className="text-xs font-bold text-[#0f1f1a]">
                Uang Muka (DP {downPaymentPercent}%)
              </label>
              <span className="text-xs sm:text-sm font-bold text-[#0f1f1a]">
                {formatRupiah(downPayment)}
              </span>
            </div>
            <div className="flex gap-2">
              {[10, 15, 20, 30].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setDownPaymentPercent(pct)}
                  className={`flex-1 py-2 text-xs font-bold transition-colors ${
                    downPaymentPercent === pct
                      ? "bg-[#28a870] text-white"
                      : "bg-[#f7faf8] border border-[#e2ede7] text-[#3d5047] hover:bg-[#eaf6f0]"
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          {/* Jangka Waktu Pinjaman */}
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <label className="text-xs font-bold text-[#0f1f1a]">
                Tenor Pinjaman ({tenureYears} Tahun / {totalMonths} Bulan)
              </label>
            </div>
            <div className="flex gap-2">
              {[5, 10, 15, 20, 25].map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setTenureYears(yr)}
                  className={`flex-1 py-2 text-xs font-bold transition-colors ${
                    tenureYears === yr
                      ? "bg-[#28a870] text-white"
                      : "bg-[#f7faf8] border border-[#e2ede7] text-[#3d5047] hover:bg-[#eaf6f0]"
                  }`}
                >
                  {yr} Thn
                </button>
              ))}
            </div>
          </div>

          {/* Suku Bunga Bank */}
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <label className="text-xs font-bold text-[#0f1f1a]">
                Estimasi Suku Bunga Fixed Perbankan
              </label>
              <span className="text-xs sm:text-sm font-bold text-[#0f1f1a]">{interestRate}% p.a.</span>
            </div>
            <input
              type="range"
              min={4.5}
              max={11.0}
              step={0.25}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-[#28a870] cursor-pointer"
            />
            <p className="text-[11px] text-[#6a8075] mt-1">
              Rerata suku bunga promo bank rekanan (BTN, Mandiri, BCA, BSI) berkisar antara 4.99% - 7.50% fixed 1-3 tahun.
            </p>
          </div>
        </motion.div>

        {/* Panel Hasil Kalkulasi Ringkasan */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 bg-[#0f1f1a] text-white p-7 sm:p-9"
        >
          <span className="text-xs font-bold text-[#3ecf8e] block mb-1">
            Estimasi Angsuran Bulanan
          </span>
          <p className="text-3xl sm:text-4xl font-extrabold text-[#3ecf8e] mb-6">
            {formatRupiah(Math.round(monthlyInstallment))}
            <span className="text-xs font-normal text-[#cce3d7]"> / bulan</span>
          </p>

          <div className="space-y-3 bg-[#1d352c] p-4 text-xs mb-6">
            <div className="flex justify-between">
              <span className="text-[#a8c5b6]">Plafon Pokok Kredit</span>
              <span className="font-bold text-white">{formatRupiah(loanPrincipal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#a8c5b6]">Total Uang Muka (DP)</span>
              <span className="font-bold text-white">{formatRupiah(downPayment)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#a8c5b6]">Jangka Waktu Pinjaman</span>
              <span className="font-bold text-white">{tenureYears} Tahun ({totalMonths} Bln)</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-[#a8c5b6]">Min. Penghasilan Gabungan</span>
              <span className="font-bold text-[#3ecf8e]">{formatRupiah(Math.round(minIncome))} /bln</span>
            </div>
          </div>

          <div className="space-y-2 text-xs text-[#a8c5b6] mb-8">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#3ecf8e] shrink-0 mt-0.5" />
              <span>Pendampingan pengajuan berkas ke bank rekanan hingga SP3K terbit.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#3ecf8e] shrink-0 mt-0.5" />
              <span>Simulasi bersifat indikatif dan tidak memungut biaya administrasi.</span>
            </div>
          </div>

          <a
            href="#survey"
            className="w-full py-3.5 text-center text-xs font-bold text-white bg-[#28a870] hover:bg-[#1f8b5b] transition-colors flex items-center justify-center gap-2"
          >
            Pesan Survey dengan Skema Ini
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
