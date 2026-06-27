# Getslick QA Test

A small Playwright test suite for validating key login and password recovery flows for the Getslick application.

## Notes

MFA is enabled for this account, so I did not have time to implement email-based authentication code retrieval for the full login flow. Instead, I focused on the other testable flows that could be covered within the available time.

## Setup

Install Playwright by following the official guide:
https://playwright.dev/docs/intro#installing-playwright

Initialize Playwright in the project:

```bash
npm init playwright@latest
```

## Running Tests

Run tests in headless mode:

```bash
npx playwright test
```

Run tests with the UI and headed browser mode:

```bash
npx playwright test --headed --ui
```

Make sure to change these with your login details, these can be found in the `login.spec`
```
const email = process.env.EMAIL || 'email@example.com'; 
const password = process.env.PASSWORD || 'password'; 
```
## Test Coverage

The suite currently covers:
- Valid login flow
- Invalid login flow
- Forgot password flow
