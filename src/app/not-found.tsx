import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-7">
      <div className="inline-block font-mono text-[10px] tracking-[5px] uppercase text-[var(--color-tx-burnt)] border border-[rgba(232,80,10,0.4)] px-3.5 py-1.5 rounded-full mb-5">
        404
      </div>
      <h1 className="font-heading text-[clamp(58px,10vw,110px)] leading-[0.88] tracking-widest text-[#F0E6D3] mb-4">
        Not Found
      </h1>
      <p className="text-[15px] text-[var(--dim)] font-light max-w-sm leading-relaxed mb-10">
        This page doesn&apos;t exist in the Texas Frenchie Network.
      </p>
      <Link
        href="/"
        className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-tx-burnt)] border border-[rgba(232,80,10,0.4)] px-5 py-2.5 rounded-full hover:bg-[rgba(232,80,10,0.06)] transition-colors"
      >
        ← Back to Network
      </Link>
    </div>
  );
}
