import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/login');

        await page.fill('[data-cy=username-input]', 'francesca');
        await page.fill('[data-cy=password-input]', 'password');
        await page.click('[data-cy=login-button]');

        await expect(page).toHaveURL('/dashboard');
    });

    test('should display a list of urban planning projects and user opinions', async ({ page }) => {
        // Check if there is at least one plan item
        const planItemsCount = await page.locator('[data-cy=plan-item]').count();
        expect(planItemsCount).toBeGreaterThan(0);

        // Check if there is at least one opinion item
        const opinionItemsCount = await page.locator('[data-cy=opinion-item]').count();
        expect(opinionItemsCount).toBeGreaterThan(0);
    });

});
