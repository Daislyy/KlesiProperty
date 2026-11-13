"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  Phone,
  MessageSquare,
  Search,
  MapPin,
  FileSpreadsheet,
} from "lucide-react";
import { Survey } from "@/types";
import { API_BASE } from "@/lib/api";

interface Props {
  surveys: Survey[];
  token: string;
  onRefresh: () => void;
}

export default function SurveyTable({ surveys, token, onRefresh }: Props) {
  const [filterStatus, setFilterStatus] = useState("semua");
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const normalizeStatus = (st: string) => {
    if (st === "dihubungi") return "dikonfirmasi";
    if (st === "batal") return "dibatalkan";
    return st;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";
    try {
      const clean = dateStr.includes("T") ? dateStr.split("T")[0] : dateStr;
      const [year, month, day] = clean.split("-");
      if (year && month && day) {
        return `${day}/${month}/${year}`;
      }
      return clean;
    } catch {
      return dateStr;
    }
  };

  const formatTime = (timeStr: string) => {
    if (!timeStr) return "";
    const parts = timeStr.split(":");
    if (parts.length >= 2) {
      return `${parts[0]}:${parts[1]} WIB`;
    }
    return `${timeStr} WIB`;
  };

  const filtered = surveys.filter((s) => {
    const sNorm = normalizeStatus(s.status);
    const fNorm = normalizeStatus(filterStatus);
    const matchStatus = filterStatus === "semua" || sNorm === fNorm;
    const matchSearch =
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.phone.includes(search) ||
      (s.property_title && s.property_title.toLowerCase().includes(search.toLowerCase()));
    return matchStatus && matchSearch;
  });

  const handleStatusChange = async (surveyId: number, newStatus: string) => {
    setUpdatingId(surveyId);
    try {
      const res = await fetch(`${API_BASE}/api/admin/surveys/${surveyId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        onRefresh();
      }
    } catch {
      onRefresh();
    } finally {
      setUpdatingId(null);
    }
  };

  const formatWhatsAppUrl = (item: Survey) => {
    let clean = item.phone.replace(/[^0-9]/g, "");
    if (clean.startsWith("0")) clean = "62" + clean.slice(1);

    const message = [
      `*KONFIRMASI JADWAL SURVEY - KLESI PROPERTY*`,
      `Halo Bapak/Ibu *${item.name}*,`,
      ``,
      `Terima kasih telah mengajukan jadwal survey melalui website KlesiProperty. Berikut rincian jadwal survey Anda:`,
      ``,
      `*Detail Pengajuan:*`,
      `• *Unit:* ${item.property_title || "Unit Properti"} ${item.property_location ? `(${item.property_location})` : ""}`,
      `• *Tanggal:* ${formatDate(item.survey_date)}`,
      `• *Waktu:* ${formatTime(item.survey_time)}`,
      item.message ? `• *Catatan:* "${item.message}"` : null,
      ``,
      `*Titik Temu:*`,
      `Tim advisor kami siap mendampingi langsung ke lokasi atau bertemu di kantor operasional KlesiProperty (Cilodong, Kota Depok).`,
      ``,
      `Apakah jadwal di atas sudah sesuai untuk Bapak/Ibu? Mohon konfirmasinya ya. Terima kasih!`,
      ``,
      `_Salam hangat,_`,
      `*Tim KlesiProperty Jabodetabek*`
    ]
      .filter((line) => line !== null)
      .join("\n");

    return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
  };

  const handleExportExcel = () => {
    if (filtered.length === 0) return;

    const headers = [
      "No",
      "ID Survey",
      "Nama Pemohon",
      "No WhatsApp",
      "Target Properti",
      "Lokasi Properti",
      "Tanggal Survey",
      "Waktu Survey",
      "Status",
      "Catatan Pemohon",
    ];

    const rows = filtered.map((s, idx) => [
      idx + 1,
      s.id,
      `"${(s.name || "").replace(/"/g, '""')}"`,
      `"'${s.phone || ""}"`,
      `"${(s.property_title || "").replace(/"/g, '""')}"`,
      `"${(s.property_location || "").replace(/"/g, '""')}"`,
      formatDate(s.survey_date),
      formatTime(s.survey_time),
      normalizeStatus(s.status).toUpperCase(),
      `"${(s.message || "").replace(/"/g, '""').replace(/\r?\n/g, " ")}"`,
    ]);

    const csvContent =
      "\uFEFF" +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const dateStr = new Date().toISOString().split("T")[0];
    link.href = url;
    link.setAttribute("download", `Data_Jadwal_Survey_KlesiProperty_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama, no WhatsApp, properti..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8.5 pr-3 py-2 bg-neutral-50 border border-neutral-200 text-xs rounded-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all w-64 sm:w-80"
            />
          </div>

          <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-lg">
            {[
              { label: "Semua", val: "semua" },
              { label: "Baru", val: "baru" },
              { label: "Dikonfirmasi", val: "dikonfirmasi" },
              { label: "Selesai", val: "selesai" },
              { label: "Dibatalkan", val: "dibatalkan" },
            ].map(({ label, val }) => (
              <button
                key={val}
                type="button"
                onClick={() => setFilterStatus(val)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  normalizeStatus(filterStatus) === normalizeStatus(val)
                    ? "bg-white text-neutral-950 shadow-xs"
                    : "text-neutral-600 hover:text-neutral-950"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleExportExcel}
          disabled={filtered.length === 0}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/90 rounded-lg transition-all active:scale-97 cursor-pointer disabled:opacity-40 disabled:pointer-events-none shadow-2xs"
          title="Unduh data survey ke file spreadsheet (.csv/Excel)"
        >
          <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
          <span>Export Excel</span>
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="p-12 text-center bg-neutral-50/50 rounded-xl border border-dashed border-neutral-200 text-neutral-500">
          <p className="text-xs font-semibold text-neutral-800">Tidak ada permohonan survey yang cocok.</p>
          <p className="text-[11px] text-neutral-400 mt-1">Permohonan survey dari formulir landing page akan masuk otomatis di sini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => {
            const currentStatus = normalizeStatus(item.status);

            return (
              <div
                key={item.id}
                className="group bg-white rounded-xl border border-neutral-200/80 p-4 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-neutral-400 block">
                        Permohonan #{item.id}
                      </span>
                      <h4 className="text-sm font-bold text-neutral-950 line-clamp-1 mt-0.5">
                        {item.name}
                      </h4>
                    </div>

                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded capitalize shrink-0 ${
                        currentStatus === "baru"
                          ? "bg-amber-100 text-amber-900 border border-amber-200"
                          : currentStatus === "dikonfirmasi"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : currentStatus === "selesai"
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : "bg-neutral-100 text-neutral-600 border border-neutral-200"
                      }`}
                    >
                      {currentStatus}
                    </span>
                  </div>

                  <div className="p-2.5 bg-neutral-50 rounded-lg mb-3 text-xs">
                    <p className="text-[10px] uppercase font-semibold text-neutral-400">Target Properti:</p>
                    <p className="font-semibold text-neutral-900 line-clamp-1 mt-0.5">
                      {item.property_title || `Properti ID #${item.property_id}`}
                    </p>
                    {item.property_location && (
                      <p className="text-neutral-500 text-[11px] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-neutral-400" />
                        <span className="truncate">{item.property_location}</span>
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-neutral-600 mb-3 p-2 bg-neutral-50/50 rounded-lg">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{formatDate(item.survey_date)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{formatTime(item.survey_time)}</span>
                    </div>
                  </div>

                  {item.message && (
                    <div className="p-2.5 bg-neutral-50 rounded-lg text-[11px] text-neutral-600 mb-4 flex items-start gap-1.5 border-l-2 border-neutral-300">
                      <MessageSquare className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                      <p className="italic leading-normal">&ldquo;{item.message}&rdquo;</p>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-3">
                  <a
                    href={formatWhatsAppUrl(item)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors shadow-xs active:scale-98"
                  >
                    <Phone className="w-3 h-3" />
                    <span>WhatsApp</span>
                  </a>

                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="text-[11px] text-neutral-400">Status:</span>
                    <select
                      value={currentStatus}
                      disabled={updatingId === item.id}
                      onChange={(e) => handleStatusChange(item.id, e.target.value)}
                      className="py-1 px-2 bg-neutral-50 border border-neutral-200 rounded-md text-xs font-medium text-neutral-800 focus:outline-none focus:border-neutral-900 cursor-pointer disabled:opacity-50"
                    >
                      <option value="baru">Baru</option>
                      <option value="dikonfirmasi">Dikonfirmasi</option>
                      <option value="selesai">Selesai</option>
                      <option value="dibatalkan">Dibatalkan</option>
                    </select>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
