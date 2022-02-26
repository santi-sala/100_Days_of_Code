function openPLayerConfig(e) {
  editedPlayer = +e.target.dataset.playerid; // +"1" => 1(integer)
  //   console.log(editedPlayer);
  playerConfigOverlayElement.style.display = "block";
  brackdropElement.style.display = "block";
}

function closePlayerConfig() {
  playerConfigOverlayElement.style.display = "none";
  brackdropElement.style.display = "none";
  formElement.firstElementChild.classList.remove("error");
  errorsOutputElement.textContent = "";
  //   formElement.firstElementChild.lastElementChild.value = "";
  playerNameInput.value = "";
}

function savePlayerConfig(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const enteredPLayerName = formData.get("playername").trim();
  //   console.log(enteredPLayerName);

  if (!enteredPLayerName) {
    e.target.firstElementChild.classList.add("error");
    errorsOutputElement.textContent = "Please enter a valid name";
    return;
  }

  const updatedPlayerDataElement = document.getElementById(
    "player-" + editedPlayer + "-data"
  );
  updatedPlayerDataElement.children[1].textContent = enteredPLayerName;
  players[editedPlayer - 1].name = enteredPLayerName;
  closePlayerConfig();
}
