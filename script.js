// script.js

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
const wordList = ['zufälliges', 'Wort', 'Passwort', 'sicher', 'stark', 'generiert']; // Beispiel-Wörterliste

const passwordLengthInput = document.getElementById('passwordLength');
const passwordOutput = document.getElementById('passwordOutput');
const strengthBar = document.querySelector('.strength-bar');

function generateRandomString(length) {
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function generatePasswordPhrase() {
  const phraseLength = Math.floor(Math.random() * 4) + 3; // 3-6 Wörter
  let phrase = '';
  for (let i = 0; i < phraseLength; i++) {
    phrase += ' ' + wordList[Math.floor(Math.random() * wordList.length)];
  }
  return phrase.trim();
}

function generatePassword() {
  const length = passwordLengthInput.value;
  const usePhrase = document.getElementById('usePhrase').checked;

  let password;
  if (usePhrase) {
    password = generatePasswordPhrase();
  } else {
    password = generateRandomString(length);
  }

  passwordOutput.textContent = password;

  // Passwortstärke berechnen
  const strength = checkPasswordStrength(password);
  strengthBar.style.width = `${strength}%`;
}

function checkPasswordStrength(password) {
  // Einfache Stärkeberechnung, kann verbessert werden
  const length = password.length;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^\w\s]/i.test(password);

  let strength = 0;
  strength += length * 4;
  strength += hasUpper ? 2 : 0;
  strength += hasLower ? 2 : 0;
  strength += hasNumber ? 2 : 0;
  strength += hasSpecial ? 2 : 0;

  return Math.min(strength, 100);
}

// ... (Restlicher Code für Themes, Benutzerdefinierte Zeichensätze, etc.)

// Event-Listener
document.getElementById('generateButton').addEventListener('click', generatePassword);
