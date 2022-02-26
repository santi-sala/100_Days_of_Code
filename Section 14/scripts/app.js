const playerConfigOverlayElement = document.getElementById("config-overlay");
const brackdropElement = document.getElementById("backdrop");
const formElement = document.querySelector("form");

const editPlayer1BtnElement = document.getElementById("edit-player-1-btn");
const editPLayer2BtnElement = document.getElementById("edit-player-2-btn");
const cancelConfigBtnElement = document.getElementById("cancel-config-btn");

editPlayer1BtnElement.addEventListener("click", openPLayerConfig);
editPLayer2BtnElement.addEventListener("click", openPLayerConfig);

cancelConfigBtnElement.addEventListener("click", closePlayerConfig);
brackdropElement.addEventListener("click", closePlayerConfig);

formElement.addEventListener("submit", savePlayerConfig);
