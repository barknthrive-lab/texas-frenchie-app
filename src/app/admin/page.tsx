"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import type { DirectoryListing } from "@/types/database";

type Tab = "research" | "marketing" | "auditor";

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
          { id: "marketing", label: "SOCIAL MEDIA MARKETING MART" },
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

        {/* SOCIAL MEDIA MARKETING MART */}
        {activeTab === "marketing" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-heading text-3xl tracking-wide text-[#F0E6D3]">Social Media Marketing Mart</h2>
              <div className="text-xs font-mono text-emerald-500 uppercase tracking-widest border border-emerald-900/50 px-3 py-1 rounded bg-emerald-950/30">
                AI SCRIPTS READY
              </div>
            </div>
            <p className="text-sm text-zinc-400">
              Copy and paste these exact text-to-video prompts into Kling 3.0, then use the scripts below for your CapCut/Meta Ads voiceovers.
            </p>
            
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 pt-4">
              
              {/* Ad 1 */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 flex flex-col">
                <h3 className="font-heading text-xl text-[#E8500A] mb-2">Ad 1: The Gold Standard</h3>
                <p className="text-[10px] font-mono text-zinc-500 mb-4 tracking-widest uppercase">Ratio: 9:16 | Hook: Breeder Scams</p>
                <div className="bg-zinc-900 p-4 rounded border border-zinc-800 mb-4 flex-grow">
                  <h4 className="text-xs font-bold text-white mb-2">KLING 3.0 PROMPT:</h4>
                  <p className="text-xs text-zinc-400 mb-4 italic">&quot;Photorealistic, cinematic vertical video. Close up of a very sad, sick French Bulldog puppy. Suddenly transitions to a healthy, muscular Frenchie running happily. Cinematic lighting.&quot;</p>
                  <h4 className="text-xs font-bold text-white mb-2">CAPCUT VOICEOVER:</h4>
                  <p className="text-sm text-zinc-300">&quot;Texas Frenchie owners are losing thousands of dollars to backyard breeders. Before you buy your next puppy, you need to check the local Verified List. We compiled the only directory of AKC Gold Standard Breeders in Texas. Click here to search for free.&quot;</p>
                </div>
              </div>

              {/* Ad 2 */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 flex flex-col">
                <h3 className="font-heading text-xl text-[#66BB6A] mb-2">Ad 2: The Texas Local</h3>
                <p className="text-[10px] font-mono text-zinc-500 mb-4 tracking-widest uppercase">Ratio: 9:16 | Hook: Heat Trapped</p>
                <div className="bg-zinc-900 p-4 rounded border border-zinc-800 mb-4 flex-grow">
                  <h4 className="text-xs font-bold text-white mb-2">KLING 3.0 PROMPT:</h4>
                  <p className="text-xs text-zinc-400 mb-4 italic">&quot;Photorealistic vertical video of a French Bulldog panting heavily on a hot Texas sidewalk, looking depressed. Transitions to the dog happily walking inside a massive, air-conditioned Home Depot.&quot;</p>
                  <h4 className="text-xs font-bold text-white mb-2">CAPCUT VOICEOVER:</h4>
                  <p className="text-sm text-zinc-300">&quot;Is your Frenchie trapped inside for the next 4 months because of the heat? Throwing ice water on them can trigger fatal shock. Instead, download our free Texas Summer Survival Guide. We mapped out every indoor A/C dog park in the state. Click to download.&quot;</p>
                </div>
              </div>

              {/* Ad 3 */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 flex flex-col">
                <h3 className="font-heading text-xl text-[#4FC3F7] mb-2">Ad 3: The Home Rule</h3>
                <p className="text-[10px] font-mono text-zinc-500 mb-4 tracking-widest uppercase">Ratio: 4:5 | Hook: Breed Bans</p>
                <div className="bg-zinc-900 p-4 rounded border border-zinc-800 mb-4 flex-grow">
                  <h4 className="text-xs font-bold text-white mb-2">KLING 3.0 PROMPT:</h4>
                  <p className="text-xs text-zinc-400 mb-4 italic">&quot;Wide angle, photorealistic video of a luxury high-rise apartment living room with floor-to-ceiling windows. A French Bulldog is sleeping peacefully on a velvet couch.&quot;</p>
                  <h4 className="text-xs font-bold text-white mb-2">CAPCUT VOICEOVER:</h4>
                  <p className="text-sm text-zinc-300">&quot;Did you know 60% of luxury apartments in Texas secretly ban French Bulldogs because of weight or breed restrictions? We just unlocked the local directory of every luxury apartment in Austin, Dallas, and Houston that actually welcomes Frenchies. Click to browse for free.&quot;</p>
                </div>
              </div>

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
