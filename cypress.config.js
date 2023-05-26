const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'ojiy4t',
  viewportHeight: 1080,
  viewportWidth: 1920,
  defaultCommandTimeout: 6000,
  pageLoadTimeout: 5000,
  chromeWebSecurity: false,
  screenshotOnRunFailure: true,
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    baseUrl: 'https://rahulshettyacademy.com/seleniumPractise/#/',
    specPattern: ['cypress/e2e/**/*.cy.{js,jsx,ts,tsx}']
  },
})

