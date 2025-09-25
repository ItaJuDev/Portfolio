import { defineEventHandler, setHeader, createError } from "h3";
import { serverSupabase } from "~/server/utils/supabase";

export default defineEventHandler(async (event) => {
  const supabase = serverSupabase();
  const { data, error } = await supabase
    .from("experiences")
    .select("id, company, role, start_date, end_date, description, order_index")
    .order("order_index", { ascending: true, nullsFirst: true })
    .order("start_date", { ascending: false });

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  // Cache at the edge (Vercel) to speed up repeated requests.
  // Adjust s-maxage as needed (seconds).
  setHeader(event, "Cache-Control", "public, s-maxage=300, stale-while-revalidate=86400");

  return data || [];
});
