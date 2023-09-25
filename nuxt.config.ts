import { fileURLToPath } from 'url';

const config = defineNuxtConfig({
  devtools: { enabled: true },
  alias: {
    '@': fileURLToPath(new URL('./', import.meta.url)),
    '@nabux-crush/crush-button': require.resolve('@nabux-crush/crush-button')
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