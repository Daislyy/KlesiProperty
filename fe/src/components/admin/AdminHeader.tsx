"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LogOut, ExternalLink, Building, CalendarCheck, User } from "lucide-react";
import { AdminUser } from "@/types";

interface Props {
  user: AdminUser | null;
  activeTab: "properties" | "surveys";
  onTabChange: (tab: "properties" | "surveys") => void;
  onLogout: () => void;
  surveyCount?: number;
}

export default function AdminHeader({
  user,
  activeTab,
  onTabChange,
  onLogout,
  surveyCount = 0,
}: Props) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt="KlesiProperty Logo"
              width={26}
              height={26}
              className="w-6.5 h-6.5 object-contain"
              priority
            />
            <div className="flex items-baseline gap-1.5">
              <span className="font-extrabold text-lg tracking-tight uppercase text-neutral-950">
                KlesiProperty<span className="text-neutral-400">.</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 bg-neutral-100 text-neutral-600 rounded">
                Admin
              </span>
            </div>
          </div>

          <nav className="hidden sm:flex items-center p-1 bg-neutral-100 rounded-lg">
            <button
              type="button"
              onClick={() => onTabChange("properties")}
              className={`relative px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "properties"
                  ? "bg-neutral-950 text-white shadow-xs"
                  : "text-neutral-600 hover:text-neutral-950"
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              <span>Kelola Properti</span>
            </button>

            <button
              type="button"
              onClick={() => onTabChange("surveys")}
              className={`relative px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "surveys"
                  ? "bg-neutral-950 text-white shadow-xs"
                  : "text-neutral-600 hover:text-neutral-950"
              }`}
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Jadwal Survey</span>
              {surveyCount > 0 && (
                <span className="px-1.5 py-0.2 bg-neutral-800 text-white text-[10px] font-bold rounded-full">
                  {surveyCount}
                </span>
              )}
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 pl-3">
            <div className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-700">
              <User className="w-4 h-4" />
            </div>
            <div className="text-left hidden md:block">
              <p className="text-xs font-semibold text-neutral-950 leading-none">
                {user?.name || "Administrator"}
              </p>
              <p className="text-[11px] text-neutral-500 mt-0.5">
                {user?.email || "admin@klesiproperty.id"}
              </p>
            </div>
          </div>

          <div className="h-4 w-px bg-neutral-200 hidden sm:block" />

          <a
            href="/"
            target="_blank"
            className="p-2 text-neutral-500 hover:text-neutral-950 hover:bg-neutral-100 rounded-md transition-colors"
            title="Lihat Website Publik"
          >
            <ExternalLink className="w-4 h-4" />
          </a>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onLogout}
            className="px-3 py-1.5 text-xs font-medium text-neutral-700 hover:text-red-700 hover:bg-red-50 border border-neutral-200 hover:border-red-200 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Keluar</span>
          </motion.button>
        </div>
      </div>

      <div className="sm:hidden flex border-t border-neutral-200 p-1.5 bg-neutral-50">
        <button
          type="button"
          onClick={() => onTabChange("properties")}
          className={`flex-1 py-1.5 text-xs font-medium rounded transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "properties"
              ? "bg-neutral-950 text-white"
              : "text-neutral-600"
          }`}
        >
          <Building className="w-3.5 h-3.5" />
          Properti
        </button>
        <button
          type="button"
          onClick={() => onTabChange("surveys")}
          className={`flex-1 py-1.5 text-xs font-medium rounded transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "surveys"
              ? "bg-neutral-950 text-white"
              : "text-neutral-600"
          }`}
        >
          <CalendarCheck className="w-3.5 h-3.5" />
          Survey {surveyCount > 0 ? `(${surveyCount})` : ""}
        </button>
      </div>
    </header>
  );
}
