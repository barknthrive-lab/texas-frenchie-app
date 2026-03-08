/**
 * Types representing the database schema for the Texas Frenchie Network.
 */

export type City = "Austin" | "Dallas" | "Houston" | "San Antonio";

export interface DirectoryListing {
  id: string;
  city: City;
  category: "Vet" | "Apartment" | "Service" | "Groomer" | "Patio" | "Gear" | "Breeder" | "Park" | "Trainer";
  name: string;
  address: string;
  phone?: string;
  website_url?: string;
  is_claimed: boolean;
  latitude?: number;
  longitude?: number;
  is_emergency_24hr?: boolean;
  frenchie_specialty?: boolean;
  specialty_notes?: string;
  rating?: number;
  created_at: string;
}

export interface Article {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  content: string; // Markdown or HTML
  published: boolean;
  author?: string;
}

export interface StoreProduct {
  id: string;
  created_at: string;
  title: string;
  description: string | null;
  price: string | null;
  image_url: string | null;
  affiliate_url: string;
  category: "Cooling Gear" | "Health & Safety" | "Home & Travel" | "Apparel";
  is_featured: boolean;
  retailer: string | null;
}
