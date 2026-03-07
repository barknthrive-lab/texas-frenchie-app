/**
 * Types representing the database schema for the Texas Frenchie Network.
 */

export type City = "Austin" | "Dallas" | "Houston" | "San Antonio";

export interface DirectoryListing {
  id: string;
  city: City;
  category: "Vet" | "Apartment" | "Service" | "Groomer" | "Patio" | "Gear" | "Breeder";
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
  city: City;
  title: string;
  slug: string;
  content: string; // Markdown or HTML
  author: string; // E.g., "Texas Frenchie Network"
  published_at: string;
}
