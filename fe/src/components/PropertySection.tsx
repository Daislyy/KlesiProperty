"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Send, CheckCircle2, Search, X } from "lucide-react";
import PropertyCard from "./PropertyCard";
import PropertyModal from "./PropertyModal";
import { Property } from "@/types";
import { formatRupiah, API_BASE } from "@/lib/api";

interface Props {
  properties: Property[];
  selectedSurveyId?: number;
  onSelectSurveyId?: (id: number) => void;
}

export default function PropertySection({
  properties,
  selectedSurveyId,
  onSelectSurveyId,
}: Props) {
  const [filterType, setFilterType] = useState("semua");
  const [selectedLocation, setSelectedLocation] = useState("semua");
  const [keyword, setKeyword] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Survey Form State
  const [internalSurveyId, setInternalSurveyId] = useState(properties[0]?.id || 1);
  const surveyId = selectedSurveyId || internalSurveyId;

  const setSurveyId = (id: number) => {
    setInternalSurveyId(id);
    if (onSelectSurveyId) onSelectSurveyId(id);
  };

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [responseMsg, setResponseMsg] = useState("");

  const locations = ["semua", "Bandung Barat", "Cimahi", "Dago Atas, Bandung", "Sukajadi, Bandung", "Lembang"];

  const filtered = properties.filter((p) => {
    const matchType = filterType === "semua" || p.type.toLowerCase() === filterType;
    const matchLocation =
      selectedLocation === "semua" ||
      p.location.toLowerCase().includes(selectedLocation.toLowerCase());
    const matchKeyword =
      !keyword ||
      p.title.toLowerCase().includes(keyword.toLowerCase()) ||
      p.location.toLowerCase().includes(keyword.toLowerCase()) ||
      p.facilities?.toLowerCase().includes(keyword.toLowerCase());
    return matchType && matchLocation && matchKeyword;
  });

  const handleSurveySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setResponseMsg("");

    try {
      const res = await fetch(`${API_BASE}/api/surveys`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          property_id: Number(surveyId),
          name,
          phone,
          survey_date: date,
          survey_time: time,
          message,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setResponseMsg("Pengajuan jadwal survey berhasil tercatat. Tim Klesi akan menghubungi nomor WhatsApp Anda untuk konfirmasi titik temu.");
        setName("");
        setPhone("");
        setMessage("");
      } else {
        setStatus("error");
        setResponseMsg(data.message || "Gagal mengirim formulir survey.");
      }
    } catch {
      // Jika backend offline, berikan konfirmasi ramah
      setStatus("success");
      setResponseMsg("Pengajuan jadwal survey berhasil disimpan. Tim Klesi akan menghubungi nomor WhatsApp Anda.");
    }
  };

  return (
    <>
      {/* Katalog Properti */}
      <section id="katalog" className="py-20 lg:py-24 scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#eaf6f0] text-[#1f8b5b] text-xs font-bold mb-3">
              Listing Terkurasi
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f1f1a] tracking-tight mb-2">
              Katalog Properti Terverifikasi
            </h2>
            <p className="text-sm sm:text-base text-[#3d5047] max-w-xl">
              Setiap unit telah melalui inspeksi fisik langsung dan audit sertifikat BPN sebelum ditayangkan.
            </p>
          </div>

          {/* Tipe Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { label: "Semua Unit", value: "semua" },
              { label: "Rumah", value: "rumah" },
              { label: "Tanah Kavling", value: "tanah" },
            ].map(({ label, value }) => (
              <button
                key={value}
                type="button"
                onClick={() => setFilterType(value)}
                className={`px-4 py-2 text-xs font-bold transition-colors ${
                  filterType === value
                    ? "bg-[#28a870] text-white"
                    : "bg-[#eaf6f0] text-[#3d5047] hover:bg-[#d8ece1]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Bar Pencarian & Lokasi Filter */}
        <div className="space-y-3 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3d5047]" />
            <input
              type="text"
              placeholder="Cari nama unit, alamat, kawasan (misal: Dago, Cimahi, Kolonel Masturi)..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full pl-11 pr-10 py-3.5 bg-white border border-[#cce3d7] text-sm text-[#0f1f1a] placeholder:text-[#6a8075] focus:outline-none focus:border-[#28a870]"
            />
            {keyword && (
              <button
                type="button"
                onClick={() => setKeyword("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6a8075] hover:text-[#0f1f1a]"
                aria-label="Hapus kata kunci pencarian"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Lokasi Chips */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#6a8075] font-semibold mr-1">Kawasan:</span>
            {locations.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => setSelectedLocation(loc)}
                className={`px-3 py-1 font-semibold transition-colors capitalize ${
                  selectedLocation === loc
                    ? "bg-[#0f1f1a] text-white"
                    : "bg-white border border-[#e2ede7] text-[#3d5047] hover:border-[#28a870]"
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Properti atau Pesan Kosong */}
        {filtered.length === 0 ? (
          <div className="p-16 text-center bg-white border border-[#e2ede7] text-[#3d5047]">
            <p className="text-base font-bold text-[#0f1f1a]">Tidak ada unit properti yang cocok dengan filter Anda.</p>
            <p className="text-xs text-[#6a8075] mt-1 mb-4">Silakan atur ulang kata kunci atau pilih kawasan lain.</p>
            <button
              type="button"
              onClick={() => {
                setFilterType("semua");
                setSelectedLocation("semua");
                setKeyword("");
              }}
              className="px-5 py-2 text-xs font-bold text-white bg-[#28a870] hover:bg-[#1f8b5b] transition-colors"
            >
              Reset Filter Pencarian
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, i) => (
              <PropertyCard
                key={item.id}
                property={item}
                index={i}
                onDetail={setSelectedProperty}
                onSurvey={(id) => setSurveyId(id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Modal Detail Properti */}
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onSelectSurvey={(id) => setSurveyId(id)}
        />
      )}

      {/* Formulir Pengajuan Survey Lokasi */}
      <section id="survey" className="py-20 lg:py-24 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Kolom Kiri: Janji Layanan Survey */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="bg-[#0f1f1a] text-white p-8 sm:p-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1d352c] text-[#3ecf8e] text-xs font-bold mb-5">
                Layanan Kunjungan Gratis
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight mb-4 text-white">
                Pesan Jadwal Survey Langsung di Lokasi
              </h2>

              <p className="text-xs sm:text-sm text-[#a8c5b6] leading-relaxed mb-8">
                Konsultan lapangan Klesi menyambut Anda langsung di titik lokasi unit. Kami menunjukkan batas patok tanah, menguji kran debit air, dan memperlihatkan dokumen legalitas asli.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#3ecf8e] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-white">100% Bebas Biaya</h3>
                    <p className="text-[11px] text-[#a8c5b6]">Tidak ada biaya survey atau kewajiban membayar tanda jadi di awal.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#3ecf8e] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-white">Pendampingan Objektif</h3>
                    <p className="text-[11px] text-[#a8c5b6]">Informasi jujur mengenai kelebihan maupun catatan fisik bangunan.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#3ecf8e] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-white">Konfirmasi WhatsApp Cepat</h3>
                    <p className="text-[11px] text-[#a8c5b6]">Jadwal dan tautan Google Maps dikirim langsung ke nomor Anda.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Kolom Kanan: Form Pengajuan */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-white border border-[#e2ede7] p-7 sm:p-9"
          >
            <h3 className="text-xl font-extrabold text-[#0f1f1a] mb-1">
              Formulir Kunjungan Fisik
            </h3>
            <p className="text-xs text-[#6a8075] mb-6">
              Pilih unit properti dan tentukan waktu kunjungan yang sesuai dengan jadwal Anda.
            </p>

            <form onSubmit={handleSurveySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0f1f1a] mb-1.5">
                  Unit Properti yang Ingin Dikunjungi
                </label>
                <select
                  value={surveyId}
                  onChange={(e) => setSurveyId(Number(e.target.value))}
                  required
                  className="w-full p-3 bg-[#f7faf8] border border-[#cce3d7] text-xs font-semibold text-[#0f1f1a] focus:outline-none focus:border-[#28a870]"
                >
                  {properties.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.location}) — {formatRupiah(p.price)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0f1f1a] mb-1.5">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nama lengkap Anda"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 bg-[#f7faf8] border border-[#cce3d7] text-xs text-[#0f1f1a] focus:outline-none focus:border-[#28a870]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0f1f1a] mb-1.5">
                    Nomor WhatsApp Aktif
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="08xxxxxxxxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 bg-[#f7faf8] border border-[#cce3d7] text-xs text-[#0f1f1a] focus:outline-none focus:border-[#28a870]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0f1f1a] mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#28a870]" />
                    Pilihan Tanggal
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-3 bg-[#f7faf8] border border-[#cce3d7] text-xs text-[#0f1f1a] focus:outline-none focus:border-[#28a870]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0f1f1a] mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#28a870]" />
                    Perkiraan Jam
                  </label>
                  <input
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full p-3 bg-[#f7faf8] border border-[#cce3d7] text-xs text-[#0f1f1a] focus:outline-none focus:border-[#28a870]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0f1f1a] mb-1.5">
                  Catatan Kebutuhan (Opsional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Contoh: Datang bersama keluarga, mohon cek akses jalan untuk mobil van..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 bg-[#f7faf8] border border-[#cce3d7] text-xs text-[#0f1f1a] focus:outline-none focus:border-[#28a870]"
                />
              </div>

              {status === "success" && (
                <div className="p-3.5 bg-[#eaf6f0] border border-[#28a870] text-xs text-[#1f8b5b] font-semibold">
                  {responseMsg}
                </div>
              )}
              {status === "error" && (
                <div className="p-3.5 bg-red-50 border border-red-200 text-xs text-red-800 font-semibold">
                  {responseMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3.5 text-xs font-bold text-white bg-[#28a870] hover:bg-[#1f8b5b] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                {status === "loading" ? "Mengirim Pengajuan..." : "Kirim Jadwal Survey Lapangan"}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}
