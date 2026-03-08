import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "@/components/NewsletterForm";

export default function Home() {
  return (
    <div className="page-wrapper pt-16 pb-20">
      <div className="page-inner">

        {/* Hero — Full Width Stunning Image Header */}
        <div className="relative w-full h-[60vh] md:h-[70vh] rounded-3xl overflow-hidden mb-16 shadow-2xl border border-white/5">
          <Image 
            src="/hero-frenchie.png"
            alt="French Bulldog sitting on a sunny Texas patio wearing an orange cooling bandana"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Gradient Overlay so text is readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
          
          {/* Text Content positioned at the bottom of the hero image */}
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 pb-16 flex flex-col items-start justify-end">
            <div className="inline-block font-mono text-[10px] tracking-[5px] uppercase text-white bg-[var(--color-tx-burnt)] px-4 py-1.5 rounded-full mb-4 shadow-lg">
              The Texas Network
            </div>
            <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl tracking-widest text-white drop-shadow-md">
              Texas <em className="text-[var(--color-tx-burnt)] not-italic relative z-10">Frenchie</em>
            </h1>
            <p className="mt-4 text-[16px] md:text-lg text-zinc-200 font-light max-w-2xl leading-relaxed drop-shadow-sm">
              The statewide directory for French Bulldog owners. Find verified vets,
              pet-friendly apartments, and local communities from Austin to Dallas.
            </p>
          </div>
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

        {/* Summer Survival Quick-Guide / Indoor Escapes */}
        <div className="mb-16 bg-[#0a0a0a] border border-[var(--border)] rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[rgba(102,187,106,0.08)] rounded-full blur-[120px] pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3">
              <div className="inline-block font-mono text-[10px] tracking-[5px] uppercase text-[#66BB6A] border border-[rgba(102,187,106,0.4)] bg-[#66BB6A]/10 px-3.5 py-1.5 rounded-full mb-4">
                Beat the Texas Oven
              </div>
              <h2 className="font-heading text-4xl md:text-5xl tracking-widest text-[#F0E6D3] mb-4">
                A/C <span className="text-[#66BB6A]">Havens</span>
              </h2>
              <p className="text-[15px] font-light text-[var(--dim)] leading-relaxed mb-6">
                Don&apos;t let the 100°F summer trap your Frenchie inside. Brachycephalic breeds overheat fast, but these highly-rated Texas chains are generally 100% dog-friendly and blasted with cold A/C.
              </p>
              <div className="p-4 rounded-xl bg-[rgba(239,83,80,0.1)] border border-[rgba(239,83,80,0.2)]">
                <p className="text-xs text-[rgba(239,83,80,0.9)] font-mono uppercase tracking-widest mb-1.5 flex items-center gap-2">
                  <span className="text-base">⚠️</span> The 7-Second Rule
                </p>
                <p className="text-[13px] text-zinc-300 font-light leading-relaxed">
                  Even if the store is cold, the parking lot is a frying pan. If you cannot hold the back of your hand to the asphalt for 7 full seconds, carry your Frenchie inside.
                </p>
              </div>
            </div>
            
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Category 1 */}
              <div className="bg-zinc-950 border border-[rgba(255,255,255,0.05)] rounded-2xl p-6">
                <h3 className="font-heading text-xl text-white mb-3">Hardware & Supplies</h3>
                <ul className="space-y-2 text-sm text-[var(--dim)] font-light">
                  <li className="flex items-center gap-2"><span className="text-[#66BB6A]">✔</span> The Home Depot</li>
                  <li className="flex items-center gap-2"><span className="text-[#66BB6A]">✔</span> Lowe&apos;s Home Improvement</li>
                  <li className="flex items-center gap-2"><span className="text-[#66BB6A]">✔</span> Tractor Supply Co.</li>
                  <li className="flex items-center gap-2"><span className="text-[#66BB6A]">✔</span> Ace Hardware (most locations)</li>
                </ul>
              </div>
              
              {/* Category 2 */}
              <div className="bg-zinc-950 border border-[rgba(255,255,255,0.05)] rounded-2xl p-6">
                <h3 className="font-heading text-xl text-white mb-3">Hobbies & Goods</h3>
                <ul className="space-y-2 text-sm text-[var(--dim)] font-light">
                  <li className="flex items-center gap-2"><span className="text-[#66BB6A]">✔</span> Half Price Books (Texas Classic!)</li>
                  <li className="flex items-center gap-2"><span className="text-[#66BB6A]">✔</span> Bass Pro Shops / Cabela&apos;s</li>
                  <li className="flex items-center gap-2"><span className="text-[#66BB6A]">✔</span> Michaels & JoAnn Fabrics</li>
                  <li className="flex items-center gap-2"><span className="text-[#66BB6A]">✔</span> REI Co-op</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Affiliate Storefront CTA */}
        <div className="mb-16">
          <Link
            href="/shop"
            className="block w-full bg-[#0A0A0A] border border-[var(--border)] rounded-2xl p-8 md:p-12 relative overflow-hidden group transition-colors hover:border-[#E8500A]/40"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[rgba(232,80,10,0.1)] rounded-full blur-[100px] pointer-events-none transition-opacity opacity-50 group-hover:opacity-100" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-block font-mono text-[10px] tracking-[5px] uppercase text-[var(--color-tx-burnt)] border border-[rgba(232,80,10,0.4)] px-3.5 py-1.5 rounded-full mb-4">
                  Curated Equipment
                </div>
                <h2 className="font-heading text-4xl md:text-5xl tracking-widest text-[#F0E6D3] mb-2">
                  The Storefront
                </h2>
                <p className="text-[15px] font-light text-[var(--dim)] max-w-lg">
                  Shop our curated list of the absolute best cooling vests, heavy-duty harnesses, and safety gear designed exclusively for French Bulldogs.
                </p>
              </div>
              <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full border border-zinc-700 bg-zinc-900 group-hover:bg-[#E8500A] group-hover:border-[#E8500A] transition-colors text-white">
                →
              </div>
            </div>
          </Link>
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
