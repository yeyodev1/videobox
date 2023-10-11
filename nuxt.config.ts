import { fileURLToPath } from 'url';

const config = defineNuxtConfig({
  runtimeConfig: {
    public: {
      NUXT_VIDEOBOX_API: process.env.NUXT_VIDEOBOX_API,
      MONGODB_URI: process.env.MONGODB_URI,
      NODE_ENV: process.env.NODE_ENV,
      JWT_SECRET: process.env.JWT_SECRET,
      PORT: process.env.PORT
    }
  },
  devtools: { enabled: true },
  alias: {
    '@': fileURLToPath(new URL('./', import.meta.url)),
    '@nabux-crush/crush-button': require.resolve('@nabux-crush/crush-button'),
    '@nabux-crush/crush-text-field': require.resolve('@nabux-crush/crush-text-field'),
    '@nabux-crush/crush-text-area': require.resolve('@nabux-crush/crush-text-area')
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import '@fortawesome/fontawesome-free/scss/fontawesome.scss';
            @import '@fortawesome/fontawesome-free/scss/solid.scss';
            @import '@fortawesome/fontawesome-free/scss/regular.scss';
            @import '@fortawesome/fontawesome-free/scss/brands.scss';
            @import '@nabux-crush/crush-styles/nabuxInternalVariables';
            @import '@/styles/_styles.scss';
          `
        }
      }
    },
  },
  modules: [
    '@pinia/nuxt',
  ],
});

export default config;