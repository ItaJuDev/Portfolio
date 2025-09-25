import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { useRuntimeConfig } from "#imports";
import { createError } from "h3";

let cached: SupabaseClient | null = null;

export function serverSupabase(): SupabaseClient {
  if (cached) return cached;
  const config = useRuntimeConfig();
  const url = String(config.public.SUPABASE_URL || "");
  const key = String(config.public.SUPABASE_ANON_KEY || "");
  if (!url || !key) {
    throw createError({ statusCode: 500, statusMessage: "Supabase not configured" });
  }
  cached = createClient(url, key);
  return cached;
}

