import { test, expect } from '@playwright/test';

test.describe('Opinions', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/login');

        await page.fill('[data-cy=username-input]', 'francesca');
        await page.fill('[data-cy=password-input]', 'password');
        await page.click('[data-cy=login-button]');

        await expect(page).toHaveURL('/dashboard');
    });

    test('should navigate to the Add Opinion page and submit an opinion', async ({ page }) => {
        await page.click('[data-cy=add-opinion-button-1]');
        await expect(page).toHaveURL(/\/opinions\/\d+\/add/);

        await page.click('[data-cy=start-recording-button]');
        // Wait for some time to record
        await page.waitForTimeout(3000);
        await page.click('[data-cy=stop-recording-button]');

        await page.click('[data-cy=upload-opinion-button]');
        await expect(page).toHaveURL('/dashboard');
        await expect(page.locator('[data-cy=opinion-item]')).toHaveCountGreaterThan(0);
    });
});
