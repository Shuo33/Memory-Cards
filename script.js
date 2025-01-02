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
// const cardsData = [
//     {
//         question: 'What must a variable begin with ?',
//         answer: 'A letter, $ or _'
//     },
//     {
//         question: 'What is a variable ?',
//         answer: 'Container for a piece of data'
//     },
//     {
//         question: 'Example of Case Sensitive Variable',
//         answer: 'thisIsAVariable'
//     }
// ];

const cardsData = getCardsData();


// Create all cards - replace forEach() with map()
function createCards() {
    cardsData.forEach((data, index) => createCard(data, index));
}

// Create a single card in DOM
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


// Show page number of cards
function updateCurrentPage() {
    currentPageEl.innerText = `
    ${currentActiveCard + 1}/${cardsEl.length}
    `;
}


// Get the cards data from localStorage
function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards; 
}

// Add card to local storage
function setCardsData(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));  
    window.location.reload();
}

createCards();

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


// Show add container
showCardsBtn.addEventListener('click', () =>
    addCardContainer.classList.add('show')   
);

// Hide add container
hideCardsBtn.addEventListener('click', () => 
    addCardContainer.classList.remove('show')  
);


// Add new card
addCardBtn.addEventListener('click', () => {
    const question = questionEl.value;
    const answer = answerEl.value; 

    if (!question.trim() & !answer.trim()) {
        alert('please enter the question and answer here'); 
    } else {
        const newCard = { question, answer }; 
        
        questionEl.value = '';
        answerEl.value = '';

        addCardContainer.classList.remove('show');

        cardsData.push(newCard);

        setCardsData(cardsData);

        createCard(newCard);
    }
});




