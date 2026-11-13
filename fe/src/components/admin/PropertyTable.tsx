"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Plus,
  Edit3,
  ImagePlus,
  Trash2,
  Search,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Property } from "@/types";
import { formatRupiah, resolveImageUrl, API_BASE } from "@/lib/api";
import DeleteConfirmModal from "./DeleteConfirmModal";

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
  const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filtered = properties.filter((p) => {
    const matchType = typeFilter === "semua" || p.type.toLowerCase() === typeFilter;
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase()) ||
      p.address?.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  const confirmDelete = async () => {
    if (!propertyToDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/properties/${propertyToDelete.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) onRefresh();
    } catch {
      onRefresh();
    } finally {
      setIsDeleting(false);
      setPropertyToDelete(null);
    }
  };

  const handleToggleFeatured = async (p: Property) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/properties/${p.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ is_featured: !p.is_featured }),
      });
      if (res.ok) onRefresh();
    } catch {
      onRefresh();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari judul atau lokasi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8.5 pr-3 py-2 bg-neutral-50 border border-neutral-200 text-xs rounded-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all w-60 sm:w-72"
            />
          </div>

          <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-lg">
            {[
              { id: "semua", label: "Semua" },
              { id: "rumah", label: "Rumah" },
              { id: "tanah", label: "Tanah" },
              { id: "ruko", label: "Komersial" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setTypeFilter(cat.id)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  typeFilter === cat.id
                    ? "bg-white text-neutral-950 shadow-xs"
                    : "text-neutral-600 hover:text-neutral-950"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="px-3.5 py-2 text-xs font-medium text-white bg-neutral-950 hover:bg-neutral-800 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-98"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Tambah Unit</span>
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="p-12 text-center bg-neutral-50/50 rounded-xl border border-dashed border-neutral-200 text-neutral-500">
          <p className="text-xs font-semibold text-neutral-800">Tidak ada unit properti yang cocok.</p>
          <p className="text-[11px] text-neutral-400 mt-1">Coba sesuaikan kata kunci pencarian atau tambah unit baru.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => {
            const photoCount = item.images ? item.images.length : item.primary_image ? 1 : 0;

            return (
              <div
                key={item.id}
                className="group bg-white rounded-xl border border-neutral-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 w-full bg-neutral-100 overflow-hidden">
                    <Image
                      src={resolveImageUrl(item.primary_image)}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-103 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />

                    <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                      <span className="bg-neutral-950/85 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded capitalize">
                        {item.type}
                      </span>
                      {item.is_featured && (
                        <span className="bg-amber-400 text-neutral-950 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-xs">
                          <Star className="w-3 h-3 fill-neutral-950" />
                          Hero
                        </span>
                      )}
                      <span className="bg-white/90 text-neutral-900 text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 backdrop-blur-xs">
                        <ShieldCheck className="w-3 h-3 text-neutral-800" />
                        SHM
                      </span>
                    </div>

                    <div className="absolute top-2.5 right-2.5 flex gap-1">
                      <span className="bg-neutral-950/70 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded">
                        {photoCount}/3 Foto
                      </span>
                      <span className="bg-white/90 backdrop-blur-xs text-neutral-900 text-[10px] font-semibold px-2 py-0.5 rounded capitalize">
                        {item.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-lg font-extrabold tracking-tight text-neutral-950 mb-1">
                      {formatRupiah(item.price)}
                    </p>

                    <h3 className="text-sm font-semibold text-neutral-900 line-clamp-1">
                      {item.title}
                    </h3>

                    <p className="text-[11px] text-neutral-500 flex items-center gap-1 mt-1 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </p>

                    <div className="grid grid-cols-3 gap-2 p-2 bg-neutral-50 rounded-lg text-[11px] text-neutral-600">
                      {item.type === "tanah" ? (
                        <div className="col-span-3 flex items-center gap-1.5">
                          <Maximize2 className="w-3.5 h-3.5 text-neutral-400" />
                          <span>LT: {item.land_area} m²</span>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-1">
                            <Bed className="w-3 h-3 text-neutral-400" />
                            <span>{item.bedrooms} KT</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Bath className="w-3 h-3 text-neutral-400" />
                            <span>{item.bathrooms} KM</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Maximize2 className="w-3.5 h-3.5 text-neutral-400" />
                            <span>{item.land_area || "-"}/{item.building_area || "-"}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleToggleFeatured(item)}
                    className={`p-2 rounded-lg text-xs transition-colors cursor-pointer ${
                      item.is_featured
                        ? "bg-amber-100 text-amber-900 hover:bg-amber-200"
                        : "bg-neutral-100 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200"
                    }`}
                    title={
                      item.is_featured
                        ? "Properti Hero Beranda (Aktif) - Klik untuk matikan"
                        : "Jadikan Properti Unggulan di Hero Section"
                    }
                  >
                    <Star
                      className={`w-3.5 h-3.5 ${
                        item.is_featured ? "fill-amber-500 text-amber-500" : ""
                      }`}
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => onManageImages(item)}
                    className="flex-1 py-1.5 px-2.5 text-xs font-medium text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <ImagePlus className="w-3.5 h-3.5 text-neutral-600" />
                    <span>Foto ({photoCount})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onEdit(item)}
                    className="p-2 text-xs font-medium text-neutral-700 hover:text-neutral-950 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
                    title="Edit properti"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setPropertyToDelete(item)}
                    className="p-2 text-xs font-medium text-neutral-400 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Hapus properti"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <DeleteConfirmModal
        isOpen={!!propertyToDelete}
        title="Hapus Properti"
        itemName={propertyToDelete?.title}
        description="Listing beserta seluruh data spesifikasi dan foto unit akan dihapus permanen dari sistem."
        loading={isDeleting}
        onConfirm={confirmDelete}
        onClose={() => setPropertyToDelete(null)}
      />
    </div>
  );
}
