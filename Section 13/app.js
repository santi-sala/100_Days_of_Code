// for loops
for (let i = 0; i < 10; i++) {
  console.log(i);
}

const users = ["Pia", "Tiago", "Julia"];

// for of loops (for arrays!)
for (const user of users) {
  console.log(user);
}

const loggedInUser = {
  name: "Pipo",
  age: 32,
  isAdmin: true,
};

// for in loops (for objects!)
for (const propertyName in loggedInUser) {
  console.log(propertyName);
  console.log(loggedInUser[propertyName]);
}

let isFinished = false;
// while loops
while (!isFinished) {
  isFinished = confirm("Do you want to quit?");
}

console.log("Done!");
