const { test, expect} = require('@playwright/test');

test.describe('Login Functionality', () => {
  test('should login successfully with valid credentials', async ({page}) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('[data-cy=username-input]', 'francesca');

    await page.fill('[data-cy=password-input]', 'password');

    await page.click('[data-cy=login-button]');

    await expect(page).toHaveURL('http://localhost:3000/dashboard');


  });
});
