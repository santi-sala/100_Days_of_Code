// document.body.children[1].children[0].href = "https://www.google.com";

// console.dir(document);

document.getElementById("external-link").href = "https://elotrolado.net";

let anchorElement = document.querySelector("#external-link");
anchorElement.href = "http://www.as.com";

// Add an Element
// 1. Create a the new element
let newAnchorElement = document.createElement("a");
newAnchorElement.textContent = " sport.es!!";
newAnchorElement.href = "https://www.sport.es";
// 2. Get access to the parent elemnt that should hold the new element
let firstParagraph = document.querySelector(".first-paragraph");
let secondParagraph = firstParagraph.nextElementSibling;
// 3. Insert the new element into the parent element
firstParagraph.append(newAnchorElement);

// REmove ELements
// 1. Select element to remove
let firstH1Element = document.querySelector("H1");
// 2. Remove it
firstH1Element.remove();
// firstH1Element.parentElement.removeChild(firstH1Element); // for older browsers!!

// Move existing elemnts
let myAnchor = document.querySelector("#external-link");
myAnchor.textContent = "sup sup sup";
myAnchor.parentElement.append(myAnchor);
// firstH1Element.parentElement.insertBefore(myAnchor, firstH1Element);

//  innerHTML
firstParagraph.innerHTML = "This is a<strong> INNER HTML </strong>.";
