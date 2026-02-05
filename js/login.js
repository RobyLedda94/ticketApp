// Mock utenti (poi verrà dal DB)
const users = [
  { id: 1, username: "roberto", password: "Maestrale94%$", role: "admin" },
  { id: 2, username: "user", password: "User@1234", role: "user" }
];

// Funzione validazione campi vuoti
function validate_input(input_user, input_password) {
  let isValid = true;

  // Svuoto preventivamente i messaggi di errore
  msg_error_username.textContent = '';
  msg_error_password.textContent = '';

  if (input_user === '') {
    msg_error_username.textContent = 'Inserire un valore valido nel campo username';
    isValid = false;
  }

  if (input_password === '') {
    msg_error_password.textContent = 'Inserire un valore valido nel campo password';
    isValid = false;
  }

  return isValid;
}

// Funzione caratteri ammessi password
function validate_password(input_password) {
  let isValid = true;

  msg_error_password.textContent = '';

  let regex_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!regex_password.test(input_password)) {
    msg_error_password.textContent =
      'La password deve contenere almeno una lettera maiuscola, una minuscola, un numero e un carattere speciale';
    isValid = false;
  }

  return isValid;
}

// Funzione login (autenticazione mock)
function authenticate(username, password) {
  return users.find(u => u.username === username && u.password === password) || null;
}

// Recuperati gli elementi dal DOM
let button_login = document.getElementById('btn_login');
let button_register = document.getElementById('btn_register');

let msg_error_username = document.getElementById('msg_error_username');
let msg_error_password = document.getElementById('msg_error_password');

// Eventi

button_login.addEventListener('click', function () {

  let input_user = document.getElementById('input_username').value;
  let input_password = document.getElementById('input_password').value;

  // validazione campi vuoti
  let isValid = validate_input(input_user, input_password);

  // validazione password
  if (isValid) {
    isValid = validate_password(input_password);
  }

  // Se non valido, stop
  if (!isValid) return;

  // Autenticazione
  const user = authenticate(input_user, input_password);

  if (!user) {
    msg_error_username.textContent = 'Username non valido';
    msg_error_password.textContent = 'Password non valida';
    return;
  }

  // Salvataggio sessione (mock)
  localStorage.setItem('user', JSON.stringify(user));

  // Redirect dashboard
  window.location.href = '../fe/index_dashboard.html';
});

// Bottone register -> redirect
button_register.addEventListener('click', function () {
  window.location.href = '../fe/index_register.html';
});
