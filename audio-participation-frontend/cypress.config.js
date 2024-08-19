const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: "http://localhost:3000",
    video: true,
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.js"  
  },
});
