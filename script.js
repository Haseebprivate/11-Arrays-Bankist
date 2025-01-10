"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

function formateCurrency(value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
}

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  const combined = acc.movements.map((mov, index) => ({
    movement: mov,
    movementDate: acc.movementsDates[index],
  }));

  if (sort) combined.sort((a, b) => a.movement - b.movement);
  console.log(combined);

  console.log(combined);
  // const sortedMovements = sort
  //   ? acc.movements.slice().sort((a, b) => a - b)
  //   : acc.movements;
  console.log();
  combined.forEach((object, index) => {
    const { movement, movementDate } = object;
    const date = new Date(movementDate);

    // const day = `${date.getDay()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // const hours = date.getHours();
    // const min = date.getMinutes();

    const displayDate = new Intl.DateTimeFormat(acc.locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);

    const type = movement > 0 ? "deposit" : "withdrawal";

    const formattedMovement = formateCurrency(
      movement,
      acc.locale,
      acc.currency
    );
    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formattedMovement}</div>
        </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// displayMovements(account1);

function calcDisplayBalance(account) {
  account.balance = account.movements.reduce((accumulator, movement) => {
    return accumulator + movement;
  }, 0);

  labelBalance.textContent = formateCurrency(
    account.balance,
    account.locale,
    account.currency
  );
}

function calcDisplaySummary(account) {
  const income = account.movements
    .filter((movement) => movement > 0)
    .reduce((accumulator, movement) => accumulator + movement);

  const out = account.movements
    .filter((movement) => movement < 0)
    .reduce((accumulator, movement) => accumulator + movement);

  const interest = account.movements
    .filter((movement) => movement > 0)
    .map((deposit) => (deposit * account.interestRate) / 100)
    .filter((interest) => interest >= 1)
    .reduce((accumulator, interest) => accumulator + interest, 0);
  labelSumIn.textContent = formateCurrency(
    income,
    account.locale,
    account.currency
  );
  labelSumOut.textContent = formateCurrency(
    out,
    account.locale,
    account.currency
  );
  labelSumInterest.textContent = formateCurrency(
    interest,
    account.locale,
    account.currency
  );
}

const fullName = "Steven Thomas Williams";

function createUserNames(accounts) {
  accounts.forEach((account) => {
    account.username = account.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
}

createUserNames(accounts);

const deposits = movements.filter((movement) => movement > 0);
const withdrawal = movements.filter((movement) => movement < 0);
console.log(movements);

const balance = movements.reduce((accumulator, current) => {
  return accumulator + current;
}, 0);

console.log(
  movements.reduce((accumulator, movement) => {
    return movement > accumulator ? movement : accumulator;
  }, movements[0])
);

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const calcAverageHumanAge = (ages) => {
  const humanAge = ages
    .map((age) => {
      return age <= 2 ? 2 * age : 16 + age * 4;
    })
    .filter((age) => age >= 18)
    .reduce(
      (accumulator, current, index, array) =>
        accumulator + current / array.length,
      0
    );

  console.log(humanAge);
};

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);

//fake logged IN

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// function checkDogs(dogsJulia, dogsKate) {
//   const corrected = dogsJulia.slice(1, -2);
//   console.log(corrected);
//   const mergedDogsAges = [...corrected, ...dogsKate];
//   mergedDogsAges.forEach((age, index) => {
//     age >= 3
//       ? console.log(`Dog number ${index} is an adult, and is ${age} years old`)
//       : console.log(`Dog number ${index} is still a puppy 🐶`);
//   });
// }

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

function updateUI(account) {
  // display movements
  displayMovements(account);

  // display balance
  calcDisplayBalance(account);

  // display summary
  calcDisplaySummary(account);
}

const USD = 1.1;
const movementsUSD = movements.map((movement) => movement * USD);
console.log(movementsUSD);
let account, timer;

function startLogoutTimer() {
  let time = 60 * 5;

  const tick = () => {
    let min = String(Math.trunc(time / 60)).padStart(2, 0);
    let sec = String(Math.trunc(time % 60)).padStart(2, 0);
    if (time === 0) {
      clearInterval(interval);
      labelWelcome.textContent = "Login to get started";
      containerApp.style.opacity = 0;
    }
    labelTimer.textContent = `${min}:${sec}`;
    time--;
  };
  tick();

  //
  const interval = setInterval(tick, 1000);
  return interval;
}

btnLogin.addEventListener("click", (event) => {
  event.preventDefault();
  account = accounts.find(
    (account) =>
      account.username === inputLoginUsername.value &&
      account.pin === Number(inputLoginPin.value)
  );
  if (account) {
    // display container
    containerApp.style.opacity = 1;

    const now = new Date();
    // const day = `${now.getDay()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hours = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hours}:${min}`;
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
      weekday: "long",
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      account.locale || "en-US",
      options
    ).format(now);
    //clear login inputs
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // display message
    labelWelcome.textContent = `Hello, ${account.owner}`;
    // start timer
    if (timer) clearInterval(timer);
    timer = startLogoutTimer();
    updateUI(account);
  }
});

btnTransfer.addEventListener("click", (event) => {
  event.preventDefault();
  const transferUsername = inputTransferTo.value;
  const transferAmount = Number(inputTransferAmount.value);
  const transferAccount = accounts.find(
    (account) => account.username === transferUsername
  );
  // clear inputs
  inputTransferTo.value = inputTransferAmount.value = "";
  inputLoanAmount.blur();

  if (
    transferAmount > 0 &&
    transferAccount &&
    account.balance >= transferAmount &&
    account.username !== transferAccount
  ) {
    account.movements.push(-transferAmount);
    transferAccount.movements.push(transferAmount);
    // date
    account.movementsDates.push(new Date().toISOString());
    transferAccount.movementsDates.push(new Date().toISOString());

    // display UI
    updateUI(account);

    // reset timer
    clearInterval(timer);
    timer = startLogoutTimer();
  }
});

btnClose.addEventListener("click", (event) => {
  event.preventDefault();

  // deleting account
  if (
    account.username === inputCloseUsername.value &&
    account.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex((acc) => {
      return acc.username === account.username;
    });

    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }

  // clear input
  inputCloseUsername.value = inputClosePin.value = "";
});

btnLoan.addEventListener("click", (event) => {
  event.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);
  if (
    amount > 0 &&
    account.movements.some((movement) => movement >= amount / 10)
  ) {
    setTimeout(() => {
      account.movements.push(amount);
      // date
      account.movementsDates.push(new Date().toISOString());
      updateUI(account);
      // clear timer
      clearInterval(timer);
      timer = startLogoutTimer();
    }, 2000);
  }
  inputLoanAmount.value = "";
});

