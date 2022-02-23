const userInput = document.querySelector("#input-text");
const remainingCharactersElement = document.querySelector(".count");

const maxCharacters = userInput.getAttribute("maxlength");

userInput.addEventListener("input", updateRemainingCharacters);

function updateRemainingCharacters(e) {
  const currentUserInput = e.target.value;
  const currentTextLenght = currentUserInput.length;

  const remainingCharacters = maxCharacters - currentTextLenght;

  if (remainingCharacters < 50) {
    // remainingCharactersElement.style.color = "red";
    // userInput.style.backgroundColor = "red";
    userInput.classList.add("k-pasa");
  } else {
    userInput.classList.remove("k-pasa");
  }
  remainingCharactersElement.textContent = remainingCharacters;
}
