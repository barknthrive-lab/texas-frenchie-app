/**
 * Texas Frenchie Network — Seed Patios, Gear, and Breeders
 * Phase 2, Steps B/C/D of the Road to 2,000 Subscribers plan.
 */
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(__dirname, "../.env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function seedExtras() {
  console.log("🐾 Texas Frenchie Network — Seeding Patios, Gear & Breeders");
  console.log("=============================================================\n");

  const newData = [
    // ═══ DOG-FRIENDLY PATIOS (AC / Shade / Water) ═══
    // Austin Patios
    { city: "Austin", category: "Patio", name: "Yard Bar", address: "6700 Burnet Rd, Austin, TX 78757", phone: "(512) 900-3773", website_url: "https://yardbar.com/", is_claimed: true, frenchie_specialty: false, specialty_notes: "Off-leash dog park + bar. Misters and shade structures. Great for Frenchie meetups.", rating: 4.7 },
    { city: "Austin", category: "Patio", name: "Moontower Saloon", address: "10212 Manchaca Rd, Austin, TX 78748", phone: "(512) 337-0544", website_url: "https://moontowersaloon.com/", is_claimed: false, frenchie_specialty: false, specialty_notes: "Huge outdoor patio with tree shade. Water bowls provided. Live music.", rating: 4.5 },
    { city: "Austin", category: "Patio", name: "Loro", address: "2115 S Lamar Blvd, Austin, TX 78704", phone: "(512) 916-4858", website_url: "https://loroeats.com/", is_claimed: true, frenchie_specialty: false, specialty_notes: "Asian smokehouse with large covered patio. Dog-friendly. AC fans overhead.", rating: 4.8 },
    // Dallas Patios
    { city: "Dallas", category: "Patio", name: "Mutts Canine Cantina", address: "2889 Cityplace W Blvd, Dallas, TX 75204", phone: "(214) 377-8723", website_url: "https://muttscantina.com/", is_claimed: true, frenchie_specialty: false, specialty_notes: "Off-leash dog park + restaurant. Separate areas for small dogs. Splash pad in summer.", rating: 4.6 },
    { city: "Dallas", category: "Patio", name: "The Rustic", address: "3656 Howell St, Dallas, TX 75204", phone: "(214) 730-0596", website_url: "https://therustic.com/", is_claimed: false, frenchie_specialty: false, specialty_notes: "Massive patio with shade, fans, and live music. Dog water stations available.", rating: 4.4 },
    // Houston Patios
    { city: "Houston", category: "Patio", name: "Johnny's Gold Brick", address: "2518 Yale St, Houston, TX 77008", phone: "(713) 864-2114", website_url: "https://johnnysgoldbrick.com/", is_claimed: false, frenchie_specialty: false, specialty_notes: "Covered patio, pet-friendly. Water bowls. Good AC inside if needed.", rating: 4.3 },
    { city: "Houston", category: "Patio", name: "Barkley's Dog Park & Grill", address: "610 W NASA Pkwy, Webster, TX 77598", phone: "(281) 332-2275", website_url: "https://barkleysdogpark.com/", is_claimed: true, frenchie_specialty: false, specialty_notes: "Dog park with grill. Small dog section. Misting stations for summer heat.", rating: 4.5 },
    // San Antonio Patios
    { city: "San Antonio", category: "Patio", name: "The Friendly Spot", address: "943 S Alamo St, San Antonio, TX 78210", phone: "(210) 224-2337", website_url: "https://thefriendlyspot.com/", is_claimed: true, frenchie_specialty: false, specialty_notes: "Huge outdoor beer garden. Dogs welcome. Shade, fans, and ice cream for pups.", rating: 4.6 },
    { city: "San Antonio", category: "Patio", name: "Southerleigh Fine Food & Brewery", address: "136 E Grayson St, San Antonio, TX 78215", phone: "(210) 455-5701", website_url: "https://southerleigh.com/", is_claimed: false, frenchie_specialty: false, specialty_notes: "Pet-friendly patio at the Pearl. Covered with fans. Upscale dining.", rating: 4.7 },

    // ═══ HEALTH GEAR RECOMMENDATIONS ═══
    { city: "Austin", category: "Gear", name: "Ruffwear Swamp Cooler Vest", address: "Available at Austin Pet Ranch, 8004 Brodie Ln", phone: "", website_url: "https://ruffwear.com/products/swamp-cooler", is_claimed: false, frenchie_specialty: true, specialty_notes: "Top-rated evaporative cooling vest. Soak in water, wring, put on. Lasts 1-2 hours in Texas heat. Essential for brachycephalic breeds.", rating: 4.9 },
    { city: "Austin", category: "Gear", name: "Canada Pooch Chill Seeker Cooling Vest", address: "Available online", phone: "", website_url: "https://www.canadapooch.com/", is_claimed: false, frenchie_specialty: true, specialty_notes: "Lightweight mesh cooling vest. Good for short walks in 90°F+. Reflective trim for visibility.", rating: 4.6 },
    { city: "Austin", category: "Gear", name: "Musher's Secret Paw Wax", address: "Available at Tomlinson's, multiple TX locations", phone: "", website_url: "https://musherssecret.com/", is_claimed: false, frenchie_specialty: true, specialty_notes: "Protects paw pads from scorching Texas pavement. Apply before walks. All-natural, food-safe wax.", rating: 4.8 },
    { city: "Austin", category: "Gear", name: "The Green Pet Shop Self-Cooling Mat", address: "Available online", phone: "", website_url: "https://thegreenpetshop.com/", is_claimed: false, frenchie_specialty: true, specialty_notes: "Pressure-activated cooling gel pad. No water or electricity needed. Great for crates and car rides.", rating: 4.5 },

    // ═══ ELITE TEXAS BREEDERS (Gold Standard — AKC Verified) ═══
    { city: "Dallas", category: "Breeder", name: "Wild Blue French Bulldogs", address: "Dallas/Fort Worth, TX", phone: "", website_url: "https://www.wildblueFrenchBulldogs.com/", is_claimed: true, frenchie_specialty: true, specialty_notes: "Voted 'Best French Bulldog Breeder' by HappyDoggo. Texas Licensed Breeder (TDLR #475). 6-panel clear health testing.", rating: 4.9 },
    { city: "San Antonio", category: "Breeder", name: "Dream Workz Frenchies", address: "San Antonio, TX", phone: "", website_url: "https://dreamworkzfrenchies.com/", is_claimed: true, frenchie_specialty: true, specialty_notes: "AKC Bred with H.E.A.R.T. program. Home-raised puppies for superior socialization. Full DNA panels.", rating: 4.8 },
    { city: "Dallas", category: "Breeder", name: "Bullistik French Bulldogs", address: "Celeste, TX (Near Dallas)", phone: "", website_url: "https://bullistikfrenchbulldogs.com/", is_claimed: true, frenchie_specialty: true, specialty_notes: "AKC Breeder of Merit since 1991. Comprehensive DNA, OFA cardiac/hip/patella screening.", rating: 4.9 },
    { city: "Houston", category: "Breeder", name: "Alpha Frenchies", address: "Tyler, TX (Ships to Houston)", phone: "", website_url: "https://alphafrenchies.com/", is_claimed: true, frenchie_specialty: true, specialty_notes: "Focus on Quality and Structure. Only 1-3 litters per year. Maximum care and socialization.", rating: 4.7 },
  ];

  console.log(`📊 Inserting ${newData.length} new listings (Patios, Gear, Breeders)...`);
  const { error } = await supabaseAdmin
    .from("directory_listings")
    .insert(newData);

  if (error) {
    console.error("❌ Error seeding:", error.message);
    process.exit(1);
  }

  // ═══ VERIFICATION ═══
  console.log("\n🔍 Post-Write Verification...");
  const categories = ["Patio", "Gear", "Breeder"];
  for (const cat of categories) {
    const { data, error: err } = await supabaseAdmin
      .from("directory_listings")
      .select("id, name, city")
      .eq("category", cat);
    if (err) {
      console.error(`❌ ${cat}: ${err.message}`);
    } else {
      console.log(`  ✅ ${cat}: ${data.length} listings verified.`);
    }
  }

  // Full count
  const { data: all } = await supabaseAdmin
    .from("directory_listings")
    .select("id");
  console.log(`\n🏁 Total listings in database: ${all?.length || 0}`);
}

seedExtras();
