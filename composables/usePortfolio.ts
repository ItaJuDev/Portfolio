import { computed, unref, type Ref } from "vue";

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
  project_link?: string | null;
  publish_link?: string | null;
  techs?: Array<{ id: number; name: string; icon?: string | null; short: string }> | null;
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

type Contact = {
  id: number;
  label?: string | null; // Display name e.g., LinkedIn
  type?: string | null; // linkedin, github, email, custom
  url?: string | null; // https/mailto link
  icon?: string | null; // skillicons id or absolute URL
  order_index?: number | null;
  active?: boolean | null; // filter visible links
};

export function useSkills() {
  const { data, pending, error, refresh } = useFetch<Skill[]>("/api/skills", {
    key: "skills",
    server: true,
    default: () => [],
  });

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

export function useProjects(category?: Ref<string> | string) {
  const catRef = computed(() => {
    const v = unref(category as any) as string | undefined;
    return (v ?? "ALL").toString();
  });

  const { data, pending, error, refresh } = useFetch<Project[]>("/api/projects", {
    key: () => `projects:${catRef.value}`,
    query: computed(() => (catRef.value === "ALL" ? {} : { category: catRef.value })),
    server: true,
    default: () => [],
    watch: [catRef],
  });

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
  // Fetch via server API with caching and SSR to avoid client-side delay
  const { data, pending, error, refresh } = useFetch<Experience[]>("/api/experiences", {
    key: "experiences",
    server: true,
    lazy: false,
    default: () => [],
  });

  return { experiences: data, pending, error, refresh };
}

export function useContacts() {
  const { data, pending, error, refresh } = useFetch<Contact[]>("/api/contacts", {
    key: "contacts",
    server: true,
    default: () => [],
  });

  return { contacts: data, pending, error, refresh };
}
