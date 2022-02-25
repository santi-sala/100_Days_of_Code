// CALCULATOR

const userNumberElement = document.getElementById("user-number");
const calculateSumElement = document.querySelector("#calculated-sum");
const calculateSumButton = calculateSumElement.previousElementSibling;

// console.log(calculateSumButton.textContent);

calculateSumButton.addEventListener("click", calculateSum);

function calculateSum() {
  //   console.dir(userNumberElement.value);
  let currentNumber = 0;
  for (i = 0; i <= userNumberElement.value; i++) {
    currentNumber += i;
    // console.log(currentNumber);
  }
  calculateSumElement.textContent = currentNumber;
  calculateSumElement.style.display = "block";
}

// HIGHLIGHT LINKS
const allAnchorElements = document.querySelectorAll("#highlight-links a");
const highlightButton = document.querySelector("#highlight-links button");

highlightButton.addEventListener("click", highlightAllLinks);

function highlightAllLinks() {
  //   allAnchorElements.forEach((element) => {
  //     element.classList.add("highlight");
  //   });
  for (const element of allAnchorElements) {
    element.classList.add("highlight");
  }
}

// YOUR INFORMATION
const dummyUserData = {
  firstName: "Pipo",
  lastName: "Sala",
  age: 33,
};
const displayUserDataButton = document.querySelector("#user-data button");

displayUserDataButton.addEventListener("click", displayUserData);

function displayUserData() {
  const listOfData = document.getElementById("output-user-data");

  listOfData.innerHTML = "";

  for (let property in dummyUserData) {
    const newListItem = document.createElement("li");
    newListItem.textContent =
      property.toLocaleUpperCase() + ": " + dummyUserData[property];
    listOfData.append(newListItem);
  }
}

// STATISTICS
const diceButton = document.querySelector("#statistics button");

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function deriveNumberOfDiceRolls() {
  const targetInputElement = document.getElementById("user-target-number");
  const diceRollsListELement = document.getElementById("dice-rolls");

  const enteredNumber = targetInputElement.value;
  diceRollsListELement.innerHTML = "";

  let hasRolledTargetNumber = false;
  let numberOfRolls = 0;
  while (!hasRolledTargetNumber) {
    const rolledNumber = rollDice();

    // if (rolledNumber == enteredNumber) {
    //     hasRolledTargetNumber = true;
    // }

    hasRolledTargetNumber = rolledNumber == enteredNumber;
    numberOfRolls++;
    const newRollListElement = document.createElement("li");
    newRollListElement.textContent =
      "Roll" + numberOfRolls + ": " + rolledNumber;
    diceRollsListELement.append(newRollListElement);
  }

  const totalDiceRollElement = document.getElementById("output-total-rolls");
  const outputTargetElement = document.getElementById("output-target-number");

  outputTargetElement.textContent = enteredNumber;
  totalDiceRollElement.textContent = numberOfRolls;
}

diceButton.addEventListener("click", deriveNumberOfDiceRolls);
