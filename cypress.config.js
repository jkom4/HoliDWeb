const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    supportFile: false, // Désactive le support file
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
