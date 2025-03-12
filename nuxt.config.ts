// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  modules: ["@nuxtjs/tailwindcss"],
  devtools: { enabled: true },
  css: [
    "@fortawesome/fontawesome-free/css/all.css",
    "~/assets/css/transitions.css",
  ],

  target: "static", // Required for GitHub Pages
  app: {
    baseURL: "/Portfolio/", // GitHub Pages repo name
  },
  generate: {
    fallback: "404.html", // Ensures SPA routing works on GitHub Pages
  },
});
