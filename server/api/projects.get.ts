import { defineEventHandler, setHeader, createError, getQuery } from "h3";
import { serverSupabase } from "~/server/utils/supabase";

export default defineEventHandler(async (event) => {
  const supabase = serverSupabase();
  const { category } = getQuery(event) as { category?: string };

  let query = supabase
    .from("projects")
    .select(
      "id, title, description, image, images, video, short_talk, category, order_index, project_link, publish_link",
    );

  const cat = (category || "").toString().trim();
  if (cat && cat.toUpperCase() !== "ALL") {
    query = query.eq("category", cat);
  }

  const { data, error } = await query
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

  const toSeconds = (t: string | null) => {
    if (!t) return 0;
    // Accept forms like 90, 90s, 1m30s, 2h3m4s
    if (/^\d+$/.test(t)) return Number(t);
    const re = /(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/i;
    const m = t.match(re);
    if (!m) return 0;
    const h = Number(m[1] || 0);
    const mnt = Number(m[2] || 0);
    const s = Number(m[3] || 0);
    return h * 3600 + mnt * 60 + s;
  };

  const normalizeYouTube = (url: string) => {
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
        // /watch?v=ID
        if (u.pathname === "/watch") {
          const id = u.searchParams.get("v");
          if (!id) return url;
          const start = toSeconds(u.searchParams.get("t") || u.searchParams.get("start"));
          return `https://www.youtube.com/embed/${id}${start ? `?start=${start}` : ""}`;
        }
        // /shorts/ID
        if (u.pathname.startsWith("/shorts/")) {
          const id = u.pathname.split("/")[2];
          if (!id) return url;
          return `https://www.youtube.com/embed/${id}`;
        }
        // already /embed/ID
        if (u.pathname.startsWith("/embed/")) {
          return url;
        }
      }
    } catch (_) {
      // fallthrough
    }
    return url;
  };

  const normalized = (data || []).map((p: any) => {
    const rawImages = Array.isArray(p?.images) ? p.images : p?.images ? [p.images] : [];
    const images = rawImages.map(toUrl).filter(Boolean);
    return {
      ...p,
      image: toUrl(p?.image) || images[0] || null,
      video: normalizeYouTube(toUrl(p?.video) || "") || null,
      project_link: toUrl(p?.project_link) || null,
      publish_link: toUrl(p?.publish_link) || null,
      images,
      // placeholder; will be filled below if join table exists
      techs: [] as Array<{ id: number; name: string; icon?: string | null; short: string }>,
    };
  });

  // Attempt to attach tech stack per project via join table `project_skills`
  // Schema suggestion:
  //   project_skills(project_id -> projects.id, skill_id -> skills.id, alias text null, order_index int null)
  // If the table doesn't exist yet, this block fails silently and `techs` stays empty.
  try {
    const projectIds = normalized.map((p: any) => p.id).filter(Boolean);
    if (projectIds.length) {
      const { data: links, error: linksErr } = await supabase
        .from("project_skills")
        .select("project_id, skill_id, alias, order_index")
        .in("project_id", projectIds);

      if (!linksErr && links && links.length) {
        const skillIds = Array.from(new Set(links.map((l: any) => l.skill_id).filter(Boolean)));
        if (skillIds.length) {
          const { data: skills, error: skillsErr } = await supabase
            .from("skills")
            .select("id, name, icon")
            .in("id", skillIds);
          if (!skillsErr && skills) {
            const skillMap = new Map<number, { id: number; name: string; icon?: string | null }>();
            for (const s of skills as any[]) skillMap.set(s.id, s);

            const grouped = new Map<number, any[]>();
            for (const l of links as any[]) {
              const s = skillMap.get(l.skill_id);
              if (!s) continue;
              const entry = { id: s.id, name: s.name, icon: s.icon || null, short: String(l.alias || s.name) };
              if (!grouped.has(l.project_id)) grouped.set(l.project_id, []);
              grouped.get(l.project_id)!.push({ ...entry, order_index: l.order_index ?? null });
            }

            for (const p of normalized as any[]) {
              const items = (grouped.get(p.id) || [])
                .sort((a: any, b: any) => {
                  const ai = a.order_index ?? 0;
                  const bi = b.order_index ?? 0;
                  if (ai !== bi) return ai - bi;
                  return String(a.short).localeCompare(String(b.short));
                })
                .map(({ order_index, ...rest }: any) => rest);
              p.techs = items;
            }
          }
        }
      }
    }
  } catch (_) {
    // Ignore; optional enhancement only
  }

  setHeader(event, "Cache-Control", "public, s-maxage=300, stale-while-revalidate=86400");
  return normalized;
});
