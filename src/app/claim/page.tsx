import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Claim Your Business Listing",
  description:
    "Claim your spot in the Texas Frenchie Network. Get in front of thousands of French Bulldog owners across Austin, Dallas, Houston, and San Antonio.",
};

const CITIES = ["Austin", "Dallas", "Houston", "San Antonio"];
const CATEGORIES = ["Vet / Specialist", "Emergency Clinic", "Groomer", "Pet-Friendly Apartment", "Dog-Friendly Patio / Restaurant", "Breeder", "Other Pet Service"];

export default function ClaimPage() {
  return (
    <div className="page-wrapper pt-16 pb-20">
      <div className="page-inner-narrow">
      <Link
        href="/"
        className="inline-flex items-center text-[10px] uppercase tracking-[3px] font-mono text-zinc-500 hover:text-[var(--color-tx-burnt)] transition-colors mb-12"
      >
        ← Back to Network
      </Link>

      {/* Hero */}
      <div className="mb-10">
        <div className="inline-block font-mono text-[10px] tracking-[5px] uppercase text-[var(--color-tx-burnt)] border border-[rgba(232,80,10,0.4)] px-3.5 py-1.5 rounded-full mb-5">
          For Business Owners
        </div>
        <h1 className="font-heading text-[clamp(42px,8vw,72px)] leading-[0.92] tracking-widest text-[#F0E6D3] mb-5">
          Claim Your{" "}
          <em className="text-[var(--color-tx-burnt)] not-italic">
            Business Profile
          </em>
        </h1>
        <p className="text-[15px] text-[var(--dim)] font-light max-w-lg leading-relaxed">
          Join the verified network reached by thousands of Texas French Bulldog
          owners. Free to claim — we verify and feature your business in the
          relevant city hub.
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {[
          { emoji: "📍", title: "Local Discovery", desc: "Your business appears first when Frenchie owners search in your city." },
          { emoji: "✅", title: "Verified Badge", desc: "Get the orange 'Verified' badge that builds instant trust with pet parents." },
          { emoji: "📣", title: "Newsletter Feature", desc: "Get featured in the Texas Frenchie Dispatch sent to our subscriber list." },
        ].map((item) => (
          <div key={item.title} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 text-center">
            <span className="text-3xl mb-3 block">{item.emoji}</span>
            <h3 className="font-heading text-xl tracking-wide text-[#F0E6D3] mb-2">{item.title}</h3>
            <p className="text-[12px] text-[var(--dim)] leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Claim Form */}
      <div className="bg-gradient-to-br from-[rgba(232,80,10,0.08)] to-[rgba(232,80,10,0.02)] border border-[rgba(232,80,10,0.3)] rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-24 bg-[var(--color-tx-burnt)] rounded-full blur-[100px] opacity-10" />
        <h2 className="font-heading text-3xl tracking-wide text-[#F0E6D3] mb-6">
          Submit Your Listing
        </h2>

        <form
          action="https://formspree.io/f/xyzgnrqq"
          method="POST"
          className="space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block font-mono text-[10px] tracking-widest uppercase text-zinc-400 mb-2">
                Business Name *
              </label>
              <input
                type="text"
                name="business_name"
                required
                placeholder="e.g. Austin Vet Hospital"
                className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-[14px] text-[#F0E6D3] placeholder-zinc-600 focus:outline-none focus:border-[#E8500A] transition-all"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] tracking-widest uppercase text-zinc-400 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                name="contact_name"
                required
                placeholder="Your full name"
                className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-[14px] text-[#F0E6D3] placeholder-zinc-600 focus:outline-none focus:border-[#E8500A] transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block font-mono text-[10px] tracking-widest uppercase text-zinc-400 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="you@yourbusiness.com"
                className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-[14px] text-[#F0E6D3] placeholder-zinc-600 focus:outline-none focus:border-[#E8500A] transition-all"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] tracking-widest uppercase text-zinc-400 mb-2">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="(512) 555-0123"
                className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-[14px] text-[#F0E6D3] placeholder-zinc-600 focus:outline-none focus:border-[#E8500A] transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block font-mono text-[10px] tracking-widest uppercase text-zinc-400 mb-2">
                Category *
              </label>
              <select
                name="category"
                required
                className="w-full bg-[#111] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-[14px] text-[#F0E6D3] focus:outline-none focus:border-[#E8500A] transition-all"
              >
                <option value="">Select a category…</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-mono text-[10px] tracking-widest uppercase text-zinc-400 mb-2">
                City *
              </label>
              <select
                name="city"
                required
                className="w-full bg-[#111] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-[14px] text-[#F0E6D3] focus:outline-none focus:border-[#E8500A] transition-all"
              >
                <option value="">Select a city…</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-mono text-[10px] tracking-widest uppercase text-zinc-400 mb-2">
              Business Address *
            </label>
            <input
              type="text"
              name="address"
              required
              placeholder="123 Main St, Austin, TX 78701"
              className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-[14px] text-[#F0E6D3] placeholder-zinc-600 focus:outline-none focus:border-[#E8500A] transition-all"
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] tracking-widest uppercase text-zinc-400 mb-2">
              Website URL
            </label>
            <input
              type="url"
              name="website_url"
              placeholder="https://yourbusiness.com"
              className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-[14px] text-[#F0E6D3] placeholder-zinc-600 focus:outline-none focus:border-[#E8500A] transition-all"
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] tracking-widest uppercase text-zinc-400 mb-2">
              Why should Frenchie owners visit you?
            </label>
            <textarea
              name="notes"
              rows={3}
              placeholder="Tell us what makes your business special for French Bulldog owners…"
              className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-[14px] text-[#F0E6D3] placeholder-zinc-600 focus:outline-none focus:border-[#E8500A] transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[var(--color-tx-burnt)] text-white font-mono text-[11px] tracking-widest uppercase py-4 rounded-xl hover:bg-[#ff5d14] transition-colors shadow-[0_0_20px_rgba(232,80,10,0.3)]"
          >
            Submit for Verification →
          </button>
          <p className="text-[10px] text-zinc-600 text-center">
            We&apos;ll review and verify your listing within 48 hours. Free forever.
          </p>
        </form>
      </div>
      </div>
    </div>
  );
}
