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
        await expect(page.locator('[data-cy=plan-item]')).toHaveCountGreaterThan(0);
        await expect(page.locator('[data-cy=opinion-item]')).toHaveCountGreaterThan(0);
    });

    test('should sort plans by expiry date', async ({ page }) => {
        await page.click('[data-cy=sort-plans-button]');
        const firstPlanExpiry = await page.locator('[data-cy=plan-item]').first().locator('[data-cy=plan-expiry]').textContent();
        const lastPlanExpiry = await page.locator('[data-cy=plan-item]').last().locator('[data-cy=plan-expiry]').textContent();
        expect(new Date(firstPlanExpiry)).toBeLessThan(new Date(lastPlanExpiry));
    });
});
