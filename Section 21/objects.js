class Job {
  constructor(jobTitle, place, salary) {
    this.title = jobTitle;
    this.location = place;
    this.salary = salary;
  }
  describe() {
    console.log(
      `I'm ${this.title}, I work in ${this.location} and my salary a year is ${this.salary}€.`
    );
  }
}

const developer = new Job("Developer", "New York", 50000);
const cook = new Job("Cook", "Barcelona", 20000);
console.log(developer);
developer.describe();
console.log(cook);
cook.describe();
