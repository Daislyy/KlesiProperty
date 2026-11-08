"use client";

import { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Camera,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Property } from "@/types";
import { resolveImageUrl, formatRupiah } from "@/lib/api";

interface Props {
  property: Property;
  onDetail: (p: Property) => void;
  onSurvey: (id: number) => void;
}

export default function PropertyCard({ property, onDetail, onSurvey }: Props) {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const isLand = property.type.toLowerCase() === "tanah";

  const images =
    property.images && property.images.length > 0
      ? property.images.map((img) => img.image_url)
      : [property.primary_image || ""];

  const photoCount = images.length;
  const currentPhoto = images[activePhotoIdx] || property.primary_image;

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const getWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Halo KlesiProperty, saya tertarik dan ingin menanyakan unit: "${property.title}" seharga ${formatRupiah(
        property.price
      )} di ${property.location}.`
    );
    return `https://wa.me/6281319233748?text=${text}`;
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col border border-neutral-200/80 group">
      {/* Visual Image Viewport dengan Navigasi Foto */}
      <div className="relative aspect-[16/11] overflow-hidden bg-neutral-100">
        <Image
          src={resolveImageUrl(currentPhoto)}
          alt={`${property.title} - Foto ${activePhotoIdx + 1}`}
          fill
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {/* Top Floating Badges (Monochrome) */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="px-2.5 py-0.5 rounded-full bg-neutral-950 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
            SHM
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-sm text-neutral-900 border border-neutral-200 text-[10px] font-semibold shadow-xs">
            {property.status === "tersedia" ? "Siap Huni" : property.status}
          </span>
        </div>

        {/* Tombol Geser Foto (Muncul jika ada lebih dari 1 foto) */}
        {photoCount > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevPhoto}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
              aria-label="Foto sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextPhoto}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
              aria-label="Foto selanjutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Indikator Titik Foto */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePhotoIdx(i);
                  }}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    activePhotoIdx === i ? "w-3 bg-white" : "w-1.5 bg-white/60"
                  }`}
                  aria-label={`Lihat foto ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Bottom Right Photo Counter */}
        <div className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-sm text-white text-[10px] font-medium flex items-center gap-1.5 z-10">
          <Camera className="w-3 h-3 text-white" />
          <span>{photoCount} Foto</span>
        </div>
      </div>

      {/* Konten Card */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          {/* Lokasi */}
          <div className="flex items-center gap-1 text-neutral-500 text-xs mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-neutral-900 shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* Judul Unit */}
          <h3 className="text-sm sm:text-base text-neutral-950 font-bold leading-snug line-clamp-1 mb-2">
            {property.title}
          </h3>

          {/* Harga */}
          <div>
            <span className="text-base sm:text-lg font-extrabold text-neutral-950 tracking-tight">
              {formatRupiah(property.price)}
            </span>
          </div>
        </div>

        {/* Specs Row */}
        <div className="py-2 px-3 bg-neutral-50 rounded-xl grid grid-cols-4 gap-1 text-center border border-neutral-150">
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-neutral-400 font-medium">LT</span>
            <span className="text-xs font-bold text-neutral-800">{property.land_area || "-"} m²</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-neutral-400 font-medium">LB</span>
            <span className="text-xs font-bold text-neutral-800">{property.building_area || "-"} m²</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-neutral-400 font-medium">KT</span>
            <span className="text-xs font-bold text-neutral-800">{isLand ? "-" : property.bedrooms}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-neutral-400 font-medium">KM</span>
            <span className="text-xs font-bold text-neutral-800">{isLand ? "-" : property.bathrooms}</span>
          </div>
        </div>

        {/* Actions Button Group (Monochrome) */}
        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => onDetail(property)}
            className="flex-1 py-2 px-3 rounded-xl bg-neutral-100 text-neutral-900 hover:bg-neutral-200 transition-colors text-center text-xs font-semibold cursor-pointer"
          >
            Detail
          </button>
          <button
            type="button"
            onClick={() => onSurvey(property.id)}
            className="flex-1 py-2 px-3 rounded-xl bg-neutral-950 text-white hover:bg-neutral-800 transition-colors text-center text-xs font-semibold shadow-xs cursor-pointer"
          >
            Survey
          </button>
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-neutral-100 text-neutral-900 hover:bg-neutral-200 transition-colors flex items-center justify-center shrink-0 border border-neutral-200 cursor-pointer"
            title="Tanya via WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
