-- 1. Drop existing check constraint on category to add 'Trainer'
ALTER TABLE public.directory_listings DROP CONSTRAINT IF EXISTS directory_listings_category_check;

-- 2. Add new check constraint with all required categories including 'Trainer'
ALTER TABLE public.directory_listings ADD CONSTRAINT directory_listings_category_check CHECK (category IN ('Vet', 'Apartment', 'Service', 'Groomer', 'Patio', 'Gear', 'Breeder', 'Park', 'Trainer'));

-- 3. Insert Rattlesnake Avoidance Trainers (Essential for Frenchie safety in Texas)
INSERT INTO public.directory_listings (city, category, name, address, website_url, is_claimed, specialty_notes)
VALUES 
    -- AUSTIN
    ('Austin', 'Trainer', 'Unleashed Unlimited', 'Leander, TX', 'https://unleashedunlimited.com/', true, 'Specialized rattlesnake avoidance seminars using live, defanged snakes. Critical for Frenchies living near greenbelts.'),
    
    -- DALLAS
    ('Dallas', 'Trainer', 'Snake Shield', 'DFW Metroplex, TX', 'https://kranzftg.com/', false, 'Texas-wide snake avoidance training to teach dogs to associate the scent, sight, and sound of a rattlesnake with avoidance.'),

    -- HOUSTON
    ('Houston', 'Trainer', 'Snakeworx Avoidance', 'Houston Metro Area, TX', 'https://snakeworxavoidance.com/', false, 'Clinics providing "real-life" snake encounters under controlled safety conditions to prevent fatal bites.'),

    -- SAN ANTONIO
    ('San Antonio', 'Trainer', 'Winter Kennels Avoidance Clincs', 'San Marcos, TX', 'https://tickleblagg.com/', false, 'Hosted nearby, offering rattlesnake, cottonmouth, and copperhead avoidance training without using venomous strikes.')
ON CONFLICT DO NOTHING;
