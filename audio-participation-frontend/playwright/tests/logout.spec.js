import { test, expect } from '@playwright/test';

test.describe('User Authentication', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/login');

        await page.fill('[data-cy=username-input]', 'francesca');
        await page.fill('[data-cy=password-input]', 'password');
        await page.click('[data-cy=login-button]');

        await expect(page).toHaveURL('/dashboard');
    });

    test('should log out successfully', async ({ page }) => {
        await page.click('[data-cy=logout-button]');
        await expect(page).toHaveURL('/login');
    });
});
