const { test, expect } = require('@playwright/test');

test.describe('Register Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/register');
    });

    test('should display the registration form', async ({ page }) => {
        await expect(page.locator('[data-cy=register-container]')).toBeVisible();
        await expect(page.locator('[data-cy=register-title]')).toHaveText('Register');
    });

    test('should allow a user to register', async ({ page }) => {
        await page.fill('[data-cy=register-username]', 'testuser');
        await page.fill('[data-cy=register-password]', 'testpassword');
        await page.fill('[data-cy=register-email]', 'testuser@example.com');
        await page.click('[data-cy=register-button]');

        await expect(page).toHaveURL('/');
    });

    test('should navigate to login page', async ({ page }) => {
        await page.click('[data-cy=register-login-link]');
        await expect(page).toHaveURL('/');
    });
});
