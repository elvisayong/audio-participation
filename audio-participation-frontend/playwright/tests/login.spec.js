import { test, expect } from '@playwright/test';

test.describe('User Authentication', () => {
    test('should log in with valid credentials', async ({ page }) => {
        await page.goto('/login');

        await page.fill('[data-cy=username-input]', 'francesca');
        await page.fill('[data-cy=password-input]', 'password');
        await page.click('[data-cy=login-button]');

        await expect(page).toHaveURL('/dashboard');
        await expect(page.locator('[data-cy=dashboard-title]')).toBeVisible();
    });
});
