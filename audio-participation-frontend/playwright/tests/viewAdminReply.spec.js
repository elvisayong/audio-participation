import { test, expect } from '@playwright/test';

test.describe('View Admin Reply', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/login');

        await page.fill('[data-cy=username-input]', 'francesca');
        await page.fill('[data-cy=password-input]', 'password');
        await page.click('[data-cy=login-button]');

        await expect(page).toHaveURL('/dashboard');
    });

    test('should display admin replies to user opinions', async ({ page }) => {
        await expect(page.locator('[data-cy=admin-reply]')).toBeVisible();
    });
});
