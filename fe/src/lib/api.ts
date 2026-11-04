import { Property, Testimonial } from "@/types";

export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Listing terkurasi Bandung Raya terverifikasi
export const DEFAULT_PROPERTIES: Property[] = [
  {
    id: 1,
    title: "Rumah Kebun Parahyangan",
    slug: "rumah-kebun-parahyangan",
    description: "Hunian modern tropis dengan pencahayaan alami optimal, taman belakang lapang, dan sirkulasi sejuk khas perbukitan Bandung Barat. Struktur dinding bata merah dan atap baja ringan SNI.",
    type: "rumah",
    price: 850000000,
    location: "Bandung Barat",
    address: "Jl. Kolonel Masturi No. 42, Cisarua",
    land_area: 140,
    building_area: 88,
    bedrooms: 3,
    bathrooms: 2,
    facilities: "SHM Murni, IMB/PBG, Listrik 2200W, Air PDAM Tirta Raharja + Toren 1000L, Carport 2 Mobil, ROW Jalan 7M Bebas Banjir",
    status: "tersedia",
    primary_image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "Paviliun Cihanjuang Asri",
    slug: "paviliun-cihanjuang-asri",
    description: "Desain compact scandinavian dengan ventilasi silang di kawasan perbukitan yang tenang dan bebas polusi. Akses cepat ke pusat kota Cimahi dan Bandung Utara.",
    type: "rumah",
    price: 675000000,
    location: "Cimahi",
    address: "Kavling Cihanjuang Blok B3, Cihanjuang",
    land_area: 105,
    building_area: 65,
    bedrooms: 2,
    bathrooms: 1,
    facilities: "SHM Terbit, IMB Lengkap, Listrik 1300W, Sumur Bor Jetpump 40m Jernih, Carport Kanopi Minimalis, Dapur Semi-Outdoor",
    status: "tersedia",
    primary_image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "Villa Dago Valley",
    slug: "villa-dago-valley",
    description: "Villa dua lantai bergaya kontemporer dengan view lembah pinus dan dinding aksen batu alam lokal. Berada di zona resor tenang dengan udara sejuk pegunungan.",
    type: "rumah",
    price: 1850000000,
    location: "Dago Atas, Bandung",
    address: "Jl. Raya Dago Pakar Timur Kav. 12",
    land_area: 220,
    building_area: 160,
    bedrooms: 4,
    bathrooms: 3,
    facilities: "SHM On Hand, PBG Hunian, Listrik 3500W, Pemanas Air Solar, Balkon Lembah Pinus, Garasi 2 Mobil, Row Jalan 8M",
    status: "tersedia",
    primary_image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    title: "Townhouse Sariwangi Hills",
    slug: "townhouse-sariwangi-hills",
    description: "Cluster eksklusif one-gate system dengan keamanan 24 jam. Tata ruang lapang dengan ceiling tinggi 3.8 meter dan pencahayaan skylight di area tangga.",
    type: "rumah",
    price: 920000000,
    location: "Bandung Barat",
    address: "Jl. Sariwangi Utara No. 18",
    land_area: 120,
    building_area: 95,
    bedrooms: 3,
    bathrooms: 2,
    facilities: "SHM Siap Balik Nama, PBG, Listrik 2200W, One Gate System 24 Jam, Akses 10 Menit ke Gerbang Tol Pasteur",
    status: "tersedia",
    primary_image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    title: "Rumah Kolonial Kontemporer Sukajadi",
    slug: "rumah-kolonial-sukajadi",
    description: "Paduan arsitektur vernakular dengan renovasi interior kontemporer. Halaman depan dan belakang luas dengan pepohonan rindang di pusat kawasan residensial premium.",
    type: "rumah",
    price: 2450000000,
    location: "Sukajadi, Bandung",
    address: "Jl. Bungur Sukajadi No. 7",
    land_area: 280,
    building_area: 185,
    bedrooms: 4,
    bathrooms: 3,
    facilities: "SHM Perorangan, IMB, Listrik 4400W, Kusen Kayu Jati Solid, Garasi 2 Mobil + Carport 2 Mobil, Akses Jalan Protokol",
    status: "tersedia",
    primary_image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 6,
    title: "Kavling Siap Bangun Lembah Giri",
    slug: "kavling-lembah-giri",
    description: "Lahan tanah matang berorientasi timur dengan pemandangan pegunungan Lembang. Sudah rata, siap pondasi, dan saluran drainase air hujan telah terpasang permanen.",
    type: "tanah",
    price: 490000000,
    location: "Lembang, Bandung Barat",
    address: "Jl. Kolonel Masturi Km. 9, Lembang",
    land_area: 180,
    building_area: 0,
    bedrooms: 0,
    bathrooms: 0,
    facilities: "SHM Pecah Perorangan Siap AJB, Akses Jalan Aspal Simpangan 2 Mobil, Jaringan Listrik & Air Siap Sambung",
    status: "tersedia",
    primary_image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
  },
];

// Data testimoni asli (hanya terisi jika didapat dari backend terverifikasi, bukan dummy buatan)
export const DEFAULT_TESTIMONIALS: Testimonial[] = [];

// Helper format gambar: dukung upload multer backend (/uploads/...) & CDN
export function resolveImageUrl(url?: string | null): string {
  if (!url) {
    return "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";
  }
  if (url.startsWith("/uploads/")) {
    return `${API_BASE}${url}`;
  }
  return url;
}

// Helper format Rupiah
export function formatRupiah(val: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(val);
}
