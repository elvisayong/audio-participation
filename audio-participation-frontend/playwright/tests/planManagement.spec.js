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
        await page.goto('/manage-plans');

        // Create Plan
        await page.fill('[data-cy=plan-title-input]', 'New Plan');
        await page.fill('[data-cy=plan-description-input]', 'This is a new plan.');
        await page.fill('[data-cy=plan-expiration-date-input]', '2024-12-31');
        await page.click('[data-cy=submit-plan-button]');

        await expect(page.locator('.Toastify__toast--success').last()).toHaveText('Plan created successfully!');

        // Find the first matching plan item by title and then click the edit button
        const planItem = page.locator('[data-cy=plan-item]').filter({ hasText: 'New Plan' }).first();
        await planItem.locator('[data-cy=edit-plan-button]').click();

        // Edit the plan
        await page.fill('[data-cy=plan-title-input]', 'Edited Plan');
        await page.fill('[data-cy=plan-description-input]', 'This is an edited plan.');
        await page.fill('[data-cy=plan-expiration-date-input]', '2025-12-31');
        await page.click('[data-cy=submit-plan-button]');

        await expect(page.locator('.Toastify__toast--success').last()).toHaveText('Plan updated successfully!');

        // Find the updated plan by title and delete it
        const updatedPlanItem = page.locator('[data-cy=plan-item]').filter({ hasText: 'Edited Plan' }).first();
        await updatedPlanItem.locator('[data-cy=delete-plan-button]').click();

        await expect(page.locator('.Toastify__toast--success').last()).toHaveText('Plan deleted successfully!');
    });
});
