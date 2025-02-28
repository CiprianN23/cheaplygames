// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  image: {
    inject: true,
  },
  modules: ["@nuxtjs/seo", "@nuxt/icon", "@nuxt/image"],
  runtimeConfig: {
    public: {
      PRIVATE_EMAIL: process.env.PRIVATE_EMAIL,
    },
  },
});
