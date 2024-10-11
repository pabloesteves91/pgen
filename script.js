let hackerSound = document.getElementById('hackerSound');
let errorSound = document.getElementById('errorSound');
let successSound = document.getElementById('successSound');

document.addEventListener("DOMContentLoaded", function() {
  loadStartupScreen();
  drawMatrixEffect();
});

// Ladebildschirm mit Fortschrittsanzeige und Hacker-Sound
function loadStartupScreen() {
  let progress = document.getElementById('progress');
  let width = 0;
  let loadingText = document.getElementById('loadingText');
  hackerSound.play(); // Hacker-Sound beim Laden abspielen
  let interval = setInterval(function() {
    if (width >= 100) {
      clearInterval(interval);
      showMainContent();
      loadingText.textContent = ''; // Entfernt "Finalizing..." nach dem Laden
    } else {
      width++;
      progress.style.width = width + '%';
      if (width < 50) {
        loadingText.textContent = 'System booting...';
      } else if (width < 80) {
        loadingText.textContent = 'Loading modules...';
      } else {
        loadingText.textContent = 'Finalizing...';
      }
    }
  }, 50);
}

// Matrix-Effekt über die gesamte Seite
function drawMatrixEffect() {
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

    ctx.fillStyle = '#00FF00';
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

  setInterval(drawMatrix, 50);
}

function showMainContent() {
  document.getElementById('startupScreen').classList.add('hidden');
  document.getElementById('mainContent').classList.remove('hidden');
}

function handleInput(event) {
  if (event.key === 'Enter') {
    const choice = event.target.value;
    if (choice === '1') {
      showPasswordOptions();
    } else if (choice === '2') {
      showPasswordCheck();
    } else if (choice === '3') {
      alert('Beendet!');
    } else {
      errorSound.play();
      alert('Ungültige Auswahl!');
    }
  }
}

function showPasswordOptions() {
  document.getElementById('passwordOptions').classList.remove('hidden');
  document.getElementById('passwordCheck').classList.add('hidden');
}

function showPasswordCheck() {
  document.getElementById('passwordCheck').classList.remove('hidden');
  document.getElementById('passwordOptions').classList.add('hidden');
}

function startPasswordGeneration() {
  let length = document.getElementById('passwordLength').value;
  let password = generatePassword(length);
  hackerSound.play();
  document.getElementById('passwordOutput').textContent = `Generiertes Passwort: ${password}`;
  document.getElementById('copyButton').classList.remove('hidden'); // Kopierbutton anzeigen
}

function generatePassword(length) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

function checkPassword() {
  const password = document.getElementById('checkPassword').value;
  let securityLevel = calculateSecurity(password);
  displaySecurity(securityLevel, password);
}

function calculateSecurity(password) {
  if (password.length < 8) return 'red';
  if (password.length >= 8 && password.length <= 12) return 'yellow';
  if (password.length > 12) return 'green';
}

function displaySecurity(level, password) {
  let output = document.getElementById('passwordCheckOutput');
  output.textContent = `Passwort: ${password}`;
  output.className = level;

  if (level === 'green') {
    successSound.play();
    document.getElementById('alternatives').textContent = '';
  } else {
    errorSound.play();
    document.getElementById('alternatives').textContent = `Unsicheres Passwort. Vorschlag: ${generateSimilarPassword(password)}`;
  }
}

function generateSimilarPassword(original) {
  let newPassword = original.split('').map(char => {
    return Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
  }).join('');
  return newPassword;
}

function copyPassword() {
  let password = document.getElementById('passwordOutput').textContent.split(': ')[1];
  navigator.clipboard.writeText(password).then(() => {
    alert('Passwort erfolgreich kopiert!');
  });
}
