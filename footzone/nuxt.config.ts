// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: false,
    ui: {
      lightGray: "#232939",
      notifications: {
        // Show toasts at the top right of the screen
        position: "top-0 bottom-0",
      },
    },
    timeline: {
      enabled: true,
    },
  },

  modules: ["@nuxt/ui", "@pinia/nuxt"],
});
