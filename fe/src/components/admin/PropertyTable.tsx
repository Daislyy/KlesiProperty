"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit3,
  ImagePlus,
  Trash2,
  Search,
  MapPin,
  Home,
  Store,
  Layers,
  Sparkles,
  Bed,
  Bath,
  Maximize2,
} from "lucide-react";
import { Property } from "@/types";
import { formatRupiah, resolveImageUrl, API_BASE } from "@/lib/api";

interface Props {
  properties: Property[];
  token: string;
  onRefresh: () => void;
  onAdd: () => void;
  onEdit: (p: Property) => void;
  onManageImages: (p: Property) => void;
}

export default function PropertyTable({
  properties,
  token,
  onRefresh,
  onAdd,
  onEdit,
  onManageImages,
}: Props) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("semua");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const filtered = properties.filter((p) => {
    const matchType = typeFilter === "semua" || p.type.toLowerCase() === typeFilter;
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  const handleDelete = async (property: Property) => {
    if (!confirm(`Hapus properti "${property.title}"? Semua foto terkait juga akan dihapus.`)) {
      return;
    }

    setDeletingId(property.id);
    try {
      const res = await fetch(`${API_BASE}/api/admin/properties/${property.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        onRefresh();
      } else {
        alert("Gagal menghapus properti.");
      }
    } catch {
      alert("Gagal menghubungi server.");
    } finally {
      setDeletingId(null);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "rumah":
        return <Home className="w-3.5 h-3.5 text-[#28a870]" />;
      case "ruko":
        return <Store className="w-3.5 h-3.5 text-[#28a870]" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-[#28a870]" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Filter & Add Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-[#6a8075] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari judul atau lokasi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-[#cce3d7] text-xs text-[#0f1f1a] focus:outline-none focus:border-[#28a870] w-64"
            />
          </div>

          <div className="flex items-center gap-1 bg-white p-1">
            {["semua", "rumah", "ruko", "tanah"].map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1 text-xs font-semibold capitalize transition-colors ${
                  typeFilter === t
                    ? "bg-[#28a870] text-white"
                    : "text-[#3d5047] hover:text-[#0f1f1a]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <span className="text-xs text-[#6a8075]">
            Menampilkan {filtered.length} dari {properties.length} unit
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAdd}
          className="px-4 py-2 text-xs font-bold text-white bg-[#28a870] hover:bg-[#1f8b5b] transition-colors flex items-center justify-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Tambah Properti Baru
        </motion.button>
      </div>

      {/* Table Container */}
      <div data-ui="property-table" className="bg-white overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-[#f7faf8] text-[#3d5047] font-bold">
              <th className="py-3 px-4">Foto</th>
              <th className="py-3 px-4">Judul & Lokasi</th>
              <th className="py-3 px-4">Tipe</th>
              <th className="py-3 px-4">Harga Jual</th>
              <th className="py-3 px-4">Spesifikasi Fisik</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Tindakan</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-[#6a8075]">
                  Tidak ada properti yang cocok dengan pencarian.
                </td>
              </tr>
            ) : (
              filtered.map((p, idx) => (
                <motion.tr
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.03 }}
                  className="hover:bg-[#f7faf8]/70 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="relative w-16 h-12 bg-[#e2ede7] overflow-hidden">
                      <Image
                        src={resolveImageUrl(p.primary_image)}
                        alt={p.title}
                        fill
                        className="object-cover"
                      />
                      {p.is_featured && (
                        <span className="absolute bottom-0 inset-x-0 bg-[#0f1f1a] text-[#3ecf8e] text-[8px] font-extrabold text-center py-0.5">
                          UNGGULAN
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <p className="font-bold text-[#0f1f1a] flex items-center gap-1.5">
                      {p.title}
                      {p.is_featured && <Sparkles className="w-3 h-3 text-[#28a870]" />}
                    </p>
                    <p className="text-[11px] text-[#6a8075] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#28a870]" />
                      {p.location}
                    </p>
                  </td>

                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1.5 font-semibold text-[#0f1f1a] capitalize">
                      {getTypeIcon(p.type)}
                      {p.type}
                    </span>
                  </td>

                  <td className="py-3 px-4 font-bold text-[#28a870]">
                    {formatRupiah(p.price)}
                  </td>

                  <td className="py-3 px-4 text-[#3d5047]">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Bed className="w-3 h-3 text-[#6a8075]" /> {p.bedrooms}
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath className="w-3 h-3 text-[#6a8075]" /> {p.bathrooms}
                      </span>
                      <span className="flex items-center gap-1">
                        <Maximize2 className="w-3 h-3 text-[#6a8075]" /> {p.land_area || p.building_area || "-"} m²
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 font-bold text-[10px] capitalize ${
                        p.status === "tersedia"
                          ? "bg-[#eaf6f0] text-[#1f8b5b]"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          p.status === "tersedia" ? "bg-[#28a870]" : "bg-gray-400"
                        }`}
                      />
                      {p.status}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onManageImages(p)}
                        className="p-1.5 text-[#3d5047] hover:text-[#28a870] hover:bg-[#eaf6f0] transition-colors"
                        title="Kelola Foto Galeri"
                      >
                        <ImagePlus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onEdit(p)}
                        className="p-1.5 text-[#3d5047] hover:text-[#0f1f1a] hover:bg-[#f7faf8] transition-colors"
                        title="Edit Data Unit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p)}
                        disabled={deletingId === p.id}
                        className="p-1.5 text-[#3d5047] hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Hapus Properti"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
