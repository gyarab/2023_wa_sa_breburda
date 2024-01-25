
const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const secondFaceImages = ['Bocchi2.jpg', 'Bocchi3.png', 'Bocchi4.jpg', 'Bocchi5.jpg', 'Bocchi6.jpg', 'Bocchi7.jpg'];

const shuffledSecondFaceImages = [...secondFaceImages, ...secondFaceImages];
shuffleArray(shuffledSecondFaceImages);

cards.forEach((card, index) => {
    const imgElement = card.querySelector('img');
    card.setAttribute('data-first-face', './imgs/Bocchi1.jpg');
    card.setAttribute('data-second-face', `./imgs/${shuffledSecondFaceImages[index]}`);
    imgElement.src = card.getAttribute('data-first-face');
});

function clickCard(index) {
    if (lockBoard) return;
    const currentCard = cards[index];

    currentCard.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = currentCard;
        firstCard.querySelector('img').src = firstCard.getAttribute('data-second-face');
    } else {
        hasFlippedCard = false;
        secondCard = currentCard;
        secondCard.querySelector('img').src = secondCard.getAttribute('data-second-face');

        lockBoard = true;

        setTimeout(checkForMatch, 500);
    }
}

function checkForMatch() {
    const isFirstMatch = firstCard.getAttribute('data-second-face') === secondCard.getAttribute('data-second-face');

    if (isFirstMatch) {
        disableCards();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            firstCard.querySelector('img').src = firstCard.getAttribute('data-first-face');
            secondCard.querySelector('img').src = secondCard.getAttribute('data-first-face');
            resetBoard();
        }, 1000);
    }
}

function disableCards() {
    firstCard.removeEventListener('click', clickCard);
    secondCard.removeEventListener('click', clickCard);
    firstCard.style.visibility = 'hidden';
    secondCard.style.visibility = 'hidden';
    resetBoard();
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];

    cards.forEach(card => {
        card.addEventListener('click', () => clickCard(Array.from(cards).indexOf(card)));
    });

    cards.forEach(card => card.classList.remove('flip'));
}

cards.forEach((card, index) => card.addEventListener('click', () => clickCard(index)));
