const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'xpmqun',
  video: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  }
})