let sorted = false;
btnSort.addEventListener("click", () => {
  sorted ? (sorted = false) : (sorted = true);
  displayMovements(account, sorted);
});

///////////////////////////////////////
///////////////////////////////////////
// Coding Challenge #4

/*
This time, Julia and Kate are studying the activity levels of different dog breeds.

YOUR TASKS:
1. Store the the average weight of a "Husky" in a variable "huskyWeight"
2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
3. Create an array "allActivities" of all the activities of all the dog breeds
4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".

BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.

TEST DATA:
*/

// const breeds = [
//   {
//     breed: "German Shepherd",
//     averageWeight: 32,
//     activities: ["fetch", "swimming"],
//   },
//   {
//     breed: "Dalmatian",
//     averageWeight: 24,
//     activities: ["running", "fetch", "agility"],
//   },
//   {
//     breed: "Labrador",
//     averageWeight: 28,
//     activities: ["swimming", "fetch"],
//   },
//   {
//     breed: "Beagle",
//     averageWeight: 12,
//     activities: ["digging", "fetch"],
//   },
//   {
//     breed: "Husky",
//     averageWeight: 26,
//     activities: ["running", "agility", "swimming"],
//   },
//   {
//     breed: "Bulldog",
//     averageWeight: 36,
//     activities: ["sleeping"],
//   },
//   {
//     breed: "Poodle",
//     averageWeight: 18,
//     activities: ["agility", "fetch"],
//   },
// ];

// const huskyWeight = breeds.find(
//   (breed) => breed.breed === "Husky"
// ).averageWeight;

// const dogBothActivities = breeds.find(
//   (breed) =>
//     breed.activities.includes("running") && breed.activities.includes("fetch")
// );

// const allActivities = breeds.map((breed) => breed.activities).flat();

// let checkActivity = [];
// for (const activity of allActivities) {
//   if (checkActivity.includes(activity)) {
//     continue;
//   }
//   checkActivity.push(activity);
// }
// console.log(checkActivity);

// const uniqueActivities = [...new Set(allActivities)];

// const swimmingAdjacent = uniqueActivities.filter(
//   (activity) => activity !== "swimming"
// );

// const averageWeightAboveTen = breeds
//   .map((breed) => breed.averageWeight)
//   .every((weight) => weight > 10);

// breeds.forEach((breed) =>
//   breed.activities.length >= 3 ? console.log(true) : console.log(false)
// );

// const fetchWeights = breeds
//   .filter((breed) => breed.activities.includes("fetch"))
//   .map((breed) => breed.averageWeight);
// const heaviestFetchBreed = Math.max(...fetchWeights);
// console.log(fetchWeights);

// updateUI(account1);
// containerApp.style.opacity = 1;

//dates
const now = new Date();
const day = `${now.getDay()}`.padStart(2, 0);
const month = `${now.getMonth() + 1}`.padStart(2, 0);
const year = now.getFullYear();
const hours = now.getHours();
const min = now.getMinutes();

labelDate.textContent = `${day}/${month}/${year}, ${hours}:${min}`;

// clock

// setInterval(() => {
//   const now = new Date();
//   const seconds = `${now.getSeconds()}`.padStart(2, 0);
//   console.log(`${now.getHours()}:${now.getMinutes()}:${seconds}`);
// }, 1000);
