const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// Configuration
const BASE_URL = 'http://localhost:3000';
const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');
const SECRET_PASSWORD = "bee's knees";

// Ensure screenshots directory exists
if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR);
}

async function runPuppeteerTests() {
    console.log('🚀 Starting Puppeteer automation tests...');
    
    let browser;
    try {
        // Try to launch browser with different options for compatibility
        const launchOptions = {
            headless: 'new',  // Use new headless mode
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--disable-gpu'
            ]
        };

        // Try to find system Chrome first
        try {
            browser = await puppeteer.launch(launchOptions);
        } catch (error) {
            console.log('Could not launch browser with default settings, trying alternative...');
            launchOptions.executablePath = '/usr/bin/google-chrome-stable';
            browser = await puppeteer.launch(launchOptions);
        }

        const page = await browser.newPage();
        await page.setViewport({ width: 1200, height: 800 });

        console.log('📱 Testing main page...');
        
        // Test 1: Load main page
        await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
        console.log('✅ Main page loaded successfully');
        
        // Take screenshot of main page
        await page.screenshot({ 
            path: path.join(SCREENSHOTS_DIR, 'main-page.png'),
            fullPage: true 
        });
        console.log('📸 Screenshot saved: main-page.png');

        // Test 2: Check page title and content
        const title = await page.title();
        console.log(`📄 Page title: ${title}`);
        
        const pageText = await page.evaluate(() => document.body.textContent);
        if (pageText.includes('The Whispered Word')) {
            console.log('✅ Main page content verification passed');
        } else {
            console.log('❌ Main page content verification failed');
        }

        // Test 3: Try incorrect password
        console.log('🔐 Testing incorrect password...');
        const passwordInput = await page.waitForSelector('#passwordInput');
        await passwordInput.type('wrong password');
        
        const enterButton = await page.waitForSelector('.enter-btn');
        await enterButton.click();
        
        // Wait for error message
        await page.waitForSelector('.message.error', { timeout: 5000 });
        console.log('✅ Error message displayed for incorrect password');
        
        // Take screenshot of error state
        await page.screenshot({ 
            path: path.join(SCREENSHOTS_DIR, 'error-message.png'),
            fullPage: true 
        });
        console.log('📸 Screenshot saved: error-message.png');

        // Test 4: Enter correct password
        console.log('🔑 Testing correct password...');
        await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for error message to clear
        
        // Clear input and enter correct password
        await passwordInput.click({ clickCount: 3 }); // Select all text
        await passwordInput.type(SECRET_PASSWORD);
        await enterButton.click();

        // Wait for success message and redirect
        await page.waitForSelector('.message.success', { timeout: 5000 });
        console.log('✅ Success message displayed for correct password');
        
        // Take screenshot of success message
        await page.screenshot({ 
            path: path.join(SCREENSHOTS_DIR, 'success-message.png'),
            fullPage: true 
        });
        console.log('📸 Screenshot saved: success-message.png');

        // Test 5: Wait for redirect to secret page
        console.log('🎭 Waiting for redirect to secret page...');
        await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 });
        
        const secretUrl = page.url();
        if (secretUrl.includes('/secret')) {
            console.log('✅ Successfully redirected to secret page');
        } else {
            console.log('❌ Failed to redirect to secret page');
        }

        // Test 6: Verify secret page content
        const secretTitle = await page.title();
        console.log(`🎩 Secret page title: ${secretTitle}`);
        
        const secretContent = await page.evaluate(() => document.body.textContent);
        if (secretContent.includes('Inner Sanctum') || secretContent.includes('The Real McCoy')) {
            console.log('✅ Secret page content verification passed');
        } else {
            console.log('❌ Secret page content verification failed');
        }

        // Take screenshot of secret page
        await page.screenshot({ 
            path: path.join(SCREENSHOTS_DIR, 'secret-page.png'),
            fullPage: true 
        });
        console.log('📸 Screenshot saved: secret-page.png');

        // Test 7: Test back button functionality
        console.log('⬅️ Testing back button...');
        const backButton = await page.waitForSelector('.back-btn');
        await backButton.click();
        
        await page.waitForNavigation({ waitUntil: 'networkidle2' });
        
        const returnUrl = page.url();
        if (returnUrl === BASE_URL + '/' || returnUrl === BASE_URL) {
            console.log('✅ Successfully returned to main page');
        } else {
            console.log('❌ Failed to return to main page');
        }

        // Test 8: Test Konami Code easter egg (if implemented)
        console.log('🎮 Testing Konami Code easter egg...');
        const konamiSequence = [
            'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
            'KeyB', 'KeyA'
        ];
        
        for (const key of konamiSequence) {
            await page.keyboard.press(key);
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        // Wait a moment to see if easter egg appears
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Take final screenshot
        await page.screenshot({ 
            path: path.join(SCREENSHOTS_DIR, 'konami-code.png'),
            fullPage: true 
        });
        console.log('📸 Screenshot saved: konami-code.png');

        console.log('🎉 All Puppeteer tests completed successfully!');
        console.log(`📁 Screenshots saved in: ${SCREENSHOTS_DIR}`);

    } catch (error) {
        console.error('❌ Error during Puppeteer tests:', error.message);
        throw error;
    } finally {
        if (browser) {
            await browser.close();
            console.log('🔐 Browser closed');
        }
    }
}

// Main execution
if (require.main === module) {
    runPuppeteerTests()
        .then(() => {
            console.log('✨ Puppeteer automation completed successfully!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Puppeteer automation failed:', error);
            process.exit(1);
        });
}

module.exports = { runPuppeteerTests };