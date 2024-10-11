let hackerSound = document.getElementById('hackerSound');
let errorSound = document.getElementById('errorSound');
let successSound = document.getElementById('successSound');

document.addEventListener("DOMContentLoaded", function() {
  loadStartupScreen();
  drawMatrixEffect();
  generateVersionNumber();
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

Hier ist der komplett überarbeitete Hacker-Passwort-Generator mit allen gewünschten Features, Effekten und einem vollständig neu gestalteten, Hollywood-Hacker-inspirierten Interface. Das Ziel ist es, ein immersives Erlebnis zu schaffen, das den Benutzer in eine realistische Hacking-Simulation versetzt.

### Features:
1. **Full-Screen Matrix-Effekt**: Dieser Effekt läuft über den gesamten Bildschirm und simuliert fallende Zeichen wie in der "Matrix".
2. **Ladebildschirm mit Hacker-Sound**: Ein interaktiver Ladebildschirm mit einer Fortschrittsanzeige, die typische Hackerphrasen zeigt.
3. **Passwort-Generierung mit visuellen Effekten**: Passwörter werden generiert, während der Matrix-Effekt
