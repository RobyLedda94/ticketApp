// ==========================
// FUNZIONI UTILI
// ==========================

function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

function validatePassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  return regex.test(password);
}

// ==========================
// ELEMENTI DAL DOM
// ==========================

const form = document.querySelector('form');

const userAlias = document.getElementById("user_alias");
const userType = document.getElementById("user_type");
const userName = document.getElementById("user_name");
const userLastName = document.getElementById("user_lastName");
const userPassword = document.getElementById("user_password");

// Messaggi errore
const msgAlias = document.getElementById("msg_error_alias");
const msgUserType = document.getElementById("msg_error_UserType");
const msgName = document.getElementById("msg_error_name");
const msgLastName = document.getElementById("msg_error_lastName");
const msgPassword = document.getElementById("msg_error_password");

// ==========================
// EVENTO SUBMIT
// ==========================

form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Reset messaggi
  msgAlias.querySelector('span').textContent = "";
  msgUserType.querySelector('span').textContent = "";
  msgName.querySelector('span').textContent = "";
  msgLastName.querySelector('span').textContent = "";
  msgPassword.querySelector('span').textContent = "";

  // Valori input
  const aliasValue = userAlias.value.trim();
  const typeValue = userType.value;
  const nameValue = userName.value.trim();
  const lastNameValue = userLastName.value.trim();
  const passwordValue = userPassword.value;

  let isValid = true;

  // Controlli base
  if (aliasValue === "") {
    msgAlias.querySelector('span').textContent = "Inserisci alias";
    isValid = false;
  }

  if (typeValue === "" || typeValue === "Premi per visualizzare le opzioni") {
    msgUserType.querySelector('span').textContent = "Seleziona una tipologia utente";
    isValid = false;
  }

  if (nameValue === "") {
    msgName.querySelector('span').textContent = "Inserisci nome";
    isValid = false;
  }

  if (lastNameValue === "") {
    msgLastName.querySelector('span').textContent = "Inserisci cognome";
    isValid = false;
  }

  if (!validatePassword(passwordValue)) {
    msgPassword.querySelector('span').textContent = "Password: min 8 caratteri, una maiuscola, una minuscola, un numero e un carattere speciale";
    isValid = false;
  }

  if (!isValid) return;

  // Controllo alias unico
  const users = getUsers();
  const exists = users.some(u => u.username === aliasValue);

  if (exists) {
    msgAlias.querySelector('span').textContent = "Alias già esistente";
    return;
  }

  // Salvataggio utente
  const newUser = {
    id: Date.now(),
    username: aliasValue,
    password: passwordValue,
    type: typeValue,
    name: nameValue,
    lastName: lastNameValue
  };

  users.push(newUser);
  saveUsers(users);

  // Redirect a login
  window.location.href = 'login.html';
});

