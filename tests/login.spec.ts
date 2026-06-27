import { test, expect } from '@playwright/test';
import { LoginPage } from '../elements/login';

const email = process.env.EMAIL || 'email@example.com'; // Replace with your default email if not set in environment variables
const password = process.env.PASSWORD || 'password'; // Replace with your default password if not set in environment variables

test('Login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(email, password);
  await expect(page.getByRole('heading', { name: 'Check your' })).toBeVisible();
});

test('Unable to login with invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('invalidgetslick.com', '123', false);
  await expect(loginPage.loginButton).toBeDisabled();
});