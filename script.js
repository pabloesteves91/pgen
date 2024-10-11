// script.js
const generateButton = document.getElementById('generate');
const passwordDisplay = document.getElementById('password');
const lengthInput = document.getElementById('length');
const includeSymbols = document.getElementById('include-symbols');
const themeSelect = document.getElementById('theme');

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const symbols = '!@#$%^&*()_-+=[]{}|;:,.<>/?';

function generatePassword() {
    const length = parseInt(lengthInput.value);
    let charset = characters;
    if (includeSymbols.checked) {
        charset += symbols;
    }
    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    passwordDisplay.textContent = password;
}

function setTheme(theme) {
    document.body.className = theme;
}

themeSelect.addEventListener('change', () => {
    setTheme(themeSelect.value);
});

generateButton.addEventListener('click', generatePassword);

// Initial theme
setTheme('light');
