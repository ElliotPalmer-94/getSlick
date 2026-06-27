import { test, expect } from '@playwright/test';
import { LoginPage } from '../elements/login';
import { ForgotPasswordPage } from '../elements/forgotpassword';

test('Forgot Password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const forgotPasswordPage = new ForgotPasswordPage(page);

    await loginPage.goto();
    await loginPage.forgotPasswordLink.click();
    await forgotPasswordPage.forgotPassword('test@getslick.com');
    await expect(page.getByText('If your email is registered on Slick, you\'ll receive a 6 digit code via email.')).toBeVisible();
});