import { defineEventHandler, setHeader, createError } from "h3";
import { serverSupabase } from "~/server/utils/supabase";

export default defineEventHandler(async (event) => {
  const supabase = serverSupabase();
  const { data, error } = await supabase
    .from("skills")
    .select("id, name, icon, description, category, order_index")
    .order("order_index", { ascending: true, nullsFirst: true })
    .order("name", { ascending: true });

  if (error) {
    // serverSupabase throws for config errors; here we only surface query errors
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  setHeader(event, "Cache-Control", "public, s-maxage=300, stale-while-revalidate=86400");
  return data || [];
});
