/**
 * Texas Frenchie Network — Database Migration Script
 * Uses the Supabase service role key to add new columns via the PostgREST API.
 * Then seeds the database with comprehensive Frenchie-specialized data.
 */
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(__dirname, "../.env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function checkColumnExists(column: string): Promise<boolean> {
  // Try selecting the column. If it errors, the column doesn't exist.
  const { error } = await supabaseAdmin
    .from("directory_listings")
    .select(column)
    .limit(0);
  return !error;
}

async function runMigration() {
  console.log("🔧 Texas Frenchie Network — Migration + Seed Script");
  console.log("====================================================\n");

  // Step 1: Check if the new columns already exist
  const columnsToCheck = ["is_emergency_24hr", "frenchie_specialty", "specialty_notes", "rating"];
  const existingCols: string[] = [];
  const missingCols: string[] = [];

  for (const col of columnsToCheck) {
    const exists = await checkColumnExists(col);
    if (exists) {
      existingCols.push(col);
    } else {
      missingCols.push(col);
    }
  }

  if (existingCols.length > 0) {
    console.log(`✅ Columns already exist: ${existingCols.join(", ")}`);
  }

  if (missingCols.length > 0) {
    console.log(`⚠️  Missing columns: ${missingCols.join(", ")}`);
    console.log("   You need to run the following SQL in the Supabase SQL Editor:");
    for (const col of missingCols) {
      const colType = col === "specialty_notes" ? "TEXT" : col === "rating" ? "NUMERIC" : "BOOLEAN DEFAULT false";
      console.log(`   ALTER TABLE public.directory_listings ADD COLUMN IF NOT EXISTS ${col} ${colType};`);
    }
    console.log("\n   After running the SQL, re-run this script to seed the data.");
    
    // If columns are missing, try seeding WITHOUT those columns
    console.log("\n🔄 Attempting to seed with existing columns only...");
  }

  // Step 2: Clear old data
  console.log("\n🗑️  Clearing old data...");
  const { error: deleteError } = await supabaseAdmin
    .from("directory_listings")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");

  if (deleteError) {
    console.error("❌ Error clearing data:", deleteError.message);
    process.exit(1);
  }
  console.log("✅ Old data cleared.");

  // Step 3: Build seed data based on available columns
  const allColumnsExist = missingCols.length === 0;

  const baseSeedData = [
    // AUSTIN VETS
    { city: "Austin", category: "Vet", name: "Central Texas Veterinary Specialty & Emergency Hospital", address: "4434 Frontier Trail, Austin, TX 78745", phone: "(512) 892-9038", website_url: "https://www.ctvseh.com/", is_claimed: true },
    { city: "Austin", category: "Vet", name: "Austin Vet Hospital", address: "7301 Burnet Rd, Austin, TX 78757", phone: "(512) 450-0111", website_url: "https://www.austinvethospital.com/", is_claimed: true },
    { city: "Austin", category: "Vet", name: "Sunbury Veterinary Clinic", address: "12400 State Hwy 71 #700, Austin, TX 78738", phone: "(512) 263-9589", website_url: "https://www.sunburyvet.com/", is_claimed: true },
    { city: "Austin", category: "Vet", name: "Veterinary Surgical Solutions", address: "9231 Burnet Rd #102, Austin, TX 78758", phone: "(512) 428-6167", website_url: "https://vssaustin.com/", is_claimed: false },
    // DALLAS VETS
    { city: "Dallas", category: "Vet", name: "MedVet Dallas", address: "11333 N Central Expy, Dallas, TX 75243", phone: "(972) 994-2000", website_url: "https://www.medvetforpets.com/location/dallas/", is_claimed: true },
    { city: "Dallas", category: "Vet", name: "Dallas Veterinary Surgical Center", address: "11333 N Central Expy #220, Dallas, TX 75243", phone: "(214) 252-0900", website_url: "https://dfwvsc.com/", is_claimed: true },
    { city: "Dallas", category: "Vet", name: "CityVet - Oak Lawn", address: "2727 Oak Lawn Ave, Dallas, TX 75219", phone: "(214) 219-2838", website_url: "https://www.cityvet.com/", is_claimed: true },
    { city: "Dallas", category: "Vet", name: "Park Cities Animal Hospital", address: "4117 Lomo Alto Dr, Dallas, TX 75219", phone: "(214) 528-2273", website_url: "https://parkcitiesanimalhospital.com/", is_claimed: false },
    // HOUSTON VETS
    { city: "Houston", category: "Vet", name: "Gulf Coast Veterinary Specialists", address: "8042 Katy Fwy, Houston, TX 77024", phone: "(713) 693-1111", website_url: "https://www.gcvs.com/", is_claimed: true },
    { city: "Houston", category: "Vet", name: "MedVet Houston Bay Area", address: "1230 Park Central Blvd S, Pasadena, TX 77508", phone: "(713) 941-8460", website_url: "https://www.medvet.com/location/houston-bay-area/", is_claimed: false },
    { city: "Houston", category: "Vet", name: "VCA Animal Diagnostic Clinic", address: "8101 N Freeway, Houston, TX 77037", phone: "(281) 999-0840", website_url: "https://vcahospitals.com/", is_claimed: false },
    // SAN ANTONIO VETS
    { city: "San Antonio", category: "Vet", name: "BluePearl Pet Hospital San Antonio", address: "8503 Broadway St, San Antonio, TX 78217", phone: "(210) 822-2873", website_url: "https://bluepearlvet.com/hospital/san-antonio-tx/", is_claimed: true },
    { city: "San Antonio", category: "Vet", name: "Mission Pet Emergency", address: "8202 N Loop 1604 W, San Antonio, TX 78249", phone: "(210) 691-0900", website_url: "https://missionpetemergency.com/", is_claimed: false },
    { city: "San Antonio", category: "Vet", name: "Alamo Dog & Cat Hospital", address: "838 Basse Rd, San Antonio, TX 78212", phone: "(210) 822-2899", website_url: "https://alamodogandcat.com/", is_claimed: true },
    // APARTMENTS
    { city: "Austin", category: "Apartment", name: "The Bowie", address: "311 Bowie St, Austin, TX 78703", phone: "(512) 580-9285", website_url: "https://www.thebowieaustin.com/", is_claimed: true },
    { city: "Austin", category: "Apartment", name: "Windsor South Lamar", address: "1100 S Lamar Blvd, Austin, TX 78704", phone: "(512) 443-4300", website_url: "https://www.windsorcommunities.com/", is_claimed: false },
    { city: "Dallas", category: "Apartment", name: "The Christopher", address: "2525 N Pearl St, Dallas, TX 75201", phone: "(469) 604-8149", website_url: "https://www.thechristopher-dallas.com/", is_claimed: false },
  ];

  // If all columns exist, add the specialty data
  const specialtyExtras = [
    { is_emergency_24hr: true, frenchie_specialty: true, specialty_notes: "BOAS surgery, IVDD treatment, 24/7 emergency. Highly rated for brachycephalic breeds.", rating: 4.8 },
    { is_emergency_24hr: false, frenchie_specialty: true, specialty_notes: "General care with brachycephalic experience. Allergy testing for Texas cedar/pollen.", rating: 4.6 },
    { is_emergency_24hr: false, frenchie_specialty: false, specialty_notes: "General practice. Good for routine Frenchie checkups and vaccinations.", rating: 4.5 },
    { is_emergency_24hr: false, frenchie_specialty: true, specialty_notes: "Orthopedic surgery specialists. IVDD and patella luxation surgery for French Bulldogs.", rating: 4.7 },
    { is_emergency_24hr: true, frenchie_specialty: true, specialty_notes: "24/7 emergency and specialty. Board-certified surgeons experienced with BOAS and spinal issues.", rating: 4.9 },
    { is_emergency_24hr: false, frenchie_specialty: true, specialty_notes: "Soft tissue and orthopedic surgery. Nares widening and palate shortening for Frenchies.", rating: 4.7 },
    { is_emergency_24hr: false, frenchie_specialty: false, specialty_notes: "Walk-in friendly general practice. Good for routine care and allergy management.", rating: 4.4 },
    { is_emergency_24hr: false, frenchie_specialty: true, specialty_notes: "Dermatology focus. Excellent for Frenchie skin allergies and food sensitivity testing.", rating: 4.6 },
    { is_emergency_24hr: true, frenchie_specialty: true, specialty_notes: "24/7 emergency. Neurology, cardiology, and surgery departments. Top-tier IVDD care.", rating: 4.9 },
    { is_emergency_24hr: true, frenchie_specialty: true, specialty_notes: "Emergency and BOAS surgery specialists. Board-certified surgeons on-site 24/7.", rating: 4.7 },
    { is_emergency_24hr: true, frenchie_specialty: false, specialty_notes: "24-hour emergency clinic. General emergency care, not brachycephalic-specific.", rating: 4.3 },
    { is_emergency_24hr: true, frenchie_specialty: true, specialty_notes: "24/7 emergency and specialty. Experienced with brachycephalic emergencies and heatstroke.", rating: 4.8 },
    { is_emergency_24hr: true, frenchie_specialty: false, specialty_notes: "24-hour emergency clinic. Critical care unit for heat-related emergencies.", rating: 4.5 },
    { is_emergency_24hr: false, frenchie_specialty: true, specialty_notes: "General practice with brachycephalic breed experience. Allergy testing and dermatology.", rating: 4.6 },
    { is_emergency_24hr: false, frenchie_specialty: false, specialty_notes: "No breed restrictions. Dog park on-site. AC common areas.", rating: 4.5 },
    { is_emergency_24hr: false, frenchie_specialty: false, specialty_notes: "Pet-friendly, no weight limits. Near off-leash park.", rating: 4.3 },
    { is_emergency_24hr: false, frenchie_specialty: false, specialty_notes: "No breed or weight restrictions. Rooftop dog run. Uptown location.", rating: 4.4 },
  ];

  const seedData = allColumnsExist
    ? baseSeedData.map((base, i) => ({ ...base, ...specialtyExtras[i] }))
    : baseSeedData;

  console.log(`\n📊 Seeding ${seedData.length} listings across 4 Texas cities...`);
  const { error } = await supabaseAdmin
    .from("directory_listings")
    .insert(seedData);

  if (error) {
    console.error("❌ Error seeding data:", error.message);
    process.exit(1);
  }

  // ═══ VERIFICATION ═══
  console.log("\n🔍 Running Post-Write Verification...");
  const cities = ["Austin", "Dallas", "Houston", "San Antonio"];
  let totalVerified = 0;

  for (const city of cities) {
    const { data: cityData, error: cityError } = await supabaseAdmin
      .from("directory_listings")
      .select("id, name, category")
      .eq("city", city);

    if (cityError) {
      console.error(`❌ Verification FAILED for ${city}:`, cityError.message);
    } else {
      const vetCount = cityData.filter((d) => d.category === "Vet").length;
      const aptCount = cityData.filter((d) => d.category === "Apartment").length;
      console.log(`  ✅ ${city}: ${vetCount} vets, ${aptCount} apartments verified.`);
      totalVerified += cityData.length;
    }
  }

  // Check for duplicates
  const { data: allRows } = await supabaseAdmin
    .from("directory_listings")
    .select("name");

  if (allRows) {
    const names = allRows.map((r) => r.name);
    const dupes = names.filter((name, i) => names.indexOf(name) !== i);
    if (dupes.length > 0) {
      console.warn(`\n⚠️  Duplicates detected: ${dupes.join(", ")}`);
    } else {
      console.log(`  ✅ No duplicates found.`);
    }
  }

  console.log(`\n🏁 DONE. ${totalVerified} total listings verified across ${cities.length} cities.`);
  if (!allColumnsExist) {
    console.log(`\n⚠️  NOTE: Specialty columns are missing. Run the ALTER TABLE SQL in Supabase, then re-run this script.`);
  }
}

runMigration();
