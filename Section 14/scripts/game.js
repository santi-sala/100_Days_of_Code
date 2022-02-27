function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Insert both player names first!!");
    return;
  }
  activePlayerNameElement.textContent = players[activePLayer].name;
  gameAreaElement.style.display = "block";
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
  console.log(gameData);
  switchPlayer();
}
