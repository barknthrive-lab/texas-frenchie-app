/**
 * Direct Postgres migration — adds Frenchie specialty columns.
 * Uses the Supabase pooler connection string derived from the project ref.
 */
const { Client } = require("pg");
require("dotenv").config({ path: require("path").resolve(__dirname, "../.env.local") });

// Direct Postgres connection
const dbPassword = encodeURIComponent(process.env.SUPABASE_DB_PASSWORD || "");
const connectionString = `postgresql://postgres:${dbPassword}@db.mwvkdykljcsefvupkmew.supabase.co:5432/postgres`;

async function migrate() {
  console.log("🔧 Running direct Postgres migration...\n");
  
  const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });
  
  try {
    await client.connect();
    console.log("✅ Connected to Postgres.\n");

    const alterStatements = [
      "ALTER TABLE public.directory_listings ADD COLUMN IF NOT EXISTS is_emergency_24hr BOOLEAN DEFAULT false",
      "ALTER TABLE public.directory_listings ADD COLUMN IF NOT EXISTS frenchie_specialty BOOLEAN DEFAULT false",
      "ALTER TABLE public.directory_listings ADD COLUMN IF NOT EXISTS specialty_notes TEXT",
      "ALTER TABLE public.directory_listings ADD COLUMN IF NOT EXISTS rating NUMERIC",
    ];

    for (const sql of alterStatements) {
      try {
        await client.query(sql);
        const colName = sql.match(/IF NOT EXISTS (\w+)/)?.[1] || "unknown";
        console.log(`  ✅ Column "${colName}" — OK`);
      } catch (err) {
        console.error(`  ❌ Error:`, err.message);
      }
    }

    // Verify columns exist
    console.log("\n🔍 Verifying columns...");
    const result = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'directory_listings' 
      AND column_name IN ('is_emergency_24hr', 'frenchie_specialty', 'specialty_notes', 'rating')
      ORDER BY column_name
    `);
    
    for (const row of result.rows) {
      console.log(`  ✅ ${row.column_name} (${row.data_type})`);
    }
    
    if (result.rows.length === 4) {
      console.log("\n🏁 All 4 specialty columns verified. Migration COMPLETE.");
    } else {
      console.log(`\n⚠️  Only ${result.rows.length}/4 columns found. Check for errors above.`);
    }
  } catch (err) {
    console.error("❌ Connection error:", err.message);
    console.log("\nIf the password is wrong, you may need to set the database password in Supabase Dashboard > Settings > Database.");
  } finally {
    await client.end();
  }
}

migrate();
