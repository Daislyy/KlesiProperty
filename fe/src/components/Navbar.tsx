"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "Katalog", id: "katalog" },
    { label: "Standar Audit", id: "standar" },
    { label: "Simulasi KPR", id: "kpr" },
    { label: "Jadwal Survey", id: "survey" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4 pb-2 transition-all duration-300">
      <div
        className={`max-w-6xl mx-auto px-5 sm:px-7 py-3 rounded-full transition-all duration-300 flex items-center justify-between ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_8px_30px_rgba(15,31,26,0.08)] border border-[#d6e5dd]"
            : "bg-white/80 backdrop-blur-sm border border-[#e2ede7] shadow-[0_4px_20px_rgba(15,31,26,0.04)]"
        }`}
      >
        {/* Brandmark dengan sudut membulat lembut */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2.5 text-lg sm:text-xl font-extrabold tracking-tight text-[#0f1f1a]"
        >
          <div className="w-8 h-8 rounded-xl bg-[#0f1f1a] text-[#3ecf8e] flex items-center justify-center font-bold text-xs tracking-tighter shadow-sm">
            KP
          </div>
          <span className="flex items-center">
            Klesi<span className="text-[#28a870]">Property</span>
          </span>
          <span className="hidden lg:inline-flex items-center gap-1 text-[11px] font-semibold text-[#1f8b5b] bg-[#eaf6f0] px-2.5 py-0.5 rounded-full ml-1.5 border border-[#cce3d7]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#28a870]" />
            SHM Terverifikasi
          </span>
        </a>

        {/* Menu Navigasi Desktop */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-bold text-[#3d5047]">
          {navLinks.map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => scrollTo(e, id)}
              className="hover:text-[#28a870] transition-colors py-1 cursor-pointer"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Tombol Aksi Kanan */}
        <div className="flex items-center gap-2.5">
          <a
            href="#survey"
            onClick={(e) => scrollTo(e, "survey")}
            className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-[#28a870] hover:bg-[#1f8b5b] rounded-full transition-colors shadow-sm"
          >
            <span>Pesan Survey</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-8 h-8 rounded-full flex items-center justify-center text-[#0f1f1a] bg-[#eaf6f0] hover:bg-[#d8ece1] transition-colors"
            aria-label="Menu navigasi"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Menu Seluler Melayang */}
      {mobileMenuOpen && (
        <div className="md:hidden max-w-sm mx-auto mt-2 p-5 bg-white rounded-3xl border border-[#d6e5dd] shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-3 text-sm font-bold text-[#0f1f1a]">
            {navLinks.map(({ label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => scrollTo(e, id)}
                className="p-2.5 rounded-2xl hover:bg-[#f7faf8] hover:text-[#28a870] transition-colors"
              >
                {label}
              </a>
            ))}
            <a
              href="#survey"
              onClick={(e) => scrollTo(e, "survey")}
              className="mt-2 text-center py-2.5 rounded-2xl text-xs font-bold text-white bg-[#28a870] hover:bg-[#1f8b5b]"
            >
              Pesan Survey Lokasi Gratis
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
