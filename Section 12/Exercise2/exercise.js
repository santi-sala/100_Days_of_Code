// Practice what you learned!
// console.log("sup");

// 1) Select the two <button> elements and store them in two different variables.
//    - Select the first button without adding or using any "id"
const firstButton = document.querySelector("button");
// console.log(firstButton.textContent);
//    - Select the second button by using an "id"
const secondButton = document.getElementById("second-button");
// console.log(secondButton.textContent);

// 2) Add "click" event listener to both buttons (with two different functions).
firstButton.addEventListener("click", removeParagraph);

secondButton.addEventListener("click", addBlueBackgroundColor);

//    The functions should "console.dir()" the clicked buttons.
//    - Output the first button by using the variable in which it's stored
function removeParagraph() {
  console.dir(firstButton);
  toRemoveParagraph.remove();
}
//    - Output the second button WITHOUT using the variable in which it's stored
function addBlueBackgroundColor() {
  //   console.dir(firstButton.nextElementSibling.nextElementSibling);
  console.dir(event.target);
  //   firstParagraph.style.backgroundColor = "blue";
  firstParagraph.classList.add("blueBg");
}

// 3) Now select and store the paragraphs mentioned in the text you see on the page

//    (first and third paragraph)
// const toRemoveParagraph = firstButton.previousElementSibling;
const toRemoveParagraph = document.body.children[2].children[3];
// console.log(toRemoveParagraph.textContent);

// const firstParagraph = document.querySelector("section p");
const firstParagraph = document.body.children[1];
// console.log(firstParagraph.textContent);

//    - Select BOTH paragraphs by drilling into the document and "navigating" to the
//      mentioned elements
//    - If you struggle with DOM drilling, use "ids" instead but watch the solution!

// 4) Change the functions from (2) such that:
//    - The first button removes the third paragraph (i.e. the <p> prior to it)
//    - The second button changes the background color of the first paragraph to blue

// 5) Solve (4) both by changing the "inline styles" as well as by adding CSS classes
//    Note: You'll have to add those classes to the styles.css file first!
