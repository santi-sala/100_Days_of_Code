function greetUser(userNAme = "user") {
  //   console.log("K pasa " + userNAme + "!");
  console.log(`K pasa ${userNAme}!`);
}

greetUser("pipo");
greetUser();

// Here ... is called rest parameters (Converts parameters into an array)
function sumUp(...numbers) {
  let result = 0;

  numbers.forEach((number) => {
    result += number;
  });

  return result;
}

const inputNumbers = [1, 6, 9, 8, 5];

console.log(sumUp(1, 3, 5, 9, 8));

// Here ... is called spread operator (Splits the array into its individual values as parameters)
console.log(sumUp(...inputNumbers));
