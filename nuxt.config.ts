// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  nitro: {
    preset: "vercel",
  },
  compatibilityDate: "2024-11-01",
  modules: ["@nuxtjs/tailwindcss"],
  devtools: { enabled: true },
  css: ["@fortawesome/fontawesome-free/css/all.css", "~/assets/css/transitions.css"],
  runtimeConfig: {
    public: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.SUPABASE_API_KEY,
    },
  },
});
