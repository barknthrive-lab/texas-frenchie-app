-- 1. Drop existing check constraint on category to add 'Park'
ALTER TABLE public.directory_listings DROP CONSTRAINT IF EXISTS directory_listings_category_check;

-- 2. Add new check constraint with all required categories including 'Park'
ALTER TABLE public.directory_listings ADD CONSTRAINT directory_listings_category_check CHECK (category IN ('Vet', 'Apartment', 'Service', 'Groomer', 'Patio', 'Gear', 'Breeder', 'Park'));

-- 3. Insert Indoor and Shaded Dog Parks (Essential for Frenchie heat safety)
INSERT INTO public.directory_listings (city, category, name, address, website_url, is_claimed, specialty_notes)
VALUES 
    -- AUSTIN
    ('Austin', 'Park', 'Zoom Room Dog Training (South Austin)', '1701 W Ben White Blvd #155, Austin, TX 78704', 'https://zoomroom.com/location/austin-south/', true, 'Indoor climate-controlled playgroups and gym time. Essential for socializing flat-faced breeds during extreme heat.'),
    
    -- DALLAS
    ('Dallas', 'Park', 'Urban Paws Dallas', '2526 Elm St, Dallas, TX 75226', 'https://urbanpawstx.com/', false, 'Over 10,000 sq ft of indoor/outdoor play space. Strict climate control and constant supervision.'),
    ('Dallas', 'Park', 'Dog City', '2713 N Haskell Ave, Dallas, TX 75204', 'https://dogcitydallas.com/', false, 'Premium indoor play experience. All dogs must pass temperament checks, creating a safer environment.'),

    -- HOUSTON
    ('Houston', 'Park', 'Dogtopia of Houston - Waugh Drive', '1215 Waugh Dr, Houston, TX 77019', 'https://www.dogtopia.com/', false, 'Features specialized rubber flooring tailored for joint/paw health and fully air-conditioned playrooms.'),
    ('Houston', 'Park', 'The Dog Bar', 'Montrose Area, Houston, TX', 'https://thedogbarhouston.com/', false, 'First bar specifically for dogs featuring off-leash areas and dog-focused menus. Includes cooling zones.'),

    -- SAN ANTONIO
    ('San Antonio', 'Park', 'Dogtopia of San Antonio - Alamo Ranch', '5519 W Loop 1604 N, San Antonio, TX 78253', 'https://www.dogtopia.com/san-antonio-alamo-ranch/', false, 'Spacious, climate-controlled indoor playrooms crucial for avoiding the blistering San Antonio summer heat.')
ON CONFLICT DO NOTHING;
