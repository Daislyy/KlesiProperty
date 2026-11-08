"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("beranda");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setActiveNav(targetId);
    setMobileMenuOpen(false);
    if (targetId === "beranda") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "Katalog", id: "katalog" },
    { label: "Keunggulan", id: "keunggulan" },
    { label: "Testimoni", id: "testimoni" },
    { label: "FAQ", id: "faq" },
    { label: "Survey", id: "survey" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Location Badge */}
        <div className="flex items-center gap-3">
          <a
            href="#katalog"
            onClick={(e) => scrollTo(e, "katalog")}
            className={`hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-colors ${
              scrolled
                ? "bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
                : "bg-white/15 text-white backdrop-blur-md border border-white/20 hover:bg-white/25"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            Jabodetabek
          </a>
        </div>

        {/* Center: Brand Monogram / Logo */}
        <a
          href="#"
          onClick={(e) => scrollTo(e, "beranda")}
          className="flex items-center gap-2 group"
        >
          <span
            className={`font-extrabold text-xl sm:text-2xl tracking-tight uppercase transition-colors ${
              scrolled ? "text-neutral-950" : "text-white"
            }`}
          >
            KlesiProperty<span className={scrolled ? "text-neutral-900" : "text-white"}>.</span>
          </span>
        </a>

        {/* Right: Navigation Links & CTA */}
        <div className="flex items-center gap-2 sm:gap-6">
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => scrollTo(e, link.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
                  activeNav === link.id
                    ? scrolled
                      ? "bg-neutral-950 text-white"
                      : "bg-white text-neutral-950"
                    : scrolled
                    ? "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="https://wa.me/6281319233748"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 shadow-xs ${
              scrolled
                ? "bg-neutral-950 text-white hover:bg-neutral-800"
                : "bg-white text-neutral-950 hover:bg-neutral-100"
            }`}
          >
            <span>Hubungi Kami</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled ? "text-neutral-950 hover:bg-neutral-100" : "text-white hover:bg-white/10"
            }`}
            aria-label="Buka menu navigasi"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-neutral-200 px-4 py-4 space-y-2 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => scrollTo(e, link.id)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-neutral-800 hover:bg-neutral-50"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/6281319233748"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center mt-3 py-2.5 px-4 rounded-xl bg-neutral-950 text-white text-sm font-semibold"
          >
            WhatsApp: 0813-1923-3748
          </a>
        </div>
      )}
    </header>
  );
}
