"use client";

import Link from "next/link";
import { Lock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#faf9f6] text-neutral-700 border-t border-neutral-200/80 pt-16 pb-12">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-neutral-200/80">
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-3">
            <span className="font-extrabold text-xl tracking-tight text-neutral-950 uppercase">
              KlesiProperty<span className="text-neutral-950">.</span>
            </span>
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed max-w-sm">
              More Comfortable. More Classy. Layanan kurasi properti dan investasi tanah legalitas terverifikasi di wilayah Jabodetabek.
            </p>
          </div>

          {/* Column 1: Properti */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="text-[11px] font-bold text-neutral-950 uppercase tracking-widest">
              Properti
            </h5>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li>
                <a href="#katalog" className="hover:text-neutral-950 transition-colors">
                  Rumah Cluster
                </a>
              </li>
              <li>
                <a href="#katalog" className="hover:text-neutral-950 transition-colors">
                  Ruko Komersial
                </a>
              </li>
              <li>
                <a href="#katalog" className="hover:text-neutral-950 transition-colors">
                  Tanah Kavling
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Layanan */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="text-[11px] font-bold text-neutral-950 uppercase tracking-widest">
              Layanan
            </h5>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li>
                <a href="#survey" className="hover:text-neutral-950 transition-colors">
                  Jadwal Survey
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-neutral-950 transition-colors">
                  Cek Legalitas SHM
                </a>
              </li>
              <li>
                <a href="#keunggulan" className="hover:text-neutral-950 transition-colors">
                  Konsultasi Unit
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Alamat & Kontak */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-[11px] font-bold text-neutral-950 uppercase tracking-widest">
              Kantor Operasional
            </h5>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Jl. H. Dimun, Cilodong, Kota Depok, Jawa Barat 16413
            </p>
            <p className="text-xs font-semibold text-neutral-900">
              WhatsApp:{" "}
              <a
                href="https://wa.me/6281319233748"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-neutral-950 font-bold"
              >
                0813-1923-3748
              </a>
            </p>
            <div className="pt-1.5">
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>&copy; {new Date().getFullYear()} KlesiProperty. Seluruh hak cipta dilindungi.</p>
          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            <span>Cakupan Area: Jabodetabek</span>
            <span className="text-neutral-300">&bull;</span>
            <span>Kantor: Cilodong, Depok</span>
            <span className="text-neutral-300">&bull;</span>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-neutral-700 hover:text-neutral-950 bg-white hover:bg-neutral-100 border border-neutral-200/90 px-2.5 py-1 rounded-md shadow-2xs transition-all active:scale-95 cursor-pointer"
              title="Masuk ke Panel Admin"
            >
              <Lock className="w-3 h-3 text-neutral-500" />
              <span>Login Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
