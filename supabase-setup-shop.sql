-- 1. Create table for Affiliate Storefront Products
CREATE TABLE IF NOT EXISTS public.store_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    price TEXT, -- e.g., "$34.99"
    image_url TEXT,
    affiliate_url TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Cooling Gear', 'Health & Safety', 'Home & Travel', 'Apparel')),
    is_featured BOOLEAN DEFAULT false,
    retailer TEXT -- e.g., "Amazon", "Ruffwear", "Direct"
);

-- 2. Set Row Level Security (RLS)
ALTER TABLE public.store_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to store products"
    ON public.store_products FOR SELECT
    USING (true);

-- 3. Insert initial dummy/seed data (You will replace these with real affiliate links)
INSERT INTO public.store_products (title, description, price, image_url, affiliate_url, category, is_featured, retailer)
VALUES
    ('Heavy Duty Cooling Vest', 'Evaporative cooling technology designed for broad-chested breeds. Essential for Texas summers.', '$59.95', 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=800', 'https://amazon.com', 'Cooling Gear', true, 'Amazon'),
    ('Slanted Frenchie Bowl', 'Ergonomic 15-degree tilt reduces neck strain and choking for flat-faced dogs.', '$18.99', 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800', 'https://amazon.com', 'Home & Travel', false, 'Amazon'),
    ('Paw Protection Wax', 'Creates an invisible barrier against hot Texas asphalt and pavement. A must-have for summer walks.', '$14.50', 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800', 'https://amazon.com', 'Health & Safety', true, 'Chewy'),
    ('No-Pull Frenchie Harness', 'Custom fit for thick necks and chests. Distributes weight to prevent windpipe damage.', '$39.00', 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800', 'https://frenchiebulldog.com', 'Apparel', false, 'Frenchie Bulldog')
ON CONFLICT DO NOTHING;
