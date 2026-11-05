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
import { Building, Calendar, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Dashboard Data State
  const [activeTab, setActiveTab] = useState<"properties" | "surveys">("properties");
  const [properties, setProperties] = useState<Property[]>(DEFAULT_PROPERTIES);
  const [surveys, setSurveys] = useState<Survey[]>([]);

  // Modal States
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [managingImagesProperty, setManagingImagesProperty] = useState<Property | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Ambil data properti
  const fetchProperties = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/properties?limit=50`);
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0) {
          setProperties(json.data);
        }
      }
    } catch {
      // Offline fallback
    }
  }, []);

  // Ambil data survey admin
  const fetchSurveys = useCallback(async (authToken: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/surveys`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setSurveys(json.data);
        }
      }
    } catch {
      setSurveys([
        {
          id: 1,
          property_id: 1,
          name: "Rian Hendra",
          phone: "08123456789",
          survey_date: "2026-11-08",
          survey_time: "10:00",
          message: "Ingin lihat saluran air dan sertifikat tanah.",
          status: "baru",
          property_title: "Rumah Kebun Parahyangan",
          property_location: "Bandung Barat",
        },
      ]);
    }
  }, []);

  // Cek token di localStorage saat startup
  useEffect(() => {
    const savedToken = localStorage.getItem("admin_token");
    const savedUser = localStorage.getItem("admin_user");

    if (savedToken) {
      setToken(savedToken);
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          // ignore error
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
      <div className="min-h-[100dvh] flex items-center justify-center bg-[#f7faf8] text-[#3d5047] text-sm">
        Memeriksa sesi login...
      </div>
    );
  }

  // Jika belum login, tampilkan layar login
  if (!token) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  // Statistik Ringkas
  const totalProps = properties.length;
  const availableProps = properties.filter((p) => p.status === "tersedia").length;
  const newSurveys = surveys.filter((s) => s.status === "baru").length;
  const totalSurveys = surveys.length;

  return (
    <div className="min-h-[100dvh] bg-[#f7faf8] text-[#0f1f1a]">
      {/* Toast Feedback */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-50 px-4 py-2.5 bg-[#0f1f1a] text-white text-xs font-bold flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-[#3ecf8e]" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Admin */}
      <AdminHeader
        user={user}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={handleLogout}
        surveyCount={newSurveys}
      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Metric Cards Panel */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-5"
          >
            <div className="flex items-center justify-between text-[#6a8075] mb-2">
              <span className="text-xs font-semibold">Total Unit Terdaftar</span>
              <div className="w-8 h-8 bg-[#eaf6f0] flex items-center justify-center text-[#28a870]">
                <Building className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-[#0f1f1a]">{totalProps}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="bg-white p-5"
          >
            <div className="flex items-center justify-between text-[#6a8075] mb-2">
              <span className="text-xs font-semibold">Unit Siap Huni</span>
              <div className="w-8 h-8 bg-[#eaf6f0] flex items-center justify-center text-[#28a870]">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-[#1f8b5b]">{availableProps}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white p-5"
          >
            <div className="flex items-center justify-between text-[#6a8075] mb-2">
              <span className="text-xs font-semibold">Survey Baru (Pending)</span>
              <div className="w-8 h-8 bg-amber-50 flex items-center justify-center text-amber-600">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-amber-700">{newSurveys}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="bg-white p-5"
          >
            <div className="flex items-center justify-between text-[#6a8075] mb-2">
              <span className="text-xs font-semibold">Total Jadwal Kunjungan</span>
              <div className="w-8 h-8 bg-[#eaf6f0] flex items-center justify-center text-[#28a870]">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-[#0f1f1a]">{totalSurveys}</p>
          </motion.div>
        </div>

        {/* Konten Tab Aktif */}
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
              showToast("Status survey diperbarui.");
            }}
          />
        )}
      </main>

      {/* Modal Tambah/Edit Properti */}
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

      {/* Modal Kelola Foto Properti */}
      {managingImagesProperty && (
        <ImageUploadModal
          property={managingImagesProperty}
          token={token}
          onClose={() => setManagingImagesProperty(null)}
          onSuccess={() => {
            fetchProperties();
            showToast("Foto properti diperbarui.");
          }}
        />
      )}
    </div>
  );
}
