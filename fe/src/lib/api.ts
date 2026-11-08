import { Property, Testimonial } from "@/types";

export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Listing terkurasi area Cilodong, Depok & sekitarnya
export const DEFAULT_PROPERTIES: Property[] = [
  {
    id: 1,
    title: "Rumah Cantik Dimun Asri",
    slug: "rumah-cantik-dimun-asri",
    description: "Hunian modern minimalis dengan sirkulasi udara optimal dan pencahayaan alami di kawasan berkembang Cilodong Depok. Akses jalan aspal leluasa dan lingkungan aman.",
    type: "rumah",
    price: 850000000,
    location: "Cilodong, Depok",
    address: "Jl. H. Dimun No. 42, Cilodong, Kota Depok",
    land_area: 120,
    building_area: 85,
    bedrooms: 3,
    bathrooms: 2,
    facilities: "SHM Murni, IMB/PBG, Listrik 2200W, Air Sumur Bor Jernih + Toren, Carport 2 Mobil, ROW Jalan 7M Bebas Banjir",
    status: "tersedia",
    is_featured: true,
    primary_image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "Cluster Dimun Residence",
    slug: "cluster-dimun-residence",
    description: "Cluster one gate system yang tenang dan nyaman. Berlokasi strategis di Jl. H. Dimun dengan akses cepat menuju Stasiun Depok dan kawasan Grand Depok City.",
    type: "rumah",
    price: 675000000,
    location: "Cilodong, Depok",
    address: "Jl. H. Dimun Blok B3, Cilodong, Kota Depok",
    land_area: 90,
    building_area: 60,
    bedrooms: 2,
    bathrooms: 1,
    facilities: "SHM Terbit, IMB Lengkap, Listrik 1300W, Jetpump 30m Jernih, Carport Kanopi, One Gate System 24 Jam",
    status: "tersedia",
    primary_image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "Townhouse Grand Depok City",
    slug: "townhouse-grand-depok-city",
    description: "Townhouse dua lantai modern di kawasan terpadu Grand Depok City. Dekat dengan pusat perbelanjaan, waterpark, dan sekolah ternama.",
    type: "rumah",
    price: 1450000000,
    location: "Sukmajaya, Depok",
    address: "Boulevard Grand Depok City Kav. 12",
    land_area: 130,
    building_area: 110,
    bedrooms: 3,
    bathrooms: 2,
    facilities: "SHM On Hand, PBG Hunian, Listrik 2200W, Taman Pribadi, Garasi 2 Mobil, Keamanan Cluster 24 Jam",
    status: "tersedia",
    primary_image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    title: "Kavling Matang Siap Bangun",
    slug: "kavling-matang-siap-bangun",
    description: "Tanah kavling matang siap pondasi di pinggir jalan lingkungan beraspal. Legalitas sertifikat hak milik bersih dan siap AJB langsung.",
    type: "tanah",
    price: 490000000,
    location: "Cilodong, Depok",
    address: "Jl. H. Dimun Raya, Cilodong, Kota Depok",
    land_area: 150,
    building_area: 0,
    bedrooms: 0,
    bathrooms: 0,
    facilities: "SHM Pecah Siap AJB, Akses Jalan Masuk Mobil Leluasa, Jaringan Listrik & Air Siap Pasang",
    status: "tersedia",
    primary_image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    title: "Ruko Komersial Kalimulya",
    slug: "ruko-komersial-kalimulya",
    description: "Ruko 2 lantai di jalur ramai Kalimulya - Cilodong. Sangat cocok untuk klinik, apotek, minimarket, atau kantor operasional.",
    type: "ruko",
    price: 1850000000,
    location: "Cilodong, Depok",
    address: "Jl. Kalimulya No. 8, Cilodong, Depok",
    land_area: 90,
    building_area: 140,
    bedrooms: 1,
    bathrooms: 2,
    facilities: "SHM Komersial, PBG Ruko, Listrik 3500W, Parkiran Mobil Luas, ROW Jalan Utama",
    status: "tersedia",
    primary_image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 6,
    title: "Rumah Asri Sawangan Terrace",
    slug: "rumah-asri-sawangan-terrace",
    description: "Hunian modern tropis dengan taman samping asri. Akses 10 menit ke pintu tol Sawangan - Desari.",
    type: "rumah",
    price: 980000000,
    location: "Sawangan, Depok",
    address: "Jl. Raya Sawangan Kav. 5, Depok",
    land_area: 110,
    building_area: 78,
    bedrooms: 3,
    bathrooms: 2,
    facilities: "SHM, IMB Lengkap, Listrik 2200W, Carport Kanopi, Keamanan 24 Jam",
    status: "tersedia",
    primary_image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
  },
];

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
