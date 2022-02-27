function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Insert both player names first!!");
    return;
  }

  resetGameStatus();

  activePlayerNameElement.textContent = players[activePLayer].name;
  gameAreaElement.style.display = "block";
}

function selectGameField(e) {
  if (gameIsOver) {
    return;
  }

  const selectedRow = e.target.dataset.row - 1;
  const selectedColumn = e.target.dataset.col - 1;

  if (gameData[selectedRow][selectedColumn] > 0) {
    alert("PLease select an empty field!!");
    return;
  }

  e.target.textContent = players[activePLayer].symbol;
  e.target.classList.add("disabled");

  gameData[selectedRow][selectedColumn] = activePLayer + 1;
  // console.log(gameData);

  const winnerId = checkForGameOver();
  // console.log(winnerId);

  if (winnerId !== 0) {
    endGame(winnerId);
  }
  currentRound++;
  switchPlayer();
}

function checkForGameOver() {
  // Checking for row equality
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }
  // Checking for column equality
  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[0][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }
  // Checking for diagonal top left bottom right
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }
  // Checking for diagonal bottom left top right
  if (
    gameData[2][0] > 0 &&
    gameData[2][0] === gameData[1][1] &&
    gameData[1][1] === gameData[0][2]
  ) {
    return gameData[2][0];
  }
  if (currentRound === 9) {
    return -1;
  }
  return 0;
}

function switchPlayer() {
  if (activePLayer === 0) {
    activePLayer = 1;
  } else {
    activePLayer = 0;
  }
  activePlayerNameElement.textContent = players[activePLayer].name;
}

function endGame(winner) {
  gameIsOver = true;
  gameOverElement.style.display = "block";

  console.log("Winner id is: " + winner);
  if (winner > 0) {
    let theWinner = players[winner - 1].name;
    gameOverElement.firstElementChild.firstElementChild.textContent = theWinner;
  } else {
    gameOverElement.firstElementChild.textContent = "It's a draw!";
  }
}

function resetGameStatus() {
  activePLayer = 0;
  currentRound = 1;
  gameIsOver = false;
  gameOverElement.firstElementChild.innerHTML =
    'The winner is: <span id="winner-name">PLAYER NAME</span>';
  gameOverElement.style.display = "none";

  let gameBoardIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
      gameFieldElements[gameBoardIndex].textContent = "";
      gameFieldElements[gameBoardIndex].classList.remove("disabled");
      gameBoardIndex++;
    }
  }
}
