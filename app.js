const EMOJIS = ['🍎','🍌','🍇','🍓','🍒','🥝','🍍','🍑'];

let deck = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let lockBoard = false;

const board = document.getElementById('board');
const movesEl = document.getElementById('moves');
const pairsEl = document.getElementById('pairs');
const winScreen = document.getElementById('win');
const finalMoves = document.getElementById('finalMoves');

function shuffle(arr) {
return arr.sort(() => Math.random() - 0.5);
}

function initGame() {
deck = shuffle([...EMOJIS, ...EMOJIS]);
flippedCards = [];
matchedPairs = 0;
moves = 0;
lockBoard = false;
movesEl.textContent = '0';
pairsEl.textContent = '0';
winScreen.classList.add('hidden');
board.innerHTML = '';

deck.forEach((emoji) => {
const card = document.createElement('div');
card.className = 'card';
card.dataset.emoji = emoji;
card.innerHTML = `
<div class="card-inner">
  <div class="card-face card-back">?</div>
  <div class="card-face card-front">${emoji}</div>
</div>`;
card.addEventListener('click', () => flipCard(card));
board.appendChild(card);
});
}

function flipCard(card) {
if (lockBoard) return;
if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

card.classList.add('flipped');
flippedCards.push(card);

if (flippedCards.length === 2) {
moves++;
movesEl.textContent = moves;
checkMatch();
}
}

function checkMatch() {
const [a, b] = flippedCards;
if (a.dataset.emoji === b.dataset.emoji) {
a.classList.add('matched');
b.classList.add('matched');
matchedPairs++;
pairsEl.textContent = matchedPairs;
flippedCards = [];
if (matchedPairs === EMOJIS.length) showWin();
} else {
lockBoard = true;
setTimeout(() => {
a.classList.remove('flipped');
b.classList.remove('flipped');
flippedCards = [];
lockBoard = false;
}, 800);
}
}

function showWin() {
finalMoves.textContent = moves;
winScreen.classList.remove('hidden');
}

document.getElementById('reset').addEventListener('click', initGame);
document.getElementById('playAgain').addEventListener('click', initGame);

initGame();

// Registrar Service Worker
if ('serviceWorker' in navigator) {
window.addEventListener('load', () => {
navigator.serviceWorker.register('sw.js')
.then(() => console.log('✅ SW registrado'))
.catch(err => console.log('❌ SW error:', err));
});
}