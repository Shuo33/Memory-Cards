const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentPageEl = document.getElementById('current');
const showCardsBtn = document.getElementById('show');
const hideCardsBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addCardContainer = document.getElementById('add-container');


// Keep track of current card with it's page number
let currentActiveCard = 0; 

// Store DOM cards
const cardsEl = [];

// Store card data from localStorage
const cardsData = [
    {
        question: 'What must a variable begin with ?',
        answer: 'A letter, $ or _'
    },
    {
        question: 'What is a variable ?',
        answer: 'Container for a piece of data'
    },
    {
        question: 'Example of Case Sensitive Variable',
        answer: 'thisIsAVariable'
    }
];


// Create all cards
function createCards() {
    cardsData.map((data, index) => createCard(data, index));
}

// Create a single card
function createCard(data, index) {
    const card = document.createElement('div'); 
    card.classList.add('card'); 

    // show the first card to DOM 
    if (index === 0) {
        card.classList.add('active'); 
    }

    card.innerHTML = `
    <div class="inner-card">
     <div class="inner-card-front">
         <p>${data.question}</p>
     </div>
     <div class="inner-card-back">
         <p>${data.answer}</p>
     </div>
   </div>
    `

    // display card to the DOM
    cardsContainer.appendChild(card);

    // add cards to DOM cards
    cardsEl.push(card);

    // show answer 
    card.addEventListener('click', () =>
        card.classList.toggle('show-answer')
    );

    updateCurrentPage();
}

createCards();


// Show page number of cards
function updateCurrentPage() {
    currentPageEl.innerText = `
    ${currentActiveCard + 1}/${cardsEl.length}
    `;
}