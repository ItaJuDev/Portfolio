import { createClient } from "@supabase/supabase-js";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const url = String(config.public.SUPABASE_URL);
  const key = String(config.public.SUPABASE_ANON_KEY);
  const client = url && key ? createClient(url, key) : null;

  return {
    provide: {
      supabase: client,
    },
  };
});

declare module "#app" {
  interface NuxtApp {
    $supabase: ReturnType<typeof createClient> | null;
  }
}

export {};
