let hackerSound = document.getElementById('hackerSound');
let errorSound = document.getElementById('errorSound');
let successSound = document.getElementById('successSound');

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
    document.getElementById('alternatives').textContent = `Alternativen: ${generatePassword(12)}, ${generatePassword(14)}`;
  } else {
    errorSound.play();
    document.getElementById('alternatives').textContent = '';
  }
}
