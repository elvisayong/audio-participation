import { test, expect } from '@playwright/test';

test.describe('Plan Management', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/login');

        await page.fill('[data-cy=username-input]', 'admin');
        await page.fill('[data-cy=password-input]', 'adminpassword');
        await page.click('[data-cy=login-button]');

        await expect(page).toHaveURL('/dashboard');
    });

    test('should allow an admin to create, edit, and delete an urban planning project', async ({ page }) => {
        await page.goto('/plan-management');

        // Create Plan
        await page.fill('[data-cy=plan-title-input]', 'New Plan');
        await page.fill('[data-cy=plan-description-input]', 'This is a new plan.');
        await page.fill('[data-cy=plan-expiration-input]', '2024-12-31');
        await page.click('[data-cy=save-plan-button]');

        await expect(page.locator('[data-cy=plan-item]')).toContainText('New Plan');

        // Edit Plan
        await page.click('[data-cy=edit-plan-button]');
        await page.fill('[data-cy=plan-title-input]', 'Edited Plan');
        await page.click('[data-cy=save-plan-button]');

        await expect(page.locator('[data-cy=plan-item]')).toContainText('Edited Plan');

        // Delete Plan
        await page.click('[data-cy=delete-plan-button]');
        await expect(page.locator('[data-cy=plan-item]')).not.toContainText('Edited Plan');
    });
});
