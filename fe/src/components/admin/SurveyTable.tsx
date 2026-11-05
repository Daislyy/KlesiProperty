"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Calendar, Clock, Phone, User, CheckCircle2 } from "lucide-react";
import { Survey } from "@/types";
import { API_BASE } from "@/lib/api";

interface Props {
  surveys: Survey[];
  token: string;
  onRefresh: () => void;
}

export default function SurveyTable({ surveys, token, onRefresh }: Props) {
  const [filterStatus, setFilterStatus] = useState<string>("semua");
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const filtered = surveys.filter((s) => {
    if (filterStatus === "semua") return true;
    return s.status === filterStatus;
  });

  const handleStatusChange = async (id: number, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`${API_BASE}/api/admin/surveys/${id}/status`, {
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

  const cleanPhoneForWa = (phone: string) => {
    let cleaned = phone.replace(/[^0-9]/g, "");
    if (cleaned.startsWith("0")) {
      cleaned = "62" + cleaned.slice(1);
    }
    return cleaned;
  };

  const countByStatus = (status: string) => {
    if (status === "semua") return surveys.length;
    return surveys.filter((s) => s.status === status).length;
  };

  return (
    <div className="space-y-6">
      {/* Status Filter dengan Badge Angka */}
      <div className="flex flex-wrap items-center gap-2">
        {["semua", "baru", "dikonfirmasi", "selesai", "dibatalkan"].map((st) => {
          const count = countByStatus(st);
          return (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 text-xs font-semibold capitalize transition-colors flex items-center gap-1.5 ${
                filterStatus === st
                  ? "bg-[#28a870] text-white"
                  : "bg-white text-[#3d5047] hover:text-[#0f1f1a]"
              }`}
            >
              <span>{st}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 font-bold ${
                  filterStatus === st
                    ? "bg-[#0f1f1a] text-[#3ecf8e]"
                    : "bg-[#f7faf8] text-[#6a8075]"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Table Container */}
      <div data-ui="survey-table" className="bg-white overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-[#f7faf8] text-[#3d5047] font-bold">
              <th className="py-3 px-4">Calon Pembeli</th>
              <th className="py-3 px-4">Unit Diminati</th>
              <th className="py-3 px-4">Jadwal Survey</th>
              <th className="py-3 px-4">Catatan Kunjungan</th>
              <th className="py-3 px-4">Status Pengajuan</th>
              <th className="py-3 px-4 text-right">Tindakan WA</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-[#6a8075]">
                  Tidak ada pengajuan survey dalam kategori ini.
                </td>
              </tr>
            ) : (
              filtered.map((s, idx) => {
                const waUrl = `https://wa.me/${cleanPhoneForWa(s.phone)}?text=${encodeURIComponent(
                  `Halo Bapak/Ibu ${s.name}, kami dari tim Klesi Property ingin mengonfirmasi jadwal survey untuk properti "${s.property_title || "Pilihan Anda"}" pada tanggal ${s.survey_date} pukul ${s.survey_time} WIB.`
                )}`;

                return (
                  <motion.tr
                    key={s.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.03 }}
                    className="hover:bg-[#f7faf8]/70 transition-colors"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-[#eaf6f0] flex items-center justify-center text-[#28a870] font-bold text-xs shrink-0">
                          <User className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="font-bold text-[#0f1f1a]">{s.name}</p>
                          <p className="text-[11px] text-[#6a8075] flex items-center gap-1">
                            <Phone className="w-3 h-3 text-[#28a870]" />
                            {s.phone}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-[#0f1f1a]">
                      <p>{s.property_title || `Unit #${s.property_id}`}</p>
                      {s.property_location && (
                        <p className="text-[11px] text-[#6a8075] font-normal">{s.property_location}</p>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-[#3d5047]">
                      <div className="flex items-center gap-1.5 font-medium">
                        <Calendar className="w-3 h-3 text-[#28a870]" />
                        <span>{s.survey_date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-[#6a8075] mt-0.5">
                        <Clock className="w-3 h-3 text-[#28a870]" />
                        <span>{s.survey_time} WIB</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-[#3d5047] max-w-xs truncate">
                      {s.message || "-"}
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={s.status}
                        disabled={updatingId === s.id}
                        onChange={(e) => handleStatusChange(s.id, e.target.value)}
                        className={`text-xs font-bold px-2 py-1 focus:outline-none cursor-pointer ${
                          s.status === "baru"
                            ? "bg-amber-50 text-amber-800"
                            : s.status === "dikonfirmasi"
                            ? "bg-blue-50 text-blue-800"
                            : s.status === "selesai"
                            ? "bg-[#eaf6f0] text-[#1f8b5b]"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        <option value="baru">Baru</option>
                        <option value="dikonfirmasi">Dikonfirmasi</option>
                        <option value="selesai">Selesai</option>
                        <option value="dibatalkan">Dibatalkan</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-[#28a870] hover:bg-[#1f8b5b] transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        Chat WA
                      </a>
                    </td>
                  </motion.tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
