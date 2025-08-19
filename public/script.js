// Speakeasy JavaScript functionality

// Constants for timing and configuration
const TIMING = {
    TITLE_ANIMATION_DELAY: 500,
    SECTION_ANIMATION_DELAY: 800,
    SECTION_ANIMATION_STAGGER: 200,
    PASSWORD_SUCCESS_DELAY: 1500,
    PASSWORD_ERROR_CLEAR_DELAY: 3000,
    SECRET_MESSAGE_DISPLAY_TIME: 4000,
    SECRET_MESSAGE_FADE_TIME: 1000
};

// Password configuration
const SECRET_PASSWORD = "bee's knees";
const ALTERNATIVE_PASSWORDS = ["bees knees", "beesknees", "bootlegger", "giggle water"];

// Konami code configuration
const KONAMI_SEQUENCE = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

// Application state
const AppState = {
    konamiCode: [],
    secretMessageVisible: false
};

function checkPassword(event) {
    if (event) {
        event.preventDefault(); // Prevent form submission
    }
    
    const input = document.getElementById('passwordInput');
    const message = document.getElementById('message');
    
    // Error handling for missing elements
    if (!input || !message) {
        console.error('Required DOM elements not found');
        return false;
    }
    
    const password = input.value.toLowerCase().trim();
    
    // Input validation
    if (!password) {
        displayMessage(message, "Please enter a password.", "error");
        return false;
    }
    
    if (password === SECRET_PASSWORD || ALTERNATIVE_PASSWORDS.includes(password)) {
        displayMessage(message, "Welcome to the inner circle! Redirecting...", "success");
        
        // Add a slight delay for effect
        setTimeout(() => {
            window.location.href = '/secret';
        }, TIMING.PASSWORD_SUCCESS_DELAY);
    } else {
        displayMessage(message, "Sorry, pal. That ain't the right password. Try again!", "error");
        
        // Clear the message after delay
        setTimeout(() => {
            clearMessage(message);
        }, TIMING.PASSWORD_ERROR_CLEAR_DELAY);
        
        // Clear the input
        input.value = "";
        input.focus();
    }
    
    return false; // Prevent form submission
}

function displayMessage(messageElement, text, type) {
    messageElement.textContent = text;
    messageElement.className = `message ${type}`;
}

function clearMessage(messageElement) {
    messageElement.className = "message";
    messageElement.textContent = "";
}

function goBack() {
    window.location.href = '/';
}

function showSecretMessage() {
    // Prevent multiple simultaneous secret messages
    if (AppState.secretMessageVisible) {
        return;
    }
    
    AppState.secretMessageVisible = true;
    
    const message = document.createElement('div');
    message.className = 'secret-message-modal';
    message.innerHTML = '🥃<br>You found the secret!<br>The password is "bee\'s knees"<br>🥃';
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(message)) {
                document.body.removeChild(message);
            }
            AppState.secretMessageVisible = false;
        }, TIMING.SECRET_MESSAGE_FADE_TIME);
    }, TIMING.SECRET_MESSAGE_DISPLAY_TIME);
}

function handleKonamiCode(event) {
    AppState.konamiCode.push(event.code);
    
    if (AppState.konamiCode.length > KONAMI_SEQUENCE.length) {
        AppState.konamiCode.shift();
    }
    
    if (JSON.stringify(AppState.konamiCode) === JSON.stringify(KONAMI_SEQUENCE)) {
        showSecretMessage();
        AppState.konamiCode = [];
    }
}

function setupAnimations() {
    // Add subtle animation to title
    const title = document.querySelector('.title');
    if (title) {
        title.style.opacity = '0';
        title.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            title.style.transition = 'all 1s ease';
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, TIMING.TITLE_ANIMATION_DELAY);
    }
    
    // Add staggered animation to main content sections
    const sections = document.querySelectorAll('.welcome-section, .password-section, .atmosphere-section, .secret-content');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.8s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, TIMING.SECTION_ANIMATION_DELAY + (index * TIMING.SECTION_ANIMATION_STAGGER));
    });
}

function setupPasswordInput() {
    const passwordInput = document.getElementById('passwordInput');
    if (passwordInput) {
        // Remove the keypress listener since we're now using form submission
        // Focus on the password input when the page loads
        passwordInput.focus();
    }
}

// Consolidated DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', function() {
    setupPasswordInput();
    setupAnimations();
});

// Konami code listener
document.addEventListener('keydown', handleKonamiCode);