let hackerSound = document.getElementById('hackerSound');
let errorSound = document.getElementById('errorSound');
let successSound = document.getElementById('successSound');

document.addEventListener("DOMContentLoaded", function() {
  loadStartupScreen();
  drawMatrixEffect();
});

// Funktion für den Ladebildschirm mit Fortschrittsleiste und Sound
function loadStartupScreen() {
  let progress = document.getElementById('progress');
  let width = 0;
  let loadingText = document.getElementById('loadingText');
  hackerSound.play();  // Spielt den Hacker-Sound ab, sobald das Laden beginnt
  let interval = setInterval(function() {
    if (width >= 100) {
      clearInterval(interval);  // Stoppt den Ladebildschirm, wenn er 100% erreicht
      showMainContent();  // Zeigt den Hauptinhalt an
      loadingText.textContent = '';  // Entfernt den Text nach Abschluss des Ladebildschirms
    } else {
      width++;
      progress.style.width = width + '%';  // Fortschrittsleiste füllt sich
      if (width < 50) {
        loadingText.textContent = 'System booting...';
      } else if (width < 80) {
        loadingText.textContent = 'Loading modules...';
      } else {
        loadingText.textContent = 'Finalizing...';  // Zeigt "Finalizing" an, bevor die Seite geladen ist
      }
    }
  }, 50);  // Geschwindigkeit der Fortschrittsanzeige
}

// Matrix-Effekt über den gesamten Bildschirm
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
    drops[x] = 1;  // Starten der Drops an der Spitze
  }

  function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);  // Leichte Verdunkelung für den Matrix-Effekt

    ctx.fillStyle = '#00FF00';  // Matrix-Grün
    ctx.font = fontSize + 'px monospace';

    // Zeichnet die fallenden Zeichen
    for (let i = 0; i < drops.length; i++) {
      const text = lettersArray[Math.floor(Math.random() * lettersArray.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;  // Neustart des Zeichens am oberen Rand
      }

      drops[i]++;
    }
  }

  setInterval(drawMatrix, 50);  // Geschwindigkeit der Matrix-Animation
}

// Funktion zum Anzeigen des Hauptinhalts nach dem Ladebildschirm
function showMainContent() {
  document.getElementById('startupScreen').classList.add('hidden');
  document.getElementById('mainContent').classList.remove('hidden');
}

// Funktion zum Behandeln der Benutzereingaben im Hauptmenü
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
      errorSound.play();  // Spielt einen Fehler-Sound, wenn die Eingabe ungültig ist
      alert('Ungültige Auswahl!');
    }
  }
}

// Zeigt die Passwortgenerierungsoptionen an
function showPasswordOptions() {
  document.getElementById('passwordOptions').classList.remove('hidden');
  document.getElementById('passwordCheck').classList.add('hidden');
}

// Zeigt die Passwort-Sicherheitsprüfung an
function showPasswordCheck() {
  document.getElementById('passwordCheck').classList.remove('hidden');
  document.getElementById('passwordOptions').classList.add('hidden');
}

// Generiert ein Passwort basierend auf der ausgewählten Länge
function startPasswordGeneration() {
  let length = document.getElementById('passwordLength').value;
  let password = generatePassword(length);
  hackerSound.play();  // Spielt den Hacker-Sound während der Passwortgenerierung
  document.getElementById('passwordOutput').textContent = `Generiertes Passwort: ${password}`;
  document.getElementById('copyButton').classList.remove('hidden');  // Zeigt den Kopierbutton an
}

// Generiert zufälliges Passwort
function generatePassword(length) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

// Prüft die Sicherheit eines eingegebenen Passworts
function checkPassword() {
  const password = document.getElementById('checkPassword').value;
  let securityLevel = calculateSecurity(password);
  displaySecurity(securityLevel, password);
}

// Bestimmt die Sicherheit eines Passworts basierend auf der Länge
function calculateSecurity(password) {
  if (password.length < 8) return 'red';
  if (password.length >= 8 && password.length <= 12) return 'yellow';
  if (password.length > 12) return 'green';
}

// Zeigt die Sicherheitsbewertung und alternative Vorschläge an
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

// Generiert ein ähnliches Passwort, falls das eingegebene Passwort unsicher ist
function generateSimilarPassword(original) {
  let newPassword = original.split('').map(char => {
    return Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
  }).join('');
  return newPassword;
}

// Kopiert das generierte Passwort in die Zwischenablage
function copyPassword() {
  let password = document.getElementById('passwordOutput').textContent.split(': ')[1];
  navigator.clipboard.writeText(password).then(() => {
    alert('Passwort erfolgreich kopiert!');
  });
}
