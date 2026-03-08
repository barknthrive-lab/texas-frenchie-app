"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import type { DirectoryListing } from "@/types/database";

type Tab = "research" | "vault" | "auditor";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("research");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "877668") {
      setIsAuthenticated(true);
      setErrorMsg("");
    } else {
      setErrorMsg("INVALID ACCESS CODE");
      setPasscode("");
    }
  };

  // React Query for data-fetching
  const { data: listings, isLoading, isError, error } = useQuery({
    queryKey: ["directory_listings_admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("directory_listings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw new Error(error.message);
      return data as DirectoryListing[];
    },
  });

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-[#111] border border-zinc-800 p-8 rounded-2xl w-full max-w-sm text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[rgba(232,80,10,0.1)] rounded-full blur-[50px] pointer-events-none" />
          <h2 className="font-heading text-2xl tracking-widest text-[#F0E6D3] mb-6 relative z-10">
            SECURE <span className="text-[#E8500A]">LOGIN</span>
          </h2>
          <form onSubmit={handleLogin} className="relative z-10">
            <input
              type="password"
              placeholder="Enter Access Code"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-zinc-700 rounded-lg p-3 text-center text-white tracking-[0.5em] font-mono focus:border-[#E8500A] focus:outline-none mb-4"
              autoFocus
            />
            {errorMsg && (
              <p className="text-red-500 font-mono text-xs tracking-widest uppercase mb-4 blink">
                {errorMsg}
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-zinc-900 border border-zinc-700 hover:border-[#E8500A] hover:bg-[#E8500A]/10 text-white font-mono text-sm tracking-widest uppercase py-3 rounded-lg transition-colors"
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Tabs Navigation */}
      <nav className="flex items-center space-x-2 border-b border-zinc-800 pb-2 overflow-x-auto scroller-hidden">
        {[
          { id: "research", label: "RESEARCH HUB" },
          { id: "vault", label: "VIDEO VAULT" },
          { id: "auditor", label: "AD AUDITOR" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={`px-4 py-2 font-mono text-sm tracking-widest uppercase transition-colors rounded-t-lg ${
              activeTab === tab.id
                ? "bg-[#E8500A] text-white"
                : "text-zinc-500 hover:bg-zinc-900 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Tab Contents */}
      <div className="min-h-[600px] bg-[#111] border border-zinc-800 rounded-xl p-6">
        
        {/* RESEARCH HUB */}
        {activeTab === "research" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-heading text-3xl tracking-wide text-[#F0E6D3]">Directory Research Hub</h2>
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest border border-zinc-700 px-3 py-1 rounded bg-zinc-900">
                Data Integrity: LIVE
              </div>
            </div>

            {isLoading ? (
              <div className="flex h-40 items-center justify-center text-zinc-500 font-mono text-sm tracking-widest animate-pulse">
                Fetching Supabase records...
              </div>
            ) : isError ? (
              <div className="p-4 bg-red-950/30 border border-red-900 rounded-lg text-red-500 font-mono text-sm">
                Error Loading Database: {(error as Error).message}
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-zinc-800">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-[#1A1A1A] font-mono text-[10px] uppercase tracking-widest text-[#E8500A] border-b border-zinc-800">
                    <tr>
                      <th className="p-4 font-semibold">Name</th>
                      <th className="p-4 font-semibold">City</th>
                      <th className="p-4 font-semibold">Category</th>
                      <th className="p-4 font-semibold">Status</th>
                      <th className="p-4 font-semibold">Added</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/50">
                    {listings?.map((l) => (
                      <tr key={l.id} className="hover:bg-zinc-900/50 transition-colors">
                        <td className="p-4 font-medium text-zinc-200">{l.name}</td>
                        <td className="p-4 text-zinc-400">{l.city}</td>
                        <td className="p-4">
                          <span className="bg-zinc-800 text-zinc-300 px-2 py-1 rounded text-xs">
                            {l.category}
                          </span>
                        </td>
                        <td className="p-4">
                          {l.is_claimed ? (
                            <span className="text-emerald-500 text-xs tracking-wider">VERIFIED</span>
                          ) : (
                            <span className="text-zinc-600 text-xs tracking-wider">UNCLAIMED</span>
                          )}
                        </td>
                        <td className="p-4 text-zinc-500 text-xs font-mono">
                          {new Date(l.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                    {listings && listings.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-zinc-500 font-mono text-xs uppercase tracking-widest">
                          No records found in database.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* VIDEO VAULT */}
        {activeTab === "vault" && (
          <div className="space-y-6">
            <h2 className="font-heading text-3xl tracking-wide text-[#F0E6D3]">Video Ad Vault</h2>
            <p className="text-sm text-zinc-400">
              Review AI-generated variants (Kling 3.0 + CapCut) prior to launching campaigns.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {[
                { name: "Variant 1: The Gold Standard", status: "PENDING GENERATION", ratio: "4:5" },
                { name: "Variant 2: The Texas Local", status: "PENDING GENERATION", ratio: "9:16" },
                { name: "Variant 3: The Home Rule", status: "PENDING GENERATION", ratio: "4:5" },
              ].map((vid) => (
                <div key={vid.name} className="border border-dashed border-zinc-700 rounded-xl p-6 flex flex-col items-center justify-center text-center aspect-[4/5] bg-zinc-900/20">
                  <div className="w-12 h-12 rounded-full border border-zinc-700 mb-4 flex items-center justify-center text-zinc-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                  <h3 className="font-heading tracking-wider text-[#F0E6D3] mb-1">{vid.name}</h3>
                  <p className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 mb-4">
                    Ratio: {vid.ratio}
                  </p>
                  <span className="text-[9px] font-mono tracking-[3px] py-1.5 px-3 rounded-full bg-zinc-800 text-amber-500 border border-amber-500/20">
                    {vid.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AD AUDITOR */}
        {activeTab === "auditor" && (
          <div className="space-y-6">
            <h2 className="font-heading text-3xl tracking-wide text-[#F0E6D3]">Campaign Auditor</h2>
            <p className="text-sm text-zinc-400 inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Meta Pixel Base Code Active: LIVE
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl">
                <h4 className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase mb-4">Target CPA Goal</h4>
                <div className="text-4xl font-heading text-[#E8500A] tracking-wider">&lt; $3.50</div>
                <p className="text-xs text-zinc-400 mt-2">Maximum allowable acquisition cost for free guide.</p>
              </div>

              <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl">
                <h4 className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase mb-4">Subscriber Progress</h4>
                <div className="flex items-end gap-3">
                  <div className="text-4xl font-heading text-[#E8500A] tracking-wider">0</div>
                  <div className="text-xl font-heading text-zinc-500 tracking-wider mb-1">/ 2,000</div>
                </div>
                <div className="w-full bg-zinc-900 h-1 mt-4 rounded-full overflow-hidden">
                  <div className="bg-[#E8500A] h-full" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
