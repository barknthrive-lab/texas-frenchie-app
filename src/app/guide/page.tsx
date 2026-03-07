import NewsletterForm from "@/components/NewsletterForm";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Texas Frenchie Summer Survival Guide | Texas Frenchie Network",
  description:
    "Download the free Texas Frenchie Summer Survival Guide. Learn how to keep your French Bulldog safe in 100°F+ Texas heat with cooling gear, safe patios, and the pavement temp rule.",
};

export default function SurvivalGuidePage() {
  return (
    <div className="page-wrapper pt-16 pb-20">
      <div className="page-inner-narrow">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center text-[10px] uppercase tracking-[3px] font-mono text-zinc-500 hover:text-[var(--color-tx-burnt)] transition-colors mb-12"
      >
        ← Back to Network
      </Link>

      {/* Hero */}
      <div className="text-center mb-12">
        <div className="inline-block font-mono text-[10px] tracking-[5px] uppercase text-[var(--color-tx-burnt)] border border-[rgba(232,80,10,0.4)] px-3.5 py-1.5 rounded-full mb-5">
          Free Download
        </div>
        <h1 className="font-heading text-[clamp(42px,8vw,72px)] leading-[0.92] tracking-widest text-[#F0E6D3] mb-6">
          The Texas Frenchie{" "}
          <em className="text-[var(--color-tx-burnt)] not-italic">
            Summer Survival
          </em>{" "}
          Guide
        </h1>
        <p className="text-[15px] text-[var(--dim)] font-light max-w-lg mx-auto leading-relaxed">
          Texas heat is no joke for flat-faced breeds. Get the only guide built
          specifically for French Bulldog owners navigating 100°F+ summers in
          the Lone Star State.
        </p>
      </div>

      {/* Pain Points */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {[
          {
            emoji: "🌡️",
            title: "Pavement Burns",
            desc: "The 7-second rule and our pavement temp chart so you never burn those paws.",
          },
          {
            emoji: "🧊",
            title: "Cooling Gear",
            desc: "Top-rated vests and mats tested in real Texas heat. No gimmicks.",
          },
          {
            emoji: "🍻",
            title: "Safe Patios",
            desc: "AC-equipped, dog-friendly restaurants across Austin, Dallas, Houston & SA.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 text-center"
          >
            <span className="text-3xl mb-3 block">{item.emoji}</span>
            <h3 className="font-heading text-xl tracking-wide text-[#F0E6D3] mb-2">
              {item.title}
            </h3>
            <p className="text-[12px] text-[var(--dim)] leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Opt-In Form */}
      <div className="max-w-md mx-auto bg-gradient-to-br from-[rgba(232,80,10,0.08)] to-[rgba(232,80,10,0.02)] border border-[rgba(232,80,10,0.3)] rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 bg-[var(--color-tx-burnt)] rounded-full blur-[100px] opacity-10" />
        <h2 className="font-heading text-3xl tracking-wide text-[#F0E6D3] mb-2 text-center">
          Get Your Free Guide
        </h2>
        <p className="text-[13px] text-[var(--dim)] leading-relaxed mb-6 text-center">
          Drop your email and we&apos;ll send the guide straight to your inbox.
          Plus, get weekly Texas Frenchie tips — 80% value, 20% community
          spotlights.
        </p>
        <NewsletterForm />
        <p className="text-[10px] text-zinc-600 mt-4 text-center">
          No spam. Unsubscribe anytime. We only collect your email — nothing else.
          <br />
          <Link href="/#privacy" className="text-[var(--color-tx-burnt)] hover:underline">
            Read our TDPSA Privacy Notice
          </Link>
        </p>
      </div>

      {/* Social Proof */}
      <div className="mt-12 text-center">
        <p className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase mb-4">
          Trusted by Frenchie owners across Texas
        </p>
        <div className="flex justify-center gap-8">
          {["Austin", "Dallas", "Houston", "San Antonio"].map((city) => (
            <Link
              key={city}
              href={`/${city.toLowerCase().replaceAll(" ", "-")}`}
              className="font-heading text-xl tracking-wide text-zinc-600 hover:text-[var(--color-tx-burnt)] transition-colors"
            >
              {city}
            </Link>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
