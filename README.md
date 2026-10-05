# Playwright POM — TestAutomationPractice

TypeScript Page Object Model suite for [https://testautomationpractice.blogspot.com/](https://testautomationpractice.blogspot.com/).

## Setup

```bash
npm install
npx playwright install
```

## Run

```bash
npm test                 # all browsers
npm run test:chromium    # Chromium only
npm run test:headed      # headed Chromium
npm run test:ui          # Playwright UI mode
npm run report           # last HTML report
npm run report:merge     # merge local blob-report/ into HTML
```

Override the target site with `BASE_URL`. Default timeout is `TIMEOUT_MS` (milliseconds).

To use an installed Google Chrome instead of Playwright Chromium:

```bash
# PowerShell
$env:PW_CHANNEL='chrome'; npm run test:chromium
```
