import { test, expect } from '@playwright/test';

test.describe('User Authentication', () => {
    test('should register a new user', async ({ page }) => {
        await page.goto('/register');

        const randomUsername = `user${Math.floor(Math.random() * 10000)}`;
        await page.fill('[data-cy=username-input]', randomUsername);
        await page.fill('[data-cy=password-input]', 'password');
        await page.fill('[data-cy=email-input]', `${randomUsername}@example.com`);
        await page.click('[data-cy=register-button]');

        await expect(page).toHaveURL('/');
    });
});
