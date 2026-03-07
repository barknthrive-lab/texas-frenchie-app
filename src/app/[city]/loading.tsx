export default function CityLoading() {
  return (
    <div className="min-h-screen max-w-[1080px] mx-auto px-7 py-16 animate-pulse">
      {/* Back link skeleton */}
      <div className="h-3 w-28 bg-zinc-800 rounded mb-12" />

      {/* Header skeleton */}
      <div className="mb-16 space-y-4">
        <div className="h-20 w-80 bg-zinc-800 rounded" />
        <div className="h-4 w-96 bg-zinc-800 rounded" />
        <div className="h-4 w-72 bg-zinc-800 rounded" />
      </div>

      {/* Card grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8"
          >
            <div className="h-10 w-48 bg-zinc-800 rounded mb-3" />
            <div className="h-3 w-24 bg-zinc-800 rounded mb-8" />
            <div className="space-y-4">
              {[0, 1, 2].map((j) => (
                <div
                  key={j}
                  className="p-4 border border-[rgba(255,255,255,0.05)] bg-[#0A0A0A] rounded-xl"
                >
                  <div className="h-4 w-3/4 bg-zinc-800 rounded mb-2" />
                  <div className="h-3 w-1/2 bg-zinc-800 rounded" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
