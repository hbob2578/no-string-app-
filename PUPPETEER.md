# Puppeteer Automation

This directory contains Puppeteer automation scripts for testing the speakeasy web application.

## Features

The Puppeteer automation script (`puppeteer-test.js`) performs the following tests:

1. **Page Loading** - Verifies the main page loads correctly
2. **Incorrect Password** - Tests error handling for wrong passwords
3. **Correct Password** - Tests successful authentication with the secret password
4. **Navigation** - Tests redirect to secret page after successful login
5. **Secret Page** - Verifies the secret page content and functionality
6. **Back Button** - Tests navigation back to the main page
7. **Easter Egg** - Tests Konami Code functionality
8. **Screenshots** - Captures screenshots at each step for visual verification

## Usage

### Prerequisites
- Node.js installed
- The speakeasy server running on port 3000

### Running Tests

```bash
# Start the server in one terminal
npm start

# Run Puppeteer automation in another terminal  
npm run puppeteer
# or
npm run test:e2e
```

### Screenshots

All test screenshots are automatically saved to the `screenshots/` directory:
- `main-page.png` - The main speakeasy entrance page
- `error-message.png` - Error state when wrong password is entered
- `success-message.png` - Success state when correct password is entered  
- `secret-page.png` - The secret speakeasy inner sanctum page
- `konami-code.png` - State after Konami Code sequence

## Test Scenarios

### Password Testing
- **Secret Password**: "bee's knees"
- **Alternative Passwords**: "bees knees", "beesknees", "bootlegger", "giggle water"

### Navigation Flow
1. Load main page → Enter wrong password → See error
2. Enter correct password → See success message → Redirect to secret page
3. Click back button → Return to main page

### Easter Eggs
- Konami Code sequence: ↑↑↓↓←→←→BA

## Configuration

The script can be configured by modifying the constants at the top of `puppeteer-test.js`:

```javascript
const BASE_URL = 'http://localhost:3000';
const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');
const SECRET_PASSWORD = "bee's knees";
```

## Browser Compatibility

The script is configured to work with:
- Chrome/Chromium (preferred)
- System Chrome installation
- Headless mode for CI/CD environments
- Fallback options for different environments