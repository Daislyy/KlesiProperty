"use client";

import { motion } from "framer-motion";
import { LogOut, ExternalLink, Building, CalendarCheck, ShieldCheck, User } from "lucide-react";
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
    <header className="bg-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Brand & Tab Navigation */}
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3 mr-2">
            <span className="text-xl font-bold tracking-tight text-[#0f1f1a]">
              Klesi<span className="text-[#28a870]">Admin</span>
            </span>

            {/* Live Indicator */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#eaf6f0] text-[#1f8b5b] text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#28a870]" />
              Sistem Aktif
            </div>
          </div>

          <div className="flex items-center gap-1 bg-[#f7faf8] p-1">
            <button
              onClick={() => onTabChange("properties")}
              className={`px-4 py-2 text-xs font-bold flex items-center gap-2 transition-colors relative ${
                activeTab === "properties"
                  ? "bg-[#28a870] text-white"
                  : "text-[#3d5047] hover:text-[#0f1f1a]"
              }`}
            >
              <Building className="w-4 h-4" />
              Kelola Properti
            </button>

            <button
              onClick={() => onTabChange("surveys")}
              className={`px-4 py-2 text-xs font-bold flex items-center gap-2 transition-colors relative ${
                activeTab === "surveys"
                  ? "bg-[#28a870] text-white"
                  : "text-[#3d5047] hover:text-[#0f1f1a]"
              }`}
            >
              <CalendarCheck className="w-4 h-4" />
              Jadwal Survey
              {surveyCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-[#0f1f1a] text-[#3ecf8e] text-[10px] font-extrabold">
                  {surveyCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* User Info & Actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#e2ede7] flex items-center justify-center text-[#28a870]">
              <User className="w-4 h-4" />
            </div>
            <div className="text-right hidden md:block">
              <p className="text-xs font-bold text-[#0f1f1a]">{user?.name || "Admin"}</p>
              <p className="text-[10px] text-[#6a8075]">{user?.email || "admin@padly.com"}</p>
            </div>
          </div>

          <a
            href="/"
            target="_blank"
            className="p-2 text-[#3d5047] hover:text-[#0f1f1a] hover:bg-[#f7faf8] transition-colors"
            title="Buka Landing Page"
          >
            <ExternalLink className="w-4 h-4" />
          </a>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onLogout}
            className="px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            Keluar
          </motion.button>
        </div>
      </div>
    </header>
  );
}
