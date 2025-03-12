// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  modules: ["@nuxtjs/tailwindcss"],
  devtools: { enabled: true },
  css: [
    "@fortawesome/fontawesome-free/css/all.css",
    "~/assets/css/transitions.css",
  ],

  app: {
    baseURL: "/Portfolio/", // Must match your GitHub repo name exactly!
  },
});
