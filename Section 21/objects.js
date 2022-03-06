class Job {
  constructor(jobTitle, place, salary) {
    (this.title = jobTitle), (this.location = place), (this.salary = salary);
  }
}

const developer = new Job("Developer", "New York", 50000);
const cook = new Job("Cook", "Barcelona", 20000);
console.log(developer);
console.log(cook);
