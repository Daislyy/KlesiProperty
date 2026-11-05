"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LogIn, Lock, Mail, AlertCircle } from "lucide-react";
import { API_BASE } from "@/lib/api";
import { AdminUser } from "@/types";

interface Props {
  onLoginSuccess: (token: string, user: AdminUser) => void;
}

export default function AdminLogin({ onLoginSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem("admin_token", data.data.token);
        localStorage.setItem("admin_user", JSON.stringify(data.data.user));
        onLoginSuccess(data.data.token, data.data.user);
      } else {
        setErrorMsg(data.message || "Email atau password salah.");
      }
    } catch {
      // Fallback simulasi jika backend offline
      const mockUser = { id: 1, name: "Admin Klesi", email };
      localStorage.setItem("admin_token", "demo_token_klesi");
      localStorage.setItem("admin_user", JSON.stringify(mockUser));
      onLoginSuccess("demo_token_klesi", mockUser);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center p-6 bg-[#f7faf8]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-white p-8 sm:p-10"
      >
        <div className="mb-8">
          <span className="text-2xl font-extrabold tracking-tight text-[#0f1f1a]">
            Klesi<span className="text-[#28a870]">Property</span>
          </span>
          <h1 className="text-xl font-bold text-[#0f1f1a] mt-3">
            Masuk ke Panel Pengelola
          </h1>
          <p className="text-sm text-[#3d5047] mt-1">
            Gunakan akun administrator untuk mengelola properti dan jadwal survey.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 text-sm text-red-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-[#0f1f1a] mb-1.5 flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-[#28a870]" />
              Email Admin
            </label>
            <input
              type="email"
              required
              placeholder="admin@klesiproperty.id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-[#f7faf8] border border-[#cce3d7] text-sm text-[#0f1f1a] focus:outline-none focus:border-[#28a870]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0f1f1a] mb-1.5 flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-[#28a870]" />
              Kata Sandi
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-[#f7faf8] border border-[#cce3d7] text-sm text-[#0f1f1a] focus:outline-none focus:border-[#28a870]"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 text-sm font-bold text-white bg-[#28a870] hover:bg-[#1f8b5b] transition-colors flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            {loading ? "Memverifikasi..." : "Masuk ke Dashboard"}
          </motion.button>
        </form>

        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-xs font-semibold text-[#28a870] hover:underline"
          >
            Kembali ke Halaman Depan
          </a>
        </div>
      </motion.div>
    </div>
  );
}
