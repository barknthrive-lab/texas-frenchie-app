import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export default function Home() {
  return (
    <div className="page-wrapper pt-16 pb-20">
      <div className="page-inner">

        {/* Hero — centered */}
        <div className="text-center mb-16">
          <div className="inline-block font-mono text-[10px] tracking-[5px] uppercase text-[var(--color-tx-burnt)] border border-[rgba(232,80,10,0.4)] px-3.5 py-1.5 rounded-full mb-5">
            The Texas Network
          </div>
          <h1 className="font-heading text-[clamp(58px,10vw,110px)] leading-[0.88] tracking-widest text-[#F0E6D3]">
            Texas <em className="text-[var(--color-tx-burnt)] not-italic">Frenchie</em>
          </h1>
          <p className="mt-5 text-[15px] text-[var(--dim)] font-light max-w-lg mx-auto leading-relaxed">
            The statewide directory for French Bulldog owners. Find verified vets,
            pet-friendly apartments, and local communities from Austin to Dallas.
          </p>
        </div>

        {/* City cards grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {["Austin", "Dallas", "Houston", "San Antonio"].map((city) => (
            <Link
              key={city}
              href={`/${city.toLowerCase().replaceAll(" ", "-")}`}
              className="block text-center bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 transition-all duration-300 hover:border-[rgba(232,80,10,0.45)] hover:bg-[rgba(232,80,10,0.06)] hover:-translate-y-1 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[rgba(232,80,10,0)] via-[var(--color-tx-burnt)] to-[rgba(232,80,10,0)] opacity-0 group-hover:opacity-100 transition-opacity" />
              <h2 className="font-heading text-2xl tracking-widest text-[#F0E6D3] mb-2">
                {city}
              </h2>
              <p className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">
                Enter Hub →
              </p>
            </Link>
          ))}
        </div>

        {/* Newsletter */}
        <NewsletterForm />

        {/* Claim CTA */}
        <div className="max-w-xl mx-auto border border-[var(--border)] bg-[var(--card)] rounded-2xl p-8 relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 right-0 p-32 bg-[var(--color-tx-burnt)] rounded-full blur-[100px] opacity-10" />
          <h3 className="font-heading text-3xl tracking-wide text-[#F0E6D3] mb-3">
            Join the Directory
          </h3>
          <p className="text-[13px] text-[var(--dim)] leading-relaxed mb-6">
            Are you a Frenchie-experienced vet, groomer, or pet-friendly luxury
            apartment in Texas? Claim your spot in our verified network and get in
            front of thousands of local owners.
          </p>
          <Link
            href="/claim"
            className="block w-full text-center bg-[var(--color-tx-burnt)] text-white font-mono text-[10px] tracking-widest uppercase py-4 rounded-xl hover:bg-[#ff5d14] transition-colors shadow-[0_0_20px_rgba(232,80,10,0.3)]"
          >
            Claim Business Profile
          </Link>
        </div>

      </div>
    </div>
  );
}
