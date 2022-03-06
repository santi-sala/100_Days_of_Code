const hobbies = ["Sports", "Cooking"];

hobbies.push("Reading");

console.log(hobbies);

const person = { age: 32 };

function getAdultYears(p) {
  p.age -= 18;
  return p.age;
  // return p.age - 18
}

// Here .. (Spread operator) pulls out all the key values of the object, kind of making a temporaty copy of the object so it doesnt change the original!!
console.log(getAdultYears({ ...person }));
console.log(person);
