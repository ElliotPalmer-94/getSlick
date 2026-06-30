import { Page, Locator } from '@playwright/test';


export class LoginPage {
    readonly page: Page;

    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly forgotPasswordLink: Locator;
    readonly loginButton: Locator;
    readonly sendCodeButton: Locator;
    readonly button3: Locator;
    readonly button0: Locator;
    readonly button2: Locator;

    constructor(page: Page) {
        this.page = page;

        this.emailInput = page.getByTestId('UserEmail');
        this.passwordInput = page.getByTestId('PasswordInput');
        this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot password?' })
        this.loginButton = page.getByTestId('login');
        this.sendCodeButton = page.getByRole('button', { name: 'SEND CODE' });
        this.button3 = page.getByRole('button', { name: '3' });
        this.button0 = page.getByRole('button', { name: '0' });
        this.button2 = page.getByRole('button', { name: '2' });
    }

    async goto() {
        await this.page.goto('https://staging-salon.getslick.com');
    }

    readonly DEFAULT_EMAIL = process.env.EMAIL ?? 'email@example.com'; // Change this to your own email or set the EMAIL and PASSWORD environment variables
    readonly DEFAULT_PASSWORD = process.env.PASSWORD ?? 'password'; // Change this to your own password or set the EMAIL and PASSWORD environment variables

    async login(
        email: string = this.DEFAULT_EMAIL,
        password: string = this.DEFAULT_PASSWORD,
        click: boolean = true) {

        await this.page.goto('https://staging-salon.getslick.com');

        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);

        if (click) {
            await this.loginButton.click();
            await this.button3.dblclick({ delay: 400 });
            await this.button0.click({ delay: 400 });
            await this.button2.click({ delay: 400 });
        }
    }
}