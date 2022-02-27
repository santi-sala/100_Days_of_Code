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
  e.target.textContent = players[activePLayer].symbol;
  e.target.classList.add("disabled");
  switchPlayer();
}
