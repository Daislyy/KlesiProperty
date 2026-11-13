"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminHeader from "@/components/admin/AdminHeader";
import PropertyTable from "@/components/admin/PropertyTable";
import SurveyTable from "@/components/admin/SurveyTable";
import PropertyFormModal from "@/components/admin/PropertyFormModal";
import ImageUploadModal from "@/components/admin/ImageUploadModal";
import { Property, Survey, AdminUser } from "@/types";
import { API_BASE, DEFAULT_PROPERTIES } from "@/lib/api";
import { Building2, CheckCircle2, Clock, Plus } from "lucide-react";

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<"properties" | "surveys">("properties");
  const [properties, setProperties] = useState<Property[]>(DEFAULT_PROPERTIES);
  const [surveys, setSurveys] = useState<Survey[]>([]);

  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [managingImagesProperty, setManagingImagesProperty] = useState<Property | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const fetchProperties = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/properties?limit=50`);
      if (res.ok) {
        const json = await res.json();
        if (json.data?.length) setProperties(json.data);
      }
    } catch {
      // Fallback lokal
    }
  }, []);

  const fetchSurveys = useCallback(async (authToken: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/surveys`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) setSurveys(json.data);
      }
    } catch {
      setSurveys([
        {
          id: 1,
          property_id: 1,
          name: "Rian Hendra",
          phone: "08123456789",
          survey_date: "2026-11-12",
          survey_time: "10:00",
          message: "Ingin cek akses jalan dan sertifikat SHM.",
          status: "baru",
          property_title: "Rumah Kebun Parahyangan",
          property_location: "Bandung Barat",
        },
      ]);
    }
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem("admin_token");
    const savedUser = localStorage.getItem("admin_user");

    if (savedToken) {
      setToken(savedToken);
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          // ignore parsing error
        }
      }
      fetchProperties();
      fetchSurveys(savedToken);
    }
    setLoading(false);
  }, [fetchProperties, fetchSurveys]);

  const handleLoginSuccess = (newToken: string, newUser: AdminUser) => {
    setToken(newToken);
    setUser(newUser);
    fetchProperties();
    fetchSurveys(newToken);
    showToast("Berhasil masuk ke panel admin.");
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    setToken(null);
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 text-neutral-500 text-xs font-medium">
        Memeriksa sesi...
      </div>
    );
  }

  if (!token) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  const totalProps = properties.length;
  const availableProps = properties.filter((p) => p.status === "tersedia").length;
  const newSurveys = surveys.filter((s) => s.status === "baru").length;

  const stats = [
    {
      label: "Total Listing",
      value: totalProps,
      desc: "Unit aktif terdaftar",
      icon: Building2,
      accent: "text-neutral-900 bg-neutral-100",
    },
    {
      label: "Unit Tersedia",
      value: availableProps,
      desc: "Siap dipasarkan",
      icon: CheckCircle2,
      accent: "text-emerald-700 bg-emerald-50",
    },
    {
      label: "Survey Baru",
      value: newSurveys,
      desc: newSurveys > 0 ? "Perlu konfirmasi WhatsApp" : "Semua terjadwal",
      icon: Clock,
      accent: "text-neutral-900 bg-neutral-100",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50/70 text-neutral-900 flex flex-col font-sans">
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.95 }}
            className="fixed top-5 right-5 z-50 px-4 py-2.5 bg-neutral-950 text-white text-xs font-medium rounded-lg shadow-xl border border-neutral-800 flex items-center gap-2.5"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AdminHeader
        user={user}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={handleLogout}
        surveyCount={newSurveys}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200/60"
        >
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight">
              Ikhtisar Manajemen
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
              Kelola inventaris properti Jabodetabek dan respon permohonan survey calon pembeli.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setEditingProperty(null);
                setShowPropertyModal(true);
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-neutral-950 hover:bg-neutral-800 rounded-lg transition-all shadow-xs flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Properti</span>
            </button>
          </div>
        </motion.div>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                whileHover={{ y: -2 }}
                className="bg-white p-4 sm:p-5 rounded-xl border border-neutral-200/80 shadow-xs hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-neutral-500">{stat.label}</span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.accent}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
                  {stat.value}
                </div>
                <p className="text-[11px] text-neutral-400 mt-1 font-medium">{stat.desc}</p>
              </motion.div>
            );
          })}
        </section>

        <section className="bg-white rounded-xl border border-neutral-200/80 shadow-xs p-4 sm:p-6">
          {activeTab === "properties" ? (
            <PropertyTable
              properties={properties}
              token={token}
              onRefresh={() => {
                fetchProperties();
                showToast("Data properti diperbarui.");
              }}
              onAdd={() => {
                setEditingProperty(null);
                setShowPropertyModal(true);
              }}
              onEdit={(p) => {
                setEditingProperty(p);
                setShowPropertyModal(true);
              }}
              onManageImages={(p) => setManagingImagesProperty(p)}
            />
          ) : (
            <SurveyTable
              surveys={surveys}
              token={token}
              onRefresh={() => {
                fetchSurveys(token);
                showToast("Data jadwal survey diperbarui.");
              }}
            />
          )}
        </section>
      </main>

      {showPropertyModal && (
        <PropertyFormModal
          property={editingProperty}
          token={token}
          onClose={() => setShowPropertyModal(false)}
          onSuccess={() => {
            fetchProperties();
            showToast("Properti berhasil disimpan.");
          }}
        />
      )}

      {managingImagesProperty && (
        <ImageUploadModal
          property={managingImagesProperty}
          token={token}
          onClose={() => setManagingImagesProperty(null)}
          onSuccess={() => {
            fetchProperties();
            showToast("Galeri foto properti diperbarui.");
          }}
        />
      )}
    </div>
  );
}
