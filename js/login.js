// Definizione delle funzioni

// Funzione validazione campi vuoti
function validate_input(input_user, input_password) {

    let isValid = true;

    // Svuoto il preventivamente il contenuto dei messaggi di errore 
    msg_error_username.textContent = '';
    msg_error_password.textContent = '';

    //   Istruzioni condizionali per la validazione dei campi di input
    if(input_user === ''){
        msg_error_username.textContent = 'Inserire un valore valido nel campo username';
        isValid = false;
    };

        if(input_password === ''){
        msg_error_password.textContent = 'Inserire un valore valido nel campo password';
        isValid = false;
    };

    return isValid;
}; 


// Funzione caratteri ammessi password

function validate_password(input_password) {

    let isValid = true;

    // Svuoto il preventivamente il contenuto del messaggio di errore 
    msg_error_password.textContent = '';

    // Definizione espressione regolare per validazione password
    let regex_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; 
    
    // Validazione campo password con utilizzo di caratteri ammessi
    if(!regex_password.test(input_password)){
        msg_error_password.textContent = 'La password deve contenere almeno una lettera maiuscola, una minuscola, un numero e un carattere speciale';
        isValid = false;
    };

    // Istruzione condizionale per la validazione della password
    if(input_password.length < 8){
        msg_error_password.textContent = 'La password deve contenere almeno 8 caratteri'
        isValid = false;
    };



    return isValid;
};



// Recuperati i bottoni dal DOM

let button_login = document.getElementById('btn_login');

let button_register = document.getElementById('btn_register');


let msg_error_username = document.getElementById('msg_error_username');

let msg_error_password = document.getElementById('msg_error_password');



// Definizione degli eventi sui bottoni (Login)

button_login.addEventListener('click', function() {

    // Recupero elemento input_user e valore in esso contenuto
    let input_user = document.getElementById('input_username').value;
    


    // Recupero elemento input_password e valore in esso contenuto
    let input_password = document.getElementById('input_password').value;


    // Chiamata alla funzione di validazione degli input campi vuoti
    let isValid = validate_input(input_user, input_password);

    // Chiamata alla funzione di validazione della password lunghezza e caratteri ammessi
    if(isValid){
        isValid = validate_password(input_password);
    };
  
});
