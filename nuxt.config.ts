// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  target: 'server',
  devtools: {enabled: true},
  telemetry: false,

  // disable hashes in filenames
  filenameHashing: false,
  // delete HTML related webpack plugins
  chainWebpack: config => {
    config.plugins.delete('html')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
  },
})
