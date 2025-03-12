// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false, // Disable server-side rendering (for static deployment)
  nitro: {
    preset: "static", // Enable static site generation
  },
  compatibilityDate: "2024-11-01",
  modules: ["@nuxtjs/tailwindcss"],
  devtools: { enabled: true },
  css: [
    "@fortawesome/fontawesome-free/css/all.css",
    "~/assets/css/transitions.css",
  ],

  app: {
    baseURL: "/Portfolio", // Must match your GitHub repo name exactly!
  },
});
