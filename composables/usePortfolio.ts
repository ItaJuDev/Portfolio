import { computed } from "vue";

type Skill = {
  id: number;
  name: string;
  icon?: string;
  description?: string;
  category: "frontend" | "backend" | "others" | string;
  order_index?: number | null;
};

type Project = {
  id: number;
  title: string;
  description?: string | null;
  image?: string | null;
  images?: string[] | null;
  video?: string | null;
  short_talk?: string | null;
  category?: string | null;
  order_index?: number | null;
};

type Experience = {
  id: number;
  company: string;
  role?: string | null;
  start_date?: string | null; // ISO date
  end_date?: string | null; // ISO date or null for current
  description?: string | null;
  order_index?: number | null;
};

export function useSkills() {
  const { $supabase } = useNuxtApp();
  const enabled = Boolean($supabase);

  const { data, pending, error, refresh } = useAsyncData(
    "skills",
    async () => {
      if (!$supabase) return [] as Skill[];
      const { data, error } = await $supabase
        .from("skills")
        .select("id, name, icon, description, category, order_index")
        .order("order_index", { ascending: true, nullsFirst: true })
        .order("name", { ascending: true });
      if (error) throw error;
      return (data || []) as Skill[];
    },
    { server: false, immediate: enabled }
  );

  const grouped = computed(() => {
    const groups: Record<string, Skill[]> = { frontend: [], backend: [], others: [] };
    for (const s of data.value || []) {
      const key = (s.category || "others").toLowerCase();
      (groups[key] ||= []).push(s);
    }
    return groups;
  });

  return { skills: data, grouped, pending, error, refresh };
}

export function useProjects() {
  const { $supabase } = useNuxtApp();
  const enabled = Boolean($supabase);

  const { data, pending, error, refresh } = useAsyncData(
    "projects",
    async () => {
      if (!$supabase) return [] as Project[];
      const { data, error } = await $supabase
        .from("projects")
        .select("id, title, description, image, images, video, short_talk, category, order_index")
        .order("order_index", { ascending: true, nullsFirst: true })
        .order("title", { ascending: true });
      if (error) throw error;
      // Ensure images is an array if stored as JSON
      return (data || []).map((p: any) => ({
        ...p,
        images: Array.isArray(p?.images) ? p.images : p?.images ? [p.images] : [],
      })) as Project[];
    },
    { server: false, immediate: enabled }
  );

  const byCategory = computed(() => {
    const map = new Map<string, Project[]>();
    for (const p of data.value || []) {
      const cat = (p.category || "Uncategorized").trim();
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(p);
    }
    return Array.from(map, ([category, projects]) => ({ category, projects }));
  });

  return { projects: data, byCategory, pending, error, refresh };
}

export function useExperiences() {
  const { $supabase } = useNuxtApp();
  const enabled = Boolean($supabase);

  const { data, pending, error, refresh } = useAsyncData(
    "experiences",
    async () => {
      if (!$supabase) return [] as Experience[];
      const { data, error } = await $supabase
        .from("experiences")
        .select("id, company, role, start_date, end_date, description, order_index")
        .order("order_index", { ascending: true, nullsFirst: true })
        .order("start_date", { ascending: false });
      if (error) throw error;
      return (data || []) as Experience[];
    },
    { server: false, immediate: enabled }
  );

  return { experiences: data, pending, error, refresh };
}

