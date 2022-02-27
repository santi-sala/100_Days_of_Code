function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Insert both player names first!!");
    return;
  }
  activePlayerNameElement.textContent = players[activePLayer].name;
  gameAreaElement.style.display = "block";
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

function selectGameField(e) {
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

  currentRound++;
  switchPlayer();
}
