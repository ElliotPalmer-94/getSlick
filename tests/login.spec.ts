import { test, expect } from '@playwright/test';
import { LoginPage } from '../elements/login';
import { CalendarPage } from '../elements/calendar';

test('Login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const calendarPage = new CalendarPage(page);

  await loginPage.login();
  await expect(calendarPage.menu).toBeVisible();
});

test('Unable to login with invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.login('invalidgetslick.com', '123', false);
  await expect(loginPage.loginButton).toBeDisabled();
});