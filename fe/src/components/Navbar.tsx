"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ShieldCheck, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "Katalog Properti", id: "katalog" },
    { label: "Standar Verifikasi", id: "standar" },
    { label: "Simulasi KPR", id: "kpr" },
    { label: "Jadwal Survey", id: "survey" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[padding,background-color] duration-300 ${
        scrolled ? "py-3 bg-[#f7faf8]" : "py-5 bg-[#f7faf8]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brandmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="group flex items-center gap-2.5 text-xl font-extrabold tracking-tight text-[#0f1f1a]"
        >
          <div className="w-8 h-8 bg-[#0f1f1a] text-[#3ecf8e] flex items-center justify-center font-bold text-sm tracking-tighter">
            KP
          </div>
          <span className="flex items-center">
            Klesi<span className="text-[#28a870]">Property</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-[#1f8b5b] bg-[#eaf6f0] px-2 py-0.5 ml-1">
            <ShieldCheck className="w-3 h-3 text-[#28a870]" />
            SHM Terverifikasi
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#3d5047]">
          {navLinks.map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => scrollTo(e, id)}
              className="hover:text-[#0f1f1a] transition-colors py-1"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <motion.a
            href="#survey"
            onClick={(e) => scrollTo(e, "survey")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="hidden sm:inline-flex px-5 py-2.5 text-xs font-bold text-white bg-[#28a870] hover:bg-[#1f8b5b] transition-colors"
          >
            Pesan Survey Lokasi
          </motion.a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#0f1f1a] bg-[#eaf6f0] hover:bg-[#d8ece1] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white px-6 py-4 space-y-3">
          {navLinks.map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => scrollTo(e, id)}
              className="block text-sm font-semibold text-[#0f1f1a] py-2"
            >
              {label}
            </a>
          ))}
          <a
            href="#survey"
            onClick={(e) => scrollTo(e, "survey")}
            className="block text-center text-xs font-bold text-white bg-[#28a870] py-3 mt-2"
          >
            Pesan Survey Lokasi
          </a>
        </div>
      )}
    </header>
  );
}
