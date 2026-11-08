"use client";

import { useState } from "react";
import {
  Calendar,
  Send,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Property } from "@/types";
import { API_BASE } from "@/lib/api";

interface Props {
  properties: Property[];
  selectedSurveyId?: number;
  onSelectSurveyId?: (id: number) => void;
}

export default function SurveySection({
  properties,
  selectedSurveyId,
  onSelectSurveyId,
}: Props) {
  const [internalSurveyId, setInternalSurveyId] = useState(properties[0]?.id || 1);
  const surveyId = selectedSurveyId || internalSurveyId;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [timeSession, setTimeSession] = useState("pagi");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [responseMsg, setResponseMsg] = useState("");

  const handleSurveySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setResponseMsg("");

    const timeFormatted =
      timeSession === "pagi"
        ? "09:30"
        : timeSession === "siang"
        ? "13:30"
        : "16:00";

    try {
      const res = await fetch(`${API_BASE}/api/surveys`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          property_id: Number(surveyId),
          name,
          phone,
          survey_date: date,
          survey_time: timeFormatted,
          message: `${message ? message + " | " : ""}Sesi: ${timeSession}`,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setResponseMsg("Jadwal survey berhasil dikirim. Tim kami akan segera mengonfirmasi melalui WhatsApp.");
        setName("");
        setPhone("");
        setMessage("");
      } else {
        setStatus("error");
        setResponseMsg(data.message || "Gagal mengirim formulir survey.");
      }
    } catch {
      setStatus("error");
      setResponseMsg("Koneksi gagal. Silakan hubungi kami langsung via WhatsApp.");
    }
  };

  const handlePropertyChange = (newId: number) => {
    if (onSelectSurveyId) {
      onSelectSurveyId(newId);
    } else {
      setInternalSurveyId(newId);
    }
  };

  return (
    <section id="survey" className="w-full py-16 sm:py-24 bg-white scroll-mt-20 border-t border-neutral-200/80">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Form Survey */}
          <div className="lg:col-span-7 bg-[#faf9f6] p-6 sm:p-10 rounded-3xl border border-neutral-200 shadow-xs">
            <div className="mb-6 space-y-2">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
                Jadwalkan Kunjungan
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
                Survey Lokasi Bersama Tim
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600">
                Tentukan hari dan unit yang ingin Anda tinjau di kawasan Jabodetabek. Layanan survey tidak dipungut biaya.
              </p>
            </div>

            {status === "success" && (
              <div className="mb-6 p-4 rounded-xl bg-neutral-900 text-white text-sm flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <span>{responseMsg}</span>
              </div>
            )}

            {status === "error" && (
              <div className="mb-6 p-4 rounded-xl bg-neutral-100 border border-neutral-300 text-neutral-900 text-sm">
                {responseMsg}
              </div>
            )}

            <form onSubmit={handleSurveySubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-950"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Nomor WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="081234567890"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-950"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Pilihan Unit Properti *
                </label>
                <select
                  value={surveyId}
                  onChange={(e) => handlePropertyChange(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-950"
                >
                  {properties.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} - {p.location}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Pilihan Tanggal Survey *
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-950"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Sesi Waktu *
                  </label>
                  <select
                    value={timeSession}
                    onChange={(e) => setTimeSession(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-950"
                  >
                    <option value="pagi">Pagi (09:00 - 11:30 WIB)</option>
                    <option value="siang">Siang (13:00 - 15:00 WIB)</option>
                    <option value="sore">Sore (15:30 - 17:30 WIB)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Catatan Kebutuhan (Opsional)
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Misal: Ingin cek akses row jalan mobil & legalitas sertifikat"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-950"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3 px-6 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
              >
                {status === "loading" ? (
                  <span>Mengirim Permintaan...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Kirim Jadwal Survey</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Advisor Card (Padly Padilah) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200 shadow-xs space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-neutral-950 text-white font-bold text-lg flex items-center justify-center shrink-0">
                  PP
                </div>
                <div>
                  <h4 className="font-extrabold text-lg text-neutral-950 leading-snug">
                    Padly Padilah
                  </h4>
                  <p className="text-xs text-neutral-500">
                    Advisor Properti &amp; Legalitas Jabodetabek
                  </p>
                </div>
              </div>

              <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                Butuh konsultasi legalitas sertifikat, ketersediaan unit di Jabodetabek, atau estimasi notaris sebelum survey? Kantor operasional kami berpusat di Cilodong Depok, siap mendampingi transaksi Anda.
              </p>

              <div className="space-y-2.5 text-xs text-neutral-700 border-t border-neutral-100 pt-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-neutral-900 shrink-0" />
                  <span>Verifikasi sertifikat SHM &amp; pengecekan fisik lokasi</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-neutral-900 shrink-0" />
                  <span>Pendampingan survey gratis tanpa komitmen</span>
                </div>
              </div>

              <a
                href="https://wa.me/6281319233748"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 shadow-xs hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Konsultasi via WhatsApp (0813-1923-3748)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
