// Matrix Effect
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const lettersArray = letters.split('');

const fontSize = 18;
const columns = canvas.width / fontSize;
const drops = [];

for (let x = 0; x < columns; x++) {
  drops[x] = 1;
}

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#00ff00'; 
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

setInterval(drawMatrix, 33);

// Password Generation with Matrix Effect
function startPasswordGeneration() {
  document.getElementById('passwordOutput').textContent = "Passwort wird generiert...";
  document.querySelector("button").disabled = true;
  
  setTimeout(generatePassword, 3000); // Simulate delay for "hacker-like" effect
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

    // Display password one character at a time
    showPassword(password, i);
  }

  // Re-enable button after password generation
  setTimeout(() => {
    document.querySelector("button").disabled = false;
  }, 1300);
}

function showPassword(password, index) {
  setTimeout(() => {
    document.getElementById('passwordOutput').textContent = password;
  }, index * 100); // Delay the appearance of each character
}
