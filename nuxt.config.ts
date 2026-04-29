import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      title: '2048 Game',
      meta: [
        { name: 'description', content: 'A polished 2048 puzzle game built with Nuxt and Vue' },
        { name: 'theme-color', content: '#1a1a2e' },
      ],
    },
  },
})
