"use client";

import { Trash2, X } from "lucide-react";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  title: string;
  itemName?: string;
  description?: string;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function DeleteConfirmModal({
  isOpen,
  title,
  itemName,
  description = "Tindakan ini permanen dan tidak dapat dibatalkan.",
  loading = false,
  onConfirm,
  onClose,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-neutral-200 rounded-xl w-full max-w-sm p-5 shadow-xl relative">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
            <Trash2 className="w-4 h-4" />
          </div>

          <div className="flex-1 pr-4">
            <h3 className="text-sm font-bold text-neutral-950">{title}</h3>
            {itemName && (
              <p className="text-xs font-semibold text-neutral-800 mt-0.5 line-clamp-1">
                &ldquo;{itemName}&rdquo;
              </p>
            )}
            <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 mt-5 pt-3 border-t border-neutral-100">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-3.5 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
          >
            {loading ? "Menghapus..." : "Ya, Hapus"}
          </button>
        </div>
      </div>
    </div>
  );
}
