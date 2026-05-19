import { defineEventHandler, setHeader, getQuery } from "h3";
import projectsData from "../data/projects.json";

const toUrl = (val: any): string => {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val === "object") return val.url || val.src || "";
  return String(val);
};

const toSeconds = (t: string | null): number => {
  if (!t) return 0;
  if (/^\d+$/.test(t)) return Number(t);
  const m = t.match(/(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/i);
  if (!m) return 0;
  return Number(m[1] || 0) * 3600 + Number(m[2] || 0) * 60 + Number(m[3] || 0);
};

const normalizeYouTube = (url: string): string => {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      const id = u.pathname.replace(/^\//, "");
      if (!id) return url;
      const start = toSeconds(u.searchParams.get("t") || u.searchParams.get("start"));
      return `https://www.youtube.com/embed/${id}${start ? `?start=${start}` : ""}`;
    }
    if (host.endsWith("youtube.com")) {
      if (u.pathname === "/watch") {
        const id = u.searchParams.get("v");
        if (!id) return url;
        const start = toSeconds(u.searchParams.get("t") || u.searchParams.get("start"));
        return `https://www.youtube.com/embed/${id}${start ? `?start=${start}` : ""}`;
      }
      if (u.pathname.startsWith("/shorts/")) {
        const id = u.pathname.split("/")[2];
        if (!id) return url;
        return `https://www.youtube.com/embed/${id}`;
      }
      if (u.pathname.startsWith("/embed/")) return url;
    }
  } catch (_) {}
  return url;
};

export default defineEventHandler(async (event) => {
  const { category } = getQuery(event) as { category?: string };
  const cat = (category || "").toString().trim();

  let projects: any[] = [...(projectsData as any[])];

  if (cat && cat.toUpperCase() !== "ALL") {
    projects = projects.filter((p) => p.category === cat);
  }

  projects.sort((a, b) => {
    const ai = a.order_index ?? 0;
    const bi = b.order_index ?? 0;
    if (ai !== bi) return ai - bi;
    return String(a.title).localeCompare(String(b.title));
  });

  const normalized = projects.map((p) => {
    const rawImages = Array.isArray(p.images) ? p.images : p.images ? [p.images] : [];
    const images = rawImages.map(toUrl).filter(Boolean);
    const techs = Array.isArray(p.techs) ? p.techs : [];
    return {
      id: p.id,
      title: p.title,
      description: p.description,
      short_talk: p.short_talk ?? null,
      category: p.category ?? null,
      order_index: p.order_index ?? null,
      image: toUrl(p.image) || images[0] || null,
      images,
      video: normalizeYouTube(toUrl(p.video) || "") || null,
      project_link: toUrl(p.project_link) || null,
      publish_link: toUrl(p.publish_link) || null,
      techs: techs.map((t: any) => ({
        id: t.id,
        name: t.name,
        icon: t.icon ?? null,
        short: t.short ?? String(t.name),
      })),
    };
  });

  setHeader(event, "Cache-Control", "public, s-maxage=300, stale-while-revalidate=86400");
  return normalized;
});
