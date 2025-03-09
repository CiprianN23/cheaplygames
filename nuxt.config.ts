// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Cheaply Games",
      htmlAttrs: {
        lang: "en",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/robots",
    "nuxt-link-checker",
    "@nuxtjs/sitemap",
    "@vueuse/nuxt",
    "@nuxtjs/html-validator",
    "@nuxt/eslint",
  ],
  runtimeConfig: {
    public: {
      PRIVATE_EMAIL: process.env.PRIVATE_EMAIL,
    },
  },
});