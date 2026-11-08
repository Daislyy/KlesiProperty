"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Bagaimana proses verifikasi legalitas properti di KlesiProperty?",
      answer:
        "Setiap unit properti melewati pengecekan keabsahan sertifikat (SHM/SHGB), perizinan bangunan (IMB/PBG), dan status riwayat tanah di kantor BPN terkait guna memastikan tidak ada sengketa atau kendala hukum.",
    },
    {
      question: "Di mana saja cakupan lokasi properti yang dipasarkan?",
      answer:
        "Layanan kurasi kami mencakup kawasan Jabodetabek (Jakarta, Bogor, Depok, Tangerang, dan Bekasi) dengan akses transportasi strategis, di mana kantor operasional utama kami berpusat di Cilodong, Kota Depok.",
    },
    {
      question: "Berapa kisaran harga dan tipe properti yang tersedia?",
      answer:
        "Pilihan unit mencakup rumah cluster siap huni mulai dari 600 jutaan hingga hunian eksklusif dua lantai di atas 1 miliar, ruko komersial, dan tanah kavling siap bangun.",
    },
    {
      question: "Bagaimana cara menjadwalkan survey lokasi?",
      answer:
        "Anda dapat memilih tanggal kunjungan melalui formulir jadwal survey atau langsung mengirim pesan WhatsApp ke nomor 0813-1923-3748. Tim kami siap mendampingi tanpa pungutan biaya.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full py-16 sm:py-24 bg-[#faf9f6] border-t border-gray-100">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-[1.15]">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              Pertanyaan umum seputar legalitas sertifikat, lokasi, dan prosedur survey properti bersama kami.
            </p>
          </div>

          {/* Right Column: Accordion Items */}
          <div className="lg:col-span-7 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-white border border-gray-200/80 overflow-hidden transition-all duration-200 shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full py-4 sm:py-5 px-5 sm:px-6 flex items-center justify-between gap-4 text-left cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-semibold text-gray-900 leading-snug">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-neutral-950" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-0 text-sm text-gray-600 leading-relaxed border-t border-gray-100 mt-1">
                      <p className="pt-3">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

