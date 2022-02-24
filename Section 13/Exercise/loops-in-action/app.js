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
  for (let element of allAnchorElements) {
    element.classList.add("highlight");
  }
}

// YOUR INFORMATION

// STATISTICS
