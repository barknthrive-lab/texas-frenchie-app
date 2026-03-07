"use client";

import React, { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("🎉 Welcome to the pack! Check your inbox.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <div className="max-w-xl mx-auto border border-[var(--border)] bg-[#0D0D0D] rounded-2xl p-8 relative overflow-hidden backdrop-blur-sm mt-12 mb-16">
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#E8500A] rounded-full blur-[100px] opacity-20 pointer-events-none" />
      <div className="relative z-10 text-center">
        <div className="inline-block font-mono text-[9px] tracking-[4px] uppercase text-[#E8500A] border border-[rgba(232,80,10,0.3)] bg-[rgba(232,80,10,0.05)] px-3 py-1 rounded-full mb-4">
          Weekly Intel
        </div>
        <h3 className="font-heading text-3xl tracking-wide text-[#F0E6D3] mb-3">
          Texas Frenchie Dispatch
        </h3>
        <p className="text-[13px] text-[var(--dim)] leading-relaxed mb-6 max-w-sm mx-auto">
          Join the statewide network. We send one zero-fluff email a week with
          verified vet updates, apartment finds, and theft alerts.
        </p>

        {status === "success" ? (
          <div className="bg-[rgba(102,187,106,0.1)] border border-[rgba(102,187,106,0.3)] rounded-xl px-6 py-4">
            <p className="text-[14px] text-[#66BB6A] font-medium">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={status === "loading"}
              className="flex-1 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3.5 text-[14px] text-[#F0E6D3] placeholder-[rgba(240,230,211,0.3)] focus:outline-none focus:border-[#E8500A] focus:bg-[rgba(232,80,10,0.02)] transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="sm:w-auto w-full whitespace-nowrap bg-[#E8500A] text-white font-mono text-[11px] font-medium tracking-widest uppercase px-6 py-3.5 rounded-xl hover:bg-[#ff5d14] transition-colors shadow-[0_0_20px_rgba(232,80,10,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Joining..." : "Subscribe"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-[11px] text-red-400 mt-3">{message}</p>
        )}

        <p className="text-[10px] uppercase font-mono tracking-widest text-zinc-600 mt-4">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}
