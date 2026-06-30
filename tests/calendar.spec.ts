import { test, expect } from '@playwright/test';
import { LoginPage } from '../elements/login';
import { CalendarPage } from '../elements/calendar';
import { CheckoutPage } from '../elements/checkout';


test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  const calendarPage = new CalendarPage(page);

  await loginPage.login();
  await expect(calendarPage.menu).toBeVisible();
});

test('Book Appointment', async ({ page }) => {
  const calendarPage = new CalendarPage(page);

  await calendarPage.walkInBooking('12:15');
  await expect(calendarPage.confirmedBooking('12:15 - 1:00 pm')).toBeVisible();
});

test('Checkout Appointment', async ({ page }) => {
  const calendarPage = new CalendarPage(page);
  const checkoutPage = new CheckoutPage(page);
  const booking = calendarPage.confirmedBooking('12:15 - 1:00 pm').last();

  await calendarPage.walkInBooking('12:15');
  await page.waitForTimeout(3000); // Wait for the booking to be added the UI is slow here
  await expect(booking).toBeVisible();
  await booking.click();
  await calendarPage.checkout.click();
  await checkoutPage.completePayment.click();
  await checkoutPage.confirmPayment.click();
  await checkoutPage.xIcon.click(); // close model
  await expect(booking).toHaveAttribute('data-appointment-status', 'paid');
});