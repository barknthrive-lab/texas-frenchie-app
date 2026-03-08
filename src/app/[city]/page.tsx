import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import type { City, DirectoryListing } from "@/types/database";

const VALID_CITIES: City[] = ["Austin", "Dallas", "Houston", "San Antonio"];

function formatCityName(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function ListingCard({ listing }: { listing: DirectoryListing }) {
  return (
    <div className="p-4 border border-[rgba(255,255,255,0.05)] bg-[#0A0A0A] rounded-xl">
      <div className="flex justify-between items-start gap-3">
        <div className="min-w-0">
          <h3 className="font-bold text-[15px] text-[#F0E6D3] truncate">{listing.name}</h3>
          <p className="text-[12px] text-zinc-500 mt-1">{listing.address}</p>
          {listing.phone && (
            <a
              href={`tel:${listing.phone}`}
              className="text-[11px] text-[var(--color-tx-burnt)] mt-1 inline-block hover:underline"
            >
              {listing.phone}
            </a>
          )}
          {listing.website_url && (
            <a
              href={listing.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[11px] text-zinc-400 mt-0.5 hover:text-[var(--color-tx-burnt)] transition-colors truncate"
            >
              {listing.website_url}
            </a>
          )}
          {listing.specialty_notes && (
            <p className="text-[11px] text-zinc-400 mt-2 leading-relaxed italic">
              {listing.specialty_notes}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          {listing.rating && (
            <span className="text-[11px] text-amber-400 font-mono">
              ★ {listing.rating}
            </span>
          )}
          {listing.is_emergency_24hr && (
            <span className="bg-red-500/15 text-red-400 font-mono text-[8px] tracking-wider px-2 py-1 rounded whitespace-nowrap">
              24HR EMERGENCY
            </span>
          )}
          {listing.frenchie_specialty && (
            <span className="bg-[#4FC3F7]/15 text-[#4FC3F7] font-mono text-[8px] tracking-wider px-2 py-1 rounded whitespace-nowrap">
              FRENCHIE SPECIALIST
            </span>
          )}
          {listing.is_claimed && (
            <span className="bg-[#E8500A]/10 text-[#E8500A] font-mono text-[8px] tracking-wider px-2 py-1 rounded whitespace-nowrap">
              Verified
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <p className="text-[13px] text-zinc-600 italic py-2">
      No {label} listed yet.{" "}
      <Link href="/claim" className="text-[var(--color-tx-burnt)] hover:underline">
        Add yours →
      </Link>
    </p>
  );
}

export default async function CityHub({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const cityName = formatCityName(city);

  if (!VALID_CITIES.includes(cityName as City)) {
    notFound();
  }

  const [{ data: vets }, { data: apts }, { data: patios }, { data: breeders }, { data: parks }] = await Promise.all([
    supabase
      .from("directory_listings")
      .select("*")
      .eq("city", cityName)
      .eq("category", "Vet"),
    supabase
      .from("directory_listings")
      .select("*")
      .eq("city", cityName)
      .eq("category", "Apartment"),
    supabase
      .from("directory_listings")
      .select("*")
      .eq("city", cityName)
      .eq("category", "Patio"),
    supabase
      .from("directory_listings")
      .select("*")
      .eq("city", cityName)
      .eq("category", "Breeder"),
    supabase
      .from("directory_listings")
      .select("*")
      .eq("city", cityName)
      .eq("category", "Park"),
  ]);

  // Gear is statewide, not city-specific
  const { data: gear } = await supabase
    .from("directory_listings")
    .select("*")
    .eq("category", "Gear");

  return (
    <div className="page-wrapper py-16">
      <div className="page-inner">
      <Link
        href="/"
        className="inline-flex items-center text-[10px] uppercase tracking-[3px] font-mono text-zinc-500 hover:text-[var(--color-tx-burnt)] transition-colors mb-12"
      >
        ← Back to Network
      </Link>

      <div className="mb-16">
        <h1 className="font-heading text-6xl md:text-8xl tracking-widest text-[var(--color-tx-sand)] leading-none mb-4">
          <span className="text-[var(--color-tx-burnt)]">{cityName}</span> Hub
        </h1>
        <p className="text-[15px] font-light text-[var(--dim)] max-w-2xl">
          Your local guide to navigating {cityName} with a French Bulldog.
          Verified vets, dog-friendly patios, top breeders, and essential gear.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Vets */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--glow)] rounded-full blur-[100px] pointer-events-none" />
          <h2 className="font-heading text-4xl tracking-wide text-[#F0E6D3] mb-2">
            Emergency &amp; General Vets
          </h2>
          <p className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase mb-8">
            {vets && vets.length > 0 ? `${vets.length} listing${vets.length > 1 ? "s" : ""}` : "No listings yet"}
          </p>
          <div className="space-y-4">
            {vets && vets.length > 0 ? (
              vets.map((v) => <ListingCard key={v.id} listing={v} />)
            ) : (
              <EmptyState label="vets" />
            )}
          </div>
        </div>

        {/* Apartments */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--glow)] rounded-full blur-[100px] pointer-events-none" />
          <h2 className="font-heading text-4xl tracking-wide text-[#F0E6D3] mb-2">
            Pet-Friendly Apts
          </h2>
          <p className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase mb-8">
            {apts && apts.length > 0 ? `${apts.length} listing${apts.length > 1 ? "s" : ""}` : "No listings yet"}
          </p>
          <div className="space-y-4">
            {apts && apts.length > 0 ? (
              apts.map((a) => <ListingCard key={a.id} listing={a} />)
            ) : (
              <EmptyState label="apartments" />
            )}
          </div>
        </div>

        {/* Patios */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[rgba(245,166,35,0.15)] rounded-full blur-[100px] pointer-events-none" />
          <h2 className="font-heading text-4xl tracking-wide text-[#F0E6D3] mb-2">
            🍻 Dog-Friendly Patios
          </h2>
          <p className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase mb-8">
            {patios && patios.length > 0 ? `${patios.length} listing${patios.length > 1 ? "s" : ""}` : "No listings yet"}
          </p>
          <div className="space-y-4">
            {patios && patios.length > 0 ? (
              patios.map((p) => <ListingCard key={p.id} listing={p} />)
            ) : (
              <EmptyState label="dog-friendly patios" />
            )}
          </div>
        </div>

        {/* Parks */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[rgba(102,187,106,0.15)] rounded-full blur-[100px] pointer-events-none" />
          <h2 className="font-heading text-4xl tracking-wide text-[#F0E6D3] mb-2">
            🌳 Indoor Dog Parks
          </h2>
          <p className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase mb-8">
            {parks && parks.length > 0 ? `${parks.length} listing${parks.length > 1 ? "s" : ""}` : "No listings yet"}
          </p>
          <div className="space-y-4">
            {parks && parks.length > 0 ? (
              parks.map((p) => <ListingCard key={p.id} listing={p} />)
            ) : (
              <EmptyState label="indoor dog parks" />
            )}
          </div>
        </div>

        {/* Breeders */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[rgba(206,147,216,0.15)] rounded-full blur-[100px] pointer-events-none" />
          <h2 className="font-heading text-4xl tracking-wide text-[#F0E6D3] mb-2">
            🏆 Elite Breeders
          </h2>
          <p className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase mb-8">
            {breeders && breeders.length > 0 ? `${breeders.length} listing${breeders.length > 1 ? "s" : ""}` : "No listings yet"}
          </p>
          <div className="space-y-4">
            {breeders && breeders.length > 0 ? (
              breeders.map((b) => <ListingCard key={b.id} listing={b} />)
            ) : (
              <EmptyState label="breeders" />
            )}
          </div>
        </div>
      </div>

      {/* Gear — Statewide section */}
      {gear && gear.length > 0 && (
        <div className="mt-8 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[rgba(102,187,106,0.15)] rounded-full blur-[100px] pointer-events-none" />
          <h2 className="font-heading text-4xl tracking-wide text-[#F0E6D3] mb-2">
            🧊 Essential Frenchie Gear
          </h2>
          <p className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase mb-8">
            {gear.length} recommended product{gear.length > 1 ? "s" : ""} · statewide
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gear.map((g) => <ListingCard key={g.id} listing={g} />)}
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
