export interface Property {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  type: string;
  price: number;
  location: string;
  address: string | null;
  land_area: number | null;
  building_area: number | null;
  bedrooms: number;
  bathrooms: number;
  facilities: string | null;
  map_url?: string | null;
  is_featured?: boolean;
  status: string;
  primary_image?: string | null;
  images?: { id: number; image_url: string; is_primary: boolean }[];
}

export interface Testimonial {
  id: number;
  buyer_name: string;
  content: string;
  rating: number;
}

export interface Survey {
  id: number;
  property_id: number;
  name: string;
  phone: string;
  survey_date: string;
  survey_time: string;
  message: string | null;
  status: "baru" | "dikonfirmasi" | "selesai" | "dibatalkan";
  created_at?: string;
  property_title?: string;
  property_slug?: string;
  property_location?: string;
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
}
