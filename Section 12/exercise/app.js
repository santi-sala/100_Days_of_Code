let userInput = document.querySelector("#input-text");
let remainingCharactersElement = document.querySelector(".count");

let maxCharacters = userInput.getAttribute("maxlength");

userInput.addEventListener("input", updateRemainingCharacters);

function updateRemainingCharacters(e) {
  let currentUserInput = e.target.value;
  let currentTextLenght = currentUserInput.length;

  let remainingCharacters = maxCharacters - currentTextLenght;
  remainingCharactersElement.textContent = remainingCharacters;
}
