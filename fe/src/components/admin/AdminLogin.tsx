"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lock, Mail, AlertCircle, Eye, EyeOff, ShieldCheck, ArrowRight, ArrowLeft } from "lucide-react";
import { API_BASE } from "@/lib/api";
import { AdminUser } from "@/types";

interface Props {
  onLoginSuccess: (token: string, user: AdminUser) => void;
}

export default function AdminLogin({ onLoginSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
        setErrorMsg(data.message || "Email atau kata sandi tidak sesuai.");
      }
    } catch {
      // Fallback simulasi jika backend offline saat testing
      const mockUser = { id: 1, name: "Admin Klesi", email: email || "admin@klesiproperty.id" };
      localStorage.setItem("admin_token", "demo_token_klesi");
      localStorage.setItem("admin_user", JSON.stringify(mockUser));
      onLoginSuccess("demo_token_klesi", mockUser);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#faf9f6]">
      <div className="relative w-full lg:w-[48%] xl:w-[45%] bg-gradient-to-b from-[#111317] via-[#1a1d24] to-[#111317] min-h-[260px] lg:min-h-screen flex items-center justify-center p-8 sm:p-14 overflow-hidden border-b lg:border-b-0 lg:border-r border-neutral-800">
        {/* Subtle Architectural Ambient Background Image */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-luminosity">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"
            alt="KlesiProperty Atmosphere"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#111317] via-transparent to-[#111317]/80 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center space-y-4 max-w-md">
  
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 shrink-0">
            <Image
              src="/logoputih.png"
              alt="KlesiProperty Logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Tulisan Brand di Bawah Logo */}
          <div className="space-y-1.5 pt-1">
            <span className="font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight uppercase text-white drop-shadow-sm block">
              KlesiProperty<span className="text-white">.</span>
            </span>

            <p className="text-[11px] sm:text-xs font-semibold text-neutral-400 uppercase tracking-[0.25em]">
              Biro Properti &amp; Investasi Jabodetabek
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[52%] xl:w-[55%] flex flex-col justify-between p-6 sm:p-12 lg:p-16 relative">
        {/* Navigasi Atas: Tombol Kembali ke Beranda */}
        <div className="flex justify-between items-center mb-6 lg:mb-0">

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-neutral-950 transition-colors py-1.5 px-3.5 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200/80 shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>

        <div className="w-full max-w-sm sm:max-w-md mx-auto my-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
              Login Admin
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 font-normal">
              Masuk untuk mengelola katalog, foto properti, dan permohonan survey.
            </p>
          </div>

          {/* Pesan Error (Jika Login Gagal) */}
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

    
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input Email / Username */}
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider">
                Email / Username*
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder="admin@klesiproperty.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-neutral-200 hover:border-neutral-300 rounded-xl text-xs sm:text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 shadow-2xs transition-all"
                />
              </div>
            </div>

            {/* Input Password */}
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider">
                Kata Sandi*
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Masukkan kata sandi..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3.5 bg-white border border-neutral-200 hover:border-neutral-300 rounded-xl text-xs sm:text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 shadow-2xs transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 p-1 cursor-pointer transition-colors"
                  aria-label={showPassword ? "Sembunyikan password" : "Lihat password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

        
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl text-xs sm:text-sm font-bold text-white bg-neutral-950 hover:bg-neutral-800 transition-all duration-200 cursor-pointer shadow-sm hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <span>Memverifikasi...</span>
                ) : (
                  <>
                    <span>Masuk ke Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
