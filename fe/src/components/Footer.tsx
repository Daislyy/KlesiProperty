import { ShieldCheck, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0f1f1a] text-[#cce3d7] pt-16 pb-12 border-t border-[#1d352c]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#1d352c]">
          {/* Kolom Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#28a870] text-white flex items-center justify-center font-bold text-sm tracking-tight">
                KP
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Klesi<span className="text-[#3ecf8e]">Property</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#a8c5b6] leading-relaxed max-w-sm mb-6">
              Platform kurasi properti berstandar hukum di Bandung Raya. Kami memprioritaskan kepastian sertifikat SHM, kebersihan legalitas, debit air tanah, dan kelayakan struktur bangunan.
            </p>

            <div className="space-y-2 text-xs text-[#cce3d7]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#3ecf8e] shrink-0" />
                <span>Pemeriksaan berkas BPN sebelum listing tayang</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#3ecf8e] shrink-0" />
                <span>Kantor operasional: Bandung & Cimahi, Jawa Barat</span>
              </div>
            </div>
          </div>

          {/* Kolom Cakupan Area */}
          <div className="md:col-span-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Cakupan Wilayah
            </p>
            <ul className="space-y-2 text-xs text-[#a8c5b6]">
              <li>Bandung Barat & Parahyangan</li>
              <li>Cimahi & Cihanjuang Asri</li>
              <li>Dago Pakar & Bandung Utara</li>
              <li>Sariwangi & Sukajadi</li>
              <li>Lembang & Dataran Tinggi</li>
            </ul>
          </div>

          {/* Kolom Navigasi Cepat */}
          <div className="md:col-span-4">
            <p className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Navigasi Halaman
            </p>
            <ul className="space-y-2 text-xs text-[#a8c5b6]">
              <li>
                <a href="#katalog" className="hover:text-white transition-colors">
                  Katalog Properti Terverifikasi
                </a>
              </li>
              <li>
                <a href="#standar" className="hover:text-white transition-colors">
                  Protokol 4 Langkah Audit Fisik & Legalitas
                </a>
              </li>
              <li>
                <a href="#kpr" className="hover:text-white transition-colors">
                  Kalkulator Simulasi Pembiayaan KPR
                </a>
              </li>
              <li>
                <a href="#survey" className="hover:text-white transition-colors">
                  Pemesanan Jadwal Survey Lapangan
                </a>
              </li>
              <li className="pt-2">
                <a
                  href="/admin"
                  className="text-[#3ecf8e] font-semibold hover:underline underline-offset-4"
                >
                  Portal Masuk Admin →
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Baris Bawah */}
        <div className="pt-8 text-xs text-[#7f9e8f] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Klesi Property. Seluruh hak cipta dilindungi undang-undang.</p>
          <p className="text-center sm:text-right">
            Kurasi hunian bergaransi legalitas dan kepastian sertifikat SHM.
          </p>
        </div>
      </div>
    </footer>
  );
}
