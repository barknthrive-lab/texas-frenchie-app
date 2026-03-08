import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import type { StoreProduct } from "@/types/database";

export const revalidate = 3600; // Update once an hour

function ProductCard({ product }: { product: StoreProduct }) {
  return (
    <div className="bg-[#0A0A0A] border border-[rgba(255,255,255,0.05)] rounded-2xl overflow-hidden group flex flex-col h-full transition-transform hover:-translate-y-1 hover:border-[#E8500A]/30">
      <div className="relative w-full aspect-square bg-zinc-900 border-b border-[rgba(255,255,255,0.05)]">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-zinc-700 font-mono text-xs">
            NO IMAGE
          </div>
        )}
        {product.is_featured && (
          <div className="absolute top-3 right-3 bg-[#E8500A] text-white text-[9px] font-mono tracking-widest px-2 py-1 rounded shadow-lg">
            MUST HAVE
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="font-bold text-[16px] text-[#F0E6D3] leading-snug">
            {product.title}
          </h3>
          <span className="font-mono text-[#E8500A] shrink-0">
            {product.price}
          </span>
        </div>
        
        {product.description && (
          <p className="text-[13px] text-zinc-400 font-light mb-6 flex-grow leading-relaxed">
            {product.description}
          </p>
        )}
        
        <a
          href={product.affiliate_url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-center py-3 bg-[var(--card)] hover:bg-[#E8500A] border border-[var(--border)] hover:border-[#E8500A] rounded-lg font-mono text-[10px] tracking-widest uppercase transition-colors text-white mt-auto"
        >
          View on {product.retailer || "Retailer"} →
        </a>
      </div>
    </div>
  );
}

export default async function StorefrontPage() {
  const { data: products } = await supabase
    .from("store_products")
    .select("*")
    .order("is_featured", { ascending: false });

  const typedProducts = (products || []) as StoreProduct[];

  // Group by category manually for display
  const categories = ["Cooling Gear", "Health & Safety", "Apparel", "Home & Travel"] as const;

  return (
    <div className="page-wrapper py-16">
      <div className="page-inner space-y-20">
        
        {/* Header */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center text-[10px] uppercase tracking-[3px] font-mono text-zinc-500 hover:text-[var(--color-tx-burnt)] transition-colors mb-12"
          >
            ← Back to Network
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <h1 className="font-heading text-6xl md:text-8xl tracking-widest text-[#F0E6D3] leading-none">
              The <span className="text-[var(--color-tx-burnt)]">Storefront</span>
            </h1>
          </div>
          <p className="text-[15px] font-light text-[var(--dim)] max-w-2xl">
            A curated selection of the absolute best, road-tested gear for flat-faced breeds. 
            Because standard dog gear simply doesn&apos;t fit a French Bulldog&apos;s anatomy.
          </p>
        </div>

        {/* Categories */}
        {categories.map((category) => {
          const catProducts = typedProducts.filter((p) => p.category === category);
          
          if (catProducts.length === 0) return null;

          return (
            <div key={category}>
              <h2 className="font-heading text-4xl text-white tracking-wide border-b border-[var(--border)] pb-4 mb-8">
                {category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {catProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          );
        })}

        {typedProducts.length === 0 && (
          <div className="text-center py-20 border border-dashed border-[var(--border)] rounded-2xl">
            <p className="text-zinc-500 font-mono text-sm tracking-widest uppercase">
              Restocking the Storefront...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
