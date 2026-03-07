import QueryProvider from "@/components/QueryProvider";

export const metadata = {
  title: "Admin Dashboard | Texas Frenchie Network",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#E8500A]/30">
      <QueryProvider>
        {/* Simple admin header */}
        <header className="border-b border-white/10 bg-[#0D0D0D] p-4 text-center">
          <h1 className="font-bebas text-2xl tracking-widest text-[#E8500A]">
            BULLDOG COMMAND CENTER
          </h1>
        </header>

        <main className="max-w-[1400px] mx-auto p-4 sm:p-8">
          {children}
        </main>
      </QueryProvider>
    </div>
  );
}
