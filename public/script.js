// Speakeasy JavaScript functionality

// Password for the secret room (keeping it simple for demo)
const SECRET_PASSWORD = "bee's knees";
const ALTERNATIVE_PASSWORDS = ["bees knees", "beesknees", "bootlegger", "giggle water"];

function checkPassword() {
    const input = document.getElementById('passwordInput');
    const message = document.getElementById('message');
    const password = input.value.toLowerCase().trim();
    
    if (password === SECRET_PASSWORD || ALTERNATIVE_PASSWORDS.includes(password)) {
        message.textContent = "Welcome to the inner circle! Redirecting...";
        message.className = "message success";
        
        // Add a slight delay for effect
        setTimeout(() => {
            window.location.href = '/secret';
        }, 1500);
    } else {
        message.textContent = "Sorry, pal. That ain't the right password. Try again!";
        message.className = "message error";
        
        // Clear the message after 3 seconds
        setTimeout(() => {
            message.className = "message";
            message.textContent = "";
        }, 3000);
        
        // Clear the input
        input.value = "";
        input.focus();
    }
}

function goBack() {
    window.location.href = '/';
}

// Allow Enter key to submit password
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('passwordInput');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
        
        // Focus on the password input when the page loads
        passwordInput.focus();
    }
});

// Add some atmospheric effects
document.addEventListener('DOMContentLoaded', function() {
    // Add subtle animation to title
    const title = document.querySelector('.title');
    if (title) {
        title.style.opacity = '0';
        title.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            title.style.transition = 'all 1s ease';
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, 500);
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
        }, 800 + (index * 200));
    });
});

// Add some secret Easter eggs
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        showSecretMessage();
        konamiCode = [];
    }
});

function showSecretMessage() {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(212, 175, 55, 0.95);
        color: #2d1b1b;
        padding: 30px;
        border-radius: 15px;
        font-family: 'Dancing Script', cursive;
        font-size: 24px;
        font-weight: 700;
        text-align: center;
        z-index: 1000;
        box-shadow: 0 0 30px rgba(212, 175, 55, 0.8);
        border: 3px solid #2d1b1b;
    `;
    message.innerHTML = '🥃<br>You found the secret!<br>The password is "bee\'s knees"<br>🥃';
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.transition = 'opacity 1s ease';
        message.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(message);
        }, 1000);
    }, 4000);
}