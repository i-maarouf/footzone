// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: false,
    ui: {
      lightGray: "#232939",
    },
    timeline: {
      enabled: true,
    },
  },
  modules: ["@nuxt/ui"],
});
