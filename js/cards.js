// Definizione delle funzioni


// Funzione per la generazione dinamica delle cards
function create_card(card) {
    // Creazione elemento col
    let col = document.createElement('div');
    col.className = 'col-12 col-md-6 col-lg-4 my-4';

    // Contenuto card
    col.innerHTML = `
        <div class = 'card text-center h-100'>
            <img src='${card.img || 'https://via.placeholder.com/150'}' class='card-img-top' alt='card.img'>
            <div class='card-body'>
                <h5 class='card-title'>${card.title}</h5>
                <p class='card-text'>${card.text}</p>
            </div>
            <div class='card-body'>
                <button type='button' class='btn btn-primary btn-sm' onclick='onRead("${card.id}")'>Read</button>
                <button type='button' class='btn btn-warning btn-sm' onclick='onUpdate("${card.id}")'>Update</button>
                <button type='button' class='btn btn-danger btn-sm' onclick='onDelete("${card.id}")'>Delete</button>
            </div>
        </div>`;

    return col;
};

// Funzione per il rendering delle cards nel container
function render_cards(cards) {
    let container = document.getElementById('dashboard_cards');
    container.innerHTML = '';
    cards.forEach(card => {
        let card_element = create_card(card);
        container.appendChild(card_element);
    });
};


// Funzioni Crud (Create, Read, Update, Delete)

function onCreate(id) {
    const newId = cards_data.length + 1;
    cards_data.push({
        id: newId,
        title: `New Card ${newId}`,
        text: 'Testo nuova card'
    });
    render_cards(cards_data);
};


// Funzione di lettura di una card

function onRead(id) {
    const card = cards_data.find(c => c.id === Number(id));
    document.getElementById('modalTitle').innerText = card.title;
    document.getElementById('modalText').innerText = card.text;

    // Mostra modal
    const myModal = new bootstrap.Modal(document.getElementById('cardModal'));
    myModal.show();
};

// Funzione di aggiornamento di una card

function onUpdate(id) {
    const card = cards_data.find(c => c.id === Number(id));

    document.getElementById('modalTitle').innerText = "Modifica Card";
    document.getElementById('modalText').innerText = "";

    document.getElementById('updateForm').classList.remove('d-none');
    document.getElementById('modalSave').classList.remove('d-none');

    document.getElementById('updateTitle').value = card.title;
    document.getElementById('updateText').value = card.text;

    const myModal = new bootstrap.Modal(document.getElementById('cardModal'));
    myModal.show();

    document.getElementById('modalSave').onclick = function () {
        card.title = document.getElementById('updateTitle').value;
        card.text = document.getElementById('updateText').value;

        render_cards(cards_data);
        myModal.hide();

        // reset
        document.getElementById('updateForm').classList.add('d-none');
        document.getElementById('modalSave').classList.add('d-none');
    };
};

// Funzione di cancellazione di una card
function onDelete(id) {
    cards_data = cards_data.filter(c => c.id !== Number(id));
    render_cards(cards_data);
};


// Array contenuto cards

let cards_data = [

        {
        id: 1,
        title: 'Roberto Ledda',
        text: 'This is the text for card 1. ticketing problem explanation for the problem.',
    },


];

// Chiamata alla funzione di rendering delle cards
render_cards(cards_data);



// Recuperati i elementi dal DOM

let button_create = document.getElementById('btn_create');




// Evento al bottone che crea una nuova carta

button_create.addEventListener('click', function() {
    onCreate();
});

// Definizione degli eventi sui bottoni (Add)

button_register.addEventListener('click', function() {

    

});

















































