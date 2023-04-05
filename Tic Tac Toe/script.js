"use strict";

const square1 = document.querySelector(".square__1");
const square2 = document.querySelector(".square__2");
const square3 = document.querySelector(".square__3");
const square4 = document.querySelector(".square__4");
const square5 = document.querySelector(".square__5");
const square6 = document.querySelector(".square__6");
const square7 = document.querySelector(".square__7");
const square8 = document.querySelector(".square__8");
const square9 = document.querySelector(".square__9");

const winCombos = [
  //horizontal combinations
  [square1, square2, square3],
  [square4, square5, square6],
  [square7, square8, square9],
  //    vertical combinations
  [square1, square4, square7],
  [square2, square5, square8],
  [square3, square6, square9],
  //diagonal combinations
  [square1, square5, square9],
  [square3, square5, square7],
];

const squares = [
  square1,
  square2,
  square3,
  square4,
  square5,
  square6,
  square7,
  square8,
  square9,
];

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const btnRestartEl = document.querySelector(".btn--restart");
const btnPlayAgainEl = document.querySelector(".btn--play-again");
const overlayEl = document.querySelector(".overlay");
const modalEl = document.querySelector(".modal");
const modalElTitle = document.querySelector(".modal__header");

let scores, playerActive, isEnding, winnerChecking;

const restartGame = function () {
  scores = [0, 0];
  for (let i = 0; i < 2; i++) {
    document.querySelector(`.score--${i}`).textContent = scores[i];
  }
  startGame();
};

restartGame();

function startGame() {
  winnerChecking = true;
  isEnding = false;
  playerActive = 0;
  player0El.classList.add("player--active");
  overlayEl.classList.add("hidden");
  modalEl.classList.add("hidden");
  for (let i = 1; i < 10; i++) {
    document.querySelector(`.square__${i}`).classList.remove("circle");
    document.querySelector(`.square__${i}`).classList.remove("cross");
  }
}

const endGame = function () {
  isEnding = true;
  overlayEl.classList.remove("hidden");
  modalEl.classList.remove("hidden");
  modalEl.classList.add("slide-in");
  document
    .querySelector(`.player--${playerActive}`)
    .classList.remove("player--active");
};

const changePlayer = function () {
  playerActive = playerActive === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

const ifWin = function () {
  endGame();
  modalElTitle.textContent = `Congratulations, Player ${
    playerActive == 0 ? "I" : "II"
  } wins!`;
  winnerChecking = true;
};

const ifDraw = function () {
  let count = 0;
  for (let i = 0; i < squares.length; i++) {
    if (
      squares[i].classList.contains("cross") ||
      squares[i].classList.contains("circle")
    ) {
      count += 1;
    }
    if (count === 9) {
      endGame();
      modalElTitle.textContent = `DRAW,NO WINNER`;
      winnerChecking = false;
    }
  }
};

const checkWinner = function () {
  for (const [firstSquare, secondSquare, thirdSquare] of winCombos) {
    if (
      firstSquare.classList.contains("cross") &&
      secondSquare.classList.contains("cross") &&
      thirdSquare.classList.contains("cross")
    ) {
      ifWin();
    } else if (
      firstSquare.classList.contains("circle") &&
      secondSquare.classList.contains("circle") &&
      thirdSquare.classList.contains("circle")
    ) {
      ifWin();
    } else {
      ifDraw();
    }
  }
};

const addScore = function () {
  if (!isEnding) {
    changePlayer();
  } else {
    if (winnerChecking) {
      scores[playerActive] += 1;
      document.querySelector(
        `.score--${playerActive}`
      ).textContent = `${scores[playerActive]}`;
    }
  }
};

const addSign = function () {
  if (
    !this.classList.contains("cross") &&
    !this.classList.contains("circle") &&
    !isEnding
  ) {
    if (playerActive === 0) {
      this.classList.add("cross");
    } else {
      this.classList.add("circle");
    }
    checkWinner();
    addScore();
  }
};

for (let i = 1; i < 10; i++) {
  document.querySelector(`.square__${i}`).addEventListener("click", addSign);
}

btnPlayAgainEl.addEventListener("click", startGame);

btnRestartEl.addEventListener("click", restartGame);
