import { defineEventHandler, setHeader, createError } from "h3";
import { serverSupabase } from "~/server/utils/supabase";

export default defineEventHandler(async (event) => {
  const supabase = serverSupabase();
  const { data, error } = await supabase
    .from("projects")
    .select(
      "id, title, description, image, images, video, short_talk, category, order_index",
    )
    .order("order_index", { ascending: true, nullsFirst: true })
    .order("title", { ascending: true });

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  const normalized = (data || []).map((p: any) => ({
    ...p,
    images: Array.isArray(p?.images) ? p.images : p?.images ? [p.images] : [],
  }));

  setHeader(event, "Cache-Control", "public, s-maxage=300, stale-while-revalidate=86400");
  return normalized;
});
