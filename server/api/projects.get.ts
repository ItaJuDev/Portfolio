import { defineEventHandler, setHeader, createError } from "h3";
import { serverSupabase } from "~/server/utils/supabase";

export default defineEventHandler(async (event) => {
  const supabase = serverSupabase();
  const { data, error } = await supabase
    .from("projects")
    .select(
      "id, title, description, image, images, video, short_talk, category, order_index, project_link, publish_link",
    )
    .order("order_index", { ascending: true, nullsFirst: true })
    .order("title", { ascending: true });

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  const toUrl = (val: any) => {
    if (!val) return "";
    if (typeof val === "string") return val;
    if (typeof val === "object") return val.url || val.src || "";
    return String(val);
  };

  const normalized = (data || []).map((p: any) => {
    const rawImages = Array.isArray(p?.images) ? p.images : p?.images ? [p.images] : [];
    const images = rawImages.map(toUrl).filter(Boolean);
    return {
      ...p,
      image: toUrl(p?.image) || images[0] || null,
      video: toUrl(p?.video) || null,
      project_link: toUrl(p?.project_link) || null,
      publish_link: toUrl(p?.publish_link) || null,
      images,
    };
  });

  setHeader(event, "Cache-Control", "public, s-maxage=300, stale-while-revalidate=86400");
  return normalized;
});
