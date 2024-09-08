// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
    '@nuxt/image',
    'vue3-carousel-nuxt',
    'nuxt-swiper',
    '@nuxt/ui',
  ],

  compatibilityDate: '2024-09-08'
})