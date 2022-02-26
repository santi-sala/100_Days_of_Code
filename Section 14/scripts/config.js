function openPLayerConfig() {
  playerConfigOverlayElement.style.display = "block";
  brackdropElement.style.display = "block";
}

function closePlayerConfig() {
  playerConfigOverlayElement.style.display = "none";
  brackdropElement.style.display = "none";
}

function savePlayerConfig(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const enteredPLayerName = formData.get("playername");
  console.log(enteredPLayerName);
}
