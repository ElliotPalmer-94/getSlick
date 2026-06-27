import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;

    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly forgotPasswordLink: Locator;
    readonly loginButton: Locator;
    readonly sendCodeButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.emailInput = page.getByTestId('UserEmail');
        this.passwordInput = page.getByTestId('PasswordInput');
        this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot password?' })
        this.loginButton = page.getByTestId('login');
        this.sendCodeButton = page.getByRole('button', { name: 'SEND CODE' });

    }

    async goto() {
        await this.page.goto('https://staging-salon.getslick.com');
    }

    async login(email: string, password: string, click = true) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        
        if (click) {
            await this.loginButton.click();
        }
    }
}