"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { DirectoryListing } from "@/types/database";

// Fix Leaflet's default icon path issues with Next.js/Webpack
// Fix Leaflet's default icon path issues with Next.js/Webpack
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-x2-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const greenIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-x2-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const goldIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-x2-gold.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function getIconForCategory(category: string) {
  if (category === "Vet") return redIcon;
  if (category === "Park" || category === "Patio") return greenIcon;
  if (category === "Breeder") return goldIcon;
  return customIcon;
}

// Map Updater Component to change view when city changes
function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

// We will attempt on-the-fly geocoding for MVP visual presentation
// In production, coordinates should be definitively saved in Supabase
export default function CityMap({
  city,
  listings,
}: {
  city: string;
  listings: DirectoryListing[];
}) {
  const [geocodedListings, setGeocodedListings] = useState<DirectoryListing[]>([]);

  // Default coordinates for the major Texas cities
  let centerPosition: [number, number] = [31.9686, -99.9018]; // Texas Center
  
  if (city.toLowerCase() === "austin") centerPosition = [30.2672, -97.7431];
  if (city.toLowerCase() === "dallas") centerPosition = [32.7767, -96.7970];
  if (city.toLowerCase() === "houston") centerPosition = [29.7604, -95.3698];
  if (city.toLowerCase() === "san antonio") centerPosition = [29.4241, -98.4936];

  useEffect(() => {
    // Quick and dirty local geocoding loop (only for items missing lat/lng)
    // We add a tiny delay between requests to respect Nominatim rate limits loosely
    async function geocodeMissing() {
      const updated = [...listings];
      for (let i = 0; i < updated.length; i++) {
        if (!updated[i].latitude || !updated[i].longitude) {
          try {
            const query = encodeURIComponent(
              updated[i].address ? updated[i].address : `${updated[i].name}, ${updated[i].city}, TX`
            );
            const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1`);
            const data = await res.json();
            
            if (data && data.length > 0) {
              updated[i] = {
                ...updated[i],
                latitude: parseFloat(data[0].lat),
                longitude: parseFloat(data[0].lon),
              };
            }
            // Wait 500ms between requests to avoid 429
            await new Promise((r) => setTimeout(r, 500));
          } catch {
            console.error("Geocoding failed for:", updated[i].name);
          }
        }
      }
      setGeocodedListings(updated);
    }

    geocodeMissing();
  }, [listings]);

  // Use geocoded ones if available, otherwise fallback to the raw props (which might have DB coords)
  const renderListings = geocodedListings.length > 0 ? geocodedListings : listings;
  const mapReadyListings = renderListings.filter((l) => l.latitude && l.longitude);

  return (
    <div className="w-full h-[500px] bg-zinc-900 rounded-2xl overflow-hidden border border-[var(--border)] relative z-0">
      <MapContainer
        center={centerPosition}
        zoom={11}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <ChangeView center={centerPosition} zoom={11} />
        
        {/* Dark theme specifically styled for Texas Frenchie Network */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {mapReadyListings.map((listing) => (
          <Marker
            key={listing.id}
            position={[listing.latitude!, listing.longitude!]}
            icon={getIconForCategory(listing.category)}
          >
            <Popup className="custom-popup">
              <div className="font-sans text-zinc-900 min-w-[200px]">
                <strong className="block text-base leading-tight mb-1">{listing.name}</strong>
                <span className="inline-block bg-zinc-200 text-zinc-600 text-[10px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded mb-2">
                  {listing.category}
                </span>
                <p className="text-xs text-zinc-600 mb-2 leading-relaxed">{listing.address}</p>
                
                {listing.website_url && (
                  <a
                    href={listing.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[#E8500A] text-xs font-semibold hover:underline"
                  >
                    View Website →
                  </a>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Legend Override Overlay */}
      <div className="absolute bottom-4 left-4 z-[400] bg-zinc-950/90 border border-zinc-800 p-3 rounded-lg backdrop-blur-md">
        <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-2">Map Legend</div>
        <div className="flex flex-col gap-1.5 text-xs text-zinc-300">
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span> Veterinarians</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500"></span> Parks & Patios</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500"></span> Verified Breeders</div>
        </div>
      </div>
    </div>
  );
}
