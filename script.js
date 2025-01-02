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


// Set the curent card index to 0
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

// Event listeners 

// Go to next page 
nextBtn.addEventListener('click', () => {

    // move the current card to left 
    cardsEl[currentActiveCard].className = 'card left';

    // augment the current index 
    currentActiveCard ++;

    // when arrive to the last page, the next button shall keep us stay in the last page
    if (currentActiveCard > cardsEl.length - 1) {
        currentActiveCard = cardsEl.length - 1;
    }

    // display the current card with it's updated index to the DOM
    cardsEl[currentActiveCard].className = 'card active';
    
    // update the current page number
    updateCurrentPage();
}); 


// Go to prev page 
prevBtn.addEventListener('click', () => {

    // faire disparaitre the current card
    cardsEl[currentActiveCard].className = 'card'; 

    // diminuer the index 
    currentActiveCard --;
    
    // when arrive to the first page, the prev button shall keep us stay in the first page
    if (currentActiveCard < 0) {
        currentActiveCard = 0;
    }

    // display the current card with it's updated index to the DOM
    cardsEl[currentActiveCard].className = 'card active';

    // update the current page number
    updateCurrentPage();
}); 