// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'pt-br'
      },
      title: 'Previsão do Tempo',
      charset: 'utf-8',
      meta: [
        {
          name: 'description',
          content: 'Descubra como está em tempo real a previsão do tempo para qualquer local.'
        }
      ],
      link: []
    }
  },
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  runtimeConfig: {
    public: {
      NUXT_API_KEY: process.env.NUXT_API_KEY
    }
  },
  modules: ['@nuxtjs/eslint-module', 'nuxt-vercel-analytics']
})
