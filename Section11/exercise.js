// This is how a comment is added to JavaScript
// Comments are not executed - they are just there to provide extra
// information to you or other developers

// Exercise Time!

// 1) Create three new variables:
//    - A variable that stores the name of an online course of your choice
let onlineCourse = "100 days of code";
//    - A variable that stores the price of that course
let price = 14.55;
//    - A variable that stores the three main goals that you have, when taking this course
let mainGoals = ["learn javascript", "confidence in creating webs", "have fun"];
// 2) Output ("alert") the three variable values
alert(
  "The course i'm doing right now is called: " +
    onlineCourse +
    ". It cost me: " +
    price +
    " and my goals in doing this course are: " +
    mainGoals[0] +
    ", " +
    mainGoals[1] +
    " and " +
    mainGoals[2] +
    "."
);
// 3) Try "grouping" the three variables together and still output their values thereafter
let course = {
  name: "100 days of code",
  price: 14.55,
  goals: ["learn javascript", "confidence in creating webs", "have fun"],
};
// 4) Also output the second element in your "main goals" variable
console.log(course.name);
console.log(course.price);
course.goals.forEach((element) => {
  console.log(element);
});
// 5) Add a custom command that does the following:
//    - Use your "main goals" variable and access an element by its identifier
function GetGoals(index) {
  if (index < 0 || index > course.goals.length - 1) {
    alert("No such goal...");
  } else {
    alert("The goal number " + index + " is " + course.goals[index]);
  }
}
//    - The concrete identifier value should be dynamic / flexible
//      (i.e. the command can be executed for different identifier)
//    - The "main goals" variable should also be dynamic: The command should work
//      with ANY list of values
//    - The custom command should provide the accessed value (i.e. the list element)
// 6) Execute your custom command from (5) and output ("alert") the result
GetGoals(2);
