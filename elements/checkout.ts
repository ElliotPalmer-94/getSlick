import { Page, Locator } from '@playwright/test';


export class CheckoutPage {
    readonly page: Page;

    readonly completePayment: Locator;
    readonly confirmPayment: Locator;
    readonly sendReceipt: Locator;
    readonly clientEmail: Locator;
    readonly addEmailToClientProfile: Locator;
    readonly xIcon: Locator;

    constructor(page: Page) {
        this.page = page;

        this.completePayment = page.getByRole('button', { name: 'COMPLETE' });
        this.confirmPayment = page.locator('[data-bem="CheckoutPaymentPopUpV2__buttons"]');

        this.sendReceipt = page.locator('[data-variant="primaryForce"]')
            .filter({ hasText: 'SEND RECEIPT' });

        this.clientEmail = page.getByPlaceholder('Client Email Address');

        this.addEmailToClientProfile = page.locator('[class="SendReceiptAfterCheckout_emailMessage__aFTAK"]')
            .filter({ hasText: 'Do you want to save this email to the client\'s profile?' });

        this.xIcon = page.locator('[data-bem="SalonModal__header"] button')
    }

    async goto() {
        await this.page.goto('https://staging-salon.getslick.com/salon/#/salon/28161/day/checkout');
    }

}