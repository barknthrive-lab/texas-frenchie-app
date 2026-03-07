import { createClient } from "@supabase/supabase-js";

/**
 * Initialize the Supabase client.
 * Note: Provide your actual URL and Anon Key in a `.env.local` file.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://replace-me.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJ_replace_me";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
