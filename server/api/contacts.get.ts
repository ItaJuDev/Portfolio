import { defineEventHandler, setHeader, createError } from "h3";
import { serverSupabase } from "~/server/utils/supabase";

export default defineEventHandler(async (event) => {
  const supabase = serverSupabase();
  const { data, error } = await supabase
    .from("contacts")
    .select("id, label, type, url, icon, order_index, active")
    .order("order_index", { ascending: true, nullsFirst: true })
    .order("label", { ascending: true });

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  const filtered = (data || []).filter((c: any) => c.active !== false);

  setHeader(event, "Cache-Control", "public, s-maxage=300, stale-while-revalidate=86400");
  return filtered;
});
