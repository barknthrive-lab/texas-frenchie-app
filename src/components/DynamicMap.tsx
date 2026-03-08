"use client";

import dynamic from "next/dynamic";

// This wrapper prevents Next.js from trying to server-side render leaflet, which requires the DOM (window)
const LeafletMap = dynamic(() => import("./CityMap"), { 
    ssr: false, 
    loading: () => (
        <div className="w-full h-[500px] bg-zinc-900 animate-pulse rounded-2xl border border-[var(--border)] overflow-hidden flex items-center justify-center">
            <span className="font-mono text-zinc-500 tracking-widest uppercase text-xs">Initializing Secure Mapping Grid...</span>
        </div>
    ) 
});

export default LeafletMap;
