'use strict';

// Function to set up inital variables
function initialSetUp() {
  curScoreP1E = document.getElementById('current--1');
  curScoreP2E = document.getElementById('current--2');

  totalScoreP1E = document.getElementById('score--1');
  totalScoreP2E = document.getElementById('score--2');

  player1S = document.querySelector('.player--1');
  player2S = document.querySelector('.player--2');

  document.getElementById('score--1').textContent = 0;
  document.getElementById('score--2').textContent = 0;

  diceE = document.querySelector('.dice')

  score1BV = 0;
  score2BV = 0;

  rollE = document.querySelector('.btn--roll');
  holdE = document.querySelector('.btn--hold')
}

// Function to toggle between active player
function toggle() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  curScoreBV = 0;
  if (activePlayer === 1) {
    activePlayer = 2;
  } else {
    activePlayer = 1;
  }
  player1S.classList.toggle('player--active');
  player2S.classList.toggle('player--active');
}

// Function to set button visibility
function buttonVisibility(isGameOver = true) {
  if (isGameOver) {
    rollE.hidden = true;
    holdE.hidden = true;
  } else {
    rollE.hidden = false;
    holdE.hidden = false;
  }
}

// Function: To execute on NewGame button press
function newGame() {
  curScoreBV = 0;
  score1BV = 0;
  score2BV = 0;
  curScoreP1E.textContent = 0;
  curScoreP2E.textContent = 0;
  totalScoreP1E.textContent = 0;
  totalScoreP2E.textContent = 0;
  player1S.classList.remove('player--winner');
  player2S.classList.remove('player--winner');
  player1S.classList.add('player--active');
  activePlayer = 1;
  player2S.classList.remove('player--active');
  buttonVisibility(false);
}

// Function: To execute on Hold button press
function hold() {
  if (activePlayer == 1) {
    score1BV += curScoreBV;
    totalScoreP1E.textContent = score1BV;
  } else {
    score2BV += curScoreBV;
    totalScoreP2E.textContent = score2BV;
  }

  if (score1BV >= 10) {
    player1S.classList.add('player--winner');
    buttonVisibility();
  }

  if (score2BV >= 10) {
    player2S.classList.add('player--winner');
    buttonVisibility(true);
  }

  toggle();
}

// Function: To execute on Roll button press
function roll() {
  dice = Math.trunc(Math.random() * 6) + 1;
  diceE.src = `dice-${dice}.png`;

  if (dice == 1) {
    toggle();
  } else {
    curScoreBV += dice;
    if (activePlayer == 1) {
      curScoreP1E.textContent = curScoreBV;
    } else {
      curScoreP2E.textContent = curScoreBV;
    }
  }
}

//-----------------------------------

// Execution starts from here
var curScoreP1E, curScoreP2E, totalScoreP1E, totalScoreP2E, player1S, player2S, dice, activePlayer = 1, score1BV, score2BV, curScoreBV = 0, diceE, rollE, holdE;

// Function to set up initial values of all the variables
initialSetUp();

// OnClick operation on Roll button press
document.querySelector('.btn--roll').addEventListener('click', roll);

// OnClick operation on Hold button press
document.querySelector('.btn--hold').addEventListener('click', hold);

// OnClick operation on NewGame button press
document.querySelector('.btn--new').addEventListener('click', newGame);
