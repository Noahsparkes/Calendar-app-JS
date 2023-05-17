let nav = 0; //keeping track of which month it is
let clicked = null; //whichever day has been clicked
let events = localStorage.getItem("events")
  ? JSON.parse(localStorage.getItem("events"))
  : []; //JSON.parse because to make sure the object exists in local storage.
// if it does not exist in local storage then return an empty array.

const calendar = document.getElementById("calendar"); //reference for the calendar
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function load() {
  const dt = new Date();

  if (nav !== 0) {
    dt.setDate(1)
    dt.setMonth(new Date().getMonth() + nav);
  } //

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // will return the number of days in the month

  const dateString = firstDayOfMonth.toLocaleDateString("en-uk", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const paddingDays = weekdays.indexOf(dateString.split(",")[0]);

  document.getElementById("monthDisplay").innerText = `${dt.toLocaleDateString(
    "en-uk",
    { month: "long" }
  )} ${year}`; // displaying the month and year ontop of calendar by referncing the monthDisplay id

  calendar.innerHTML = ""; //wipes all squares/days when buttons are triggered to not create more squares than neccessary. sets html to empty string.

  for (let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement("div");
    daySquare.classList.add("day");

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;

      daySquare.addEventListener("click", () => console.log("click"));
    } else {
      daySquare.classList.add("padding");
    }

    calendar.appendChild(daySquare);
  }
}
//months are counted from 0, which is why there is a + 1 to calc no. of months

/**
 * below creates a function with tthe working 'next' and 'back' buttons for calendar.
 */
function initButtons() {
  document.getElementById("nextButton").addEventListener("click", () => {
    nav++;
    load();
  });
  document.getElementById("backButton").addEventListener("click", () => {
    nav--;
    load();
  });
}

load();
