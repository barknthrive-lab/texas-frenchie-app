-- Texas Frenchie Network Supabase Setup
-- Paste this into your Supabase SQL Editor to create the required tables and security policies.

-- 1. Create the `directory_listings` table
CREATE TABLE IF NOT EXISTS public.directory_listings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    city TEXT NOT NULL CHECK (city IN ('Austin', 'Dallas', 'Houston', 'San Antonio')),
    category TEXT NOT NULL CHECK (category IN ('Vet', 'Apartment', 'Service', 'Groomer')),
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    phone TEXT,
    website_url TEXT,
    is_claimed BOOLEAN DEFAULT false NOT NULL,
    latitude NUMERIC,
    longitude NUMERIC,
    is_emergency_24hr BOOLEAN DEFAULT false,
    frenchie_specialty BOOLEAN DEFAULT false,
    specialty_notes TEXT,
    rating NUMERIC CHECK (rating >= 0 AND rating <= 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.directory_listings ENABLE ROW LEVEL SECURITY;

-- 3. Create a public read-only policy
CREATE POLICY "Allow public read access to directory_listings" 
ON public.directory_listings 
FOR SELECT 
USING (true);

-- 4. Add columns if table already exists (safe migration)
ALTER TABLE public.directory_listings ADD COLUMN IF NOT EXISTS is_emergency_24hr BOOLEAN DEFAULT false;
ALTER TABLE public.directory_listings ADD COLUMN IF NOT EXISTS frenchie_specialty BOOLEAN DEFAULT false;
ALTER TABLE public.directory_listings ADD COLUMN IF NOT EXISTS specialty_notes TEXT;
ALTER TABLE public.directory_listings ADD COLUMN IF NOT EXISTS rating NUMERIC;

-- 5. Comprehensive Seed Data: Frenchie-Specialized Vets Across All 4 Texas Cities
INSERT INTO public.directory_listings (city, category, name, address, phone, website_url, is_claimed, is_emergency_24hr, frenchie_specialty, specialty_notes, rating)
VALUES 
    -- AUSTIN VETS
    ('Austin', 'Vet', 'Central Texas Veterinary Specialty & Emergency Hospital', '4434 Frontier Trail, Austin, TX 78745', '(512) 892-9038', 'https://www.ctvseh.com/', true, true, true, 'BOAS surgery, IVDD treatment, 24/7 emergency. Highly rated for brachycephalic breeds.', 4.8),
    ('Austin', 'Vet', 'Austin Vet Hospital', '7301 Burnet Rd, Austin, TX 78757', '(512) 450-0111', 'https://www.austinvethospital.com/', true, false, true, 'General care with brachycephalic experience. Allergy testing for Texas cedar/pollen.', 4.6),
    ('Austin', 'Vet', 'Sunbury Veterinary Clinic', '12400 State Hwy 71 #700, Austin, TX 78738', '(512) 263-9589', 'https://www.sunburyvet.com/', true, false, false, 'General practice. Good for routine Frenchie checkups and vaccinations.', 4.5),
    ('Austin', 'Vet', 'Veterinary Surgical Solutions', '9231 Burnet Rd #102, Austin, TX 78758', '(512) 428-6167', 'https://vssaustin.com/', false, false, true, 'Orthopedic surgery specialists. IVDD and patella luxation surgery for French Bulldogs.', 4.7),

    -- DALLAS VETS
    ('Dallas', 'Vet', 'MedVet Dallas', '11333 N Central Expy, Dallas, TX 75243', '(972) 994-2000', 'https://www.medvetforpets.com/location/dallas/', true, true, true, '24/7 emergency and specialty. Board-certified surgeons experienced with BOAS and spinal issues.', 4.9),
    ('Dallas', 'Vet', 'Dallas Veterinary Surgical Center', '11333 N Central Expy #220, Dallas, TX 75243', '(214) 252-0900', 'https://dfwvsc.com/', true, false, true, 'Soft tissue and orthopedic surgery. Nares widening and palate shortening for Frenchies.', 4.7),
    ('Dallas', 'Vet', 'CityVet - Oak Lawn', '2727 Oak Lawn Ave, Dallas, TX 75219', '(214) 219-2838', 'https://www.cityvet.com/', true, false, false, 'Walk-in friendly general practice. Good for routine care and allergy management.', 4.4),
    ('Dallas', 'Vet', 'Park Cities Animal Hospital', '4117 Lomo Alto Dr, Dallas, TX 75219', '(214) 528-2273', 'https://parkcitiesanimalhospital.com/', false, false, true, 'Dermatology focus. Excellent for Frenchie skin allergies and food sensitivity testing.', 4.6),

    -- HOUSTON VETS
    ('Houston', 'Vet', 'Gulf Coast Veterinary Specialists', '8042 Katy Fwy, Houston, TX 77024', '(713) 693-1111', 'https://www.gcvs.com/', true, true, true, '24/7 emergency. Neurology, cardiology, and surgery departments. Top-tier IVDD care.', 4.9),
    ('Houston', 'Vet', 'MedVet Houston Bay Area', '1230 Park Central Blvd S, Pasadena, TX 77508', '(713) 941-8460', 'https://www.medvet.com/location/houston-bay-area/', false, true, true, 'Emergency and BOAS surgery specialists. Board-certified surgeons on-site 24/7.', 4.7),
    ('Houston', 'Vet', 'VCA Animal Diagnostic Clinic', '8101 N Freeway, Houston, TX 77037', '(281) 999-0840', 'https://vcahospitals.com/', false, true, false, '24-hour emergency clinic. General emergency care, not brachycephalic-specific.', 4.3),

    -- SAN ANTONIO VETS
    ('San Antonio', 'Vet', 'BluePearl Pet Hospital San Antonio', '8503 Broadway St, San Antonio, TX 78217', '(210) 822-2873', 'https://bluepearlvet.com/hospital/san-antonio-tx/', true, true, true, '24/7 emergency and specialty. Experienced with brachycephalic emergencies and heatstroke.', 4.8),
    ('San Antonio', 'Vet', 'Mission Pet Emergency', '8202 N Loop 1604 W, San Antonio, TX 78249', '(210) 691-0900', 'https://missionpetemergency.com/', false, true, false, '24-hour emergency clinic. Critical care unit for heat-related emergencies.', 4.5),
    ('San Antonio', 'Vet', 'Alamo Dog & Cat Hospital', '838 Basse Rd, San Antonio, TX 78212', '(210) 822-2899', 'https://alamodogandcat.com/', true, false, true, 'General practice with brachycephalic breed experience. Allergy testing and dermatology.', 4.6),

    -- AUSTIN APARTMENTS
    ('Austin', 'Apartment', 'The Bowie', '311 Bowie St, Austin, TX 78703', '(512) 580-9285', 'https://www.thebowieaustin.com/', true, false, false, 'No breed restrictions. Dog park on-site. AC common areas.', 4.5),
    ('Austin', 'Apartment', 'Windsor South Lamar', '1100 S Lamar Blvd, Austin, TX 78704', '(512) 443-4300', 'https://www.windsorcommunities.com/', false, false, false, 'Pet-friendly, no weight limits. Near off-leash park.', 4.3),

    -- DALLAS APARTMENTS
    ('Dallas', 'Apartment', 'The Christopher', '2525 N Pearl St, Dallas, TX 75201', '(469) 604-8149', 'https://www.thechristopher-dallas.com/', false, false, false, 'No breed or weight restrictions. Rooftop dog run. Uptown location.', 4.4)
ON CONFLICT DO NOTHING;
