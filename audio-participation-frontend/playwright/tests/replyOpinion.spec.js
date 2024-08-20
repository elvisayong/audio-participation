import { test, expect } from '@playwright/test';

test.describe('Admin Reply to Opinion', () => {

    test.beforeEach(async ({ page }) => {
        // Admin logs in
        await page.goto('/login');
        await page.fill('[data-cy=username-input]', 'admin'); 
        await page.fill('[data-cy=password-input]', 'adminpassword'); 
        await page.click('[data-cy=login-button]');
        await expect(page).toHaveURL('/dashboard'); 

        // Navigate to the first plan with submitted opinions
        const planItem = await page.locator('[data-cy=plan-item]').first();
        await planItem.click();

        // Verify that the PlanDetails page loads
        await expect(page).toHaveURL(/\/plans\/\d+/);

        // Locate the first opinion and ensure it is visible
        const firstOpinion = await page.locator('[data-cy^="opinion-item-"]').first();
        await expect(firstOpinion).toBeVisible();

        // Check if a reply already exists and delete it if found
        const adminReply = await firstOpinion.locator('[data-cy=admin-reply]');
        if (await adminReply.count() > 0) {
            await firstOpinion.locator('[data-cy=delete-reply-button]').click();
            await page.reload(); // Reload the page to ensure the reply is removed
            await expect(firstOpinion.locator('[data-cy=admin-reply]')).toHaveCount(0); // Confirm reply is deleted
        }
    });

    test('Admin should reply to the first opinion of the first plan', async ({ page }) => {
        // Locate the first opinion and ensure it is visible (after potential deletion in beforeEach)
        const firstOpinion = await page.locator('[data-cy^="opinion-item-"]').first();
        await expect(firstOpinion).toBeVisible();

        // Write a reply to the first opinion
        const replyText = 'Thank you for your feedback!';
        await firstOpinion.locator('[data-cy=reply-input]').fill(replyText);

        // Submit the reply
        await firstOpinion.locator('[data-cy=submit-reply-button]').click();

        // Refresh the page to ensure the reply is loaded
        await page.reload();

        // Verify that the reply is displayed
        const adminReply = await firstOpinion.locator('[data-cy=admin-reply]');
        await expect(adminReply).toContainText(replyText);
    });
});
