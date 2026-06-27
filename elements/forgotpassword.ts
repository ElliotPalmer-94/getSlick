import { Page, Locator } from '@playwright/test';

export class ForgotPasswordPage {
    readonly page: Page;

    readonly emailInput: Locator;
    readonly sendCodeButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.emailInput = page.getByLabel('Email address');
        this.sendCodeButton = page.getByRole('button', { name: 'SEND CODE' });

    }

    async goto() {
        await this.page.goto('https://staging-salon.getslick.com/salon/#/login/forgot');
    }

    async forgotPassword(email: string) {
        await this.emailInput.fill(email);
        await this.sendCodeButton.click();
    }
}