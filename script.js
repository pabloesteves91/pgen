// Matrix Effect
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const lettersArray = letters.split('');

const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = [];

for (let x = 0; x < columns; x++) {
  drops[x] = 1;
}

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#0F0'; 
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = lettersArray[Math.floor(Math.random() * lettersArray.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(drawMatrix, 30);

// Password Generator Logic with Matrix Effect
function startPasswordGeneration() {
  document.getElementById('passwordOutput').textContent = "Passwort wird generiert...";
  
  setTimeout(generatePassword, 2000); // Simulate a "hacker-like" delay
}

function generatePassword() {
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  let characters = "";
  let password = "";
  const useLetters = document.getElementById('useLetters').checked;
  const useNumbers = document.getElementById('useNumbers').checked;

  if (useLetters) characters += letters;
  if (useNumbers) characters += numbers;

  if (characters === "") {
    document.getElementById('passwordOutput').textContent = "Keine Option ausgewählt!";
    return;
  }

  for (let i = 0; i < 12; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));

    // Show password character by character like in a hacker movie
    showPassword(password);
  }
}

function showPassword(password) {
  setTimeout(() => {
    document.getElementById('passwordOutput').textContent = password;
  }, 1000); // Show each letter with a slight delay
}
