const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  timeout: 60000, // Timeout for each test in milliseconds
  retries: 2, // Number of retries on failure
  use: {
    headless: false, // Run tests in headed mode
    baseURL: 'http://localhost:3000', 
    screenshot: 'only-on-failure', // Capture screenshot only on test failure
    video: 'retry-with-video', // Capture video on retry
  },
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'Firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'WebKit',
      use: { browserName: 'webkit' },
    },
  ],
  testDir: './playwright/tests', 
});
