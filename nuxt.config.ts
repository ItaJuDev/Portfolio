// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  nitro: {
    preset: "vercel",
  },
  runtimeConfig: {
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "admin",
  },
  compatibilityDate: "2024-11-01",
  modules: ["@nuxtjs/tailwindcss"],
  devtools: { enabled: true },
  css: [
    "@fortawesome/fontawesome-free/css/all.css",
    "~/assets/css/transitions.css",
  ],
});
