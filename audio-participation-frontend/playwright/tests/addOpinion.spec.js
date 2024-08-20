import { test, expect } from '@playwright/test';

test.describe('Opinions', () => {
    test.beforeEach(async ({ page, context }) => {
        // Grant microphone permission
        await context.grantPermissions(['microphone'], { origin: 'http://localhost:3000' });

        // Go to login page
        await page.goto('/login');

        // Fill in login details
        await page.fill('[data-cy=username-input]', 'francesca');
        await page.fill('[data-cy=password-input]', 'password');

        // Click login button and wait for the dashboard
        await page.click('[data-cy=login-button]');
        await expect(page).toHaveURL('/dashboard');
    });

    test('should navigate to the Add Opinion page and submit an opinion', async ({ page }) => {
        await page.locator('[data-cy^="add-opinion-button"]').first().click();
        await expect(page).toHaveURL(/\/opinions\/\d+$/); 
      
        // Start recording
        await page.click('[data-cy=start-recording-button]');
        // Wait for the toast message to appear
        await expect(page.locator('.Toastify__toast--success').last()).toContainText('Recording started');

        // Wait for some time to record
        await page.waitForTimeout(3000);

        // Stop recording
        await page.click('[data-cy=stop-recording-button]');
        // Wait for the toast message to appear
        await expect(page.locator('.Toastify__toast--success').last()).toContainText('Recording stopped');

        // Upload the opinion
        await page.click('[data-cy=upload-voice-note-button]');

        await expect(page.locator('.Toastify__toast--success').last()).toContainText('Voice note uploaded successfully!');

        await expect(page).toHaveURL('/dashboard');
        
        const opinionItemsCount = await page.locator('[data-cy=opinion-item]').count();
        expect(opinionItemsCount).toBeGreaterThan(0);
    });
});
