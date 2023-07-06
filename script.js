/*querying the elements*/
const form = document.querySelector("#form");
const day = document.querySelector("#day");
const month = document.querySelector("#month");
const year = document.querySelector("#year");
const inputs = document.querySelectorAll("input");
const dayError = document.querySelector("#day-error");
const monthError = document.querySelector("#month-error");
const yearError = document.querySelector("#year-error");
const dayCount = document.querySelector("#day-count");
const monthCount = document.querySelector("#month-count");
const yearCount = document.querySelector("#year-count");

// function to calculate the age of person given the birth date
function calculateAge() {
  const dayValue = +day.value;
  const monthValue = +month.value;
  const yearValue = +year.value;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  // Adding 1 to get the current month as a 1-based index
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  let ageYears = currentYear - yearValue;
  let ageMonths = currentMonth - monthValue;
  let ageDays = currentDay - dayValue;

  // Check if the birth date is after the current date
  const birthDate = new Date(yearValue, monthValue - 1, dayValue);
  if (birthDate > currentDate) {
    errorText(dayError, "Enter a valid date");
    errorText(monthError, "");
    errorText(yearError, "");
    errorStyle(day);
    errorStyle(month);
    errorStyle(year);
    return;
  }

  // Adjust the age if the current month/day is before the birth month/day
  if (
    currentMonth < monthValue ||
    (currentMonth === monthValue && currentDay < dayValue)
  ) {
    ageYears--;
    ageMonths = 12 - (monthValue - currentMonth);
    if (currentDay < dayValue) {
      ageMonths--;
      const daysInBirthMonth = getDaysInMonth(currentMonth - 1, currentYear);
      ageDays = daysInBirthMonth - (dayValue - currentDay);
    }
  }

  if(dayValue == currentDay && monthValue == currentMonth){
    setTimeout(() => alert('Happy Birthday to you🎂🎉🥳'), 300);
    console.log('Hello');
  }
  ageStyle(ageYears, ageMonths, ageDays);
}

// adding event-listener to the form
// when the user submit the the values
// it calls the check functions then 
//call the calc age function
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (chekcInput(day) && chekcInput(month) && chekcInput(year)) {
    calculateAge();
    //do Nothing
  }
  else {
    chekcInput(day);
    chekcInput(month);
    chekcInput(year);
  }
});

// putting event-listener on inputs
// to check for values while the user
// is entering them.
inputs.forEach((element) => {
  element.addEventListener("input", () => {
    chekcInput(element);
  });
});

function chekcInput(formDate) {
  let hasError = false;
  hasError = commonCheck(formDate);
  if (formDate.id == "day") {
    hasError = checkDay(formDate);
  } else if (formDate.id == "month") {
    hasError = checkMonth(formDate);
  } else if (formDate.id == "year") {
    hasError = checkYear(formDate);
  }
  return !hasError;
}


// function to check for common erros in the inputs

function commonCheck(dateElement) {
  // variable to check if any input field has any errors:
  // false -> there'snt any errrors / true -> there's errors
  let hasError = false;

  // This will extract the value from the input field
  const elementValue = +dateElement.value;
  const errorName = document.querySelector(`#${dateElement.id}-error`);
  if (checkIfEmpty(elementValue)) {
    hasError = errorText(errorName, "This field is required");
  } else if (checkIfNumber(elementValue)) {
    hasError = errorText(errorName, "Must be a number");
  } else if (checkIfNegative(elementValue)) {
    hasError = errorText(errorName, "Enter a valid date");
  } else {
    correctStyle(dateElement, errorName);
  }
  if (hasError) {
    errorStyle(dateElement);
  }
  return hasError;
}

// function to deal with specific errors in the dates

function checkYear(year) {
  const yearValue = +year.value;
  const date = new Date();
  if (yearValue > date.getFullYear()) {
    errorText(yearError, "It must be in the past");
    errorStyle(year);
    return true;
  }
  return false;
}

function checkMonth(month) {
  const monthValue = +month.value;
  if (monthValue < 1 || monthValue > 12) {
    errorText(monthError, "Enter a valid month");
    errorStyle(month);
    return true;
  }
  return false;
}

function checkDay(day) {
  if (!isDateValid(+year.value, +month.value, +day.value)) {
    errorText(dayError, "Enter a valid date");
    errorStyle(day);
    errorStyle(month);
    errorStyle(year);
    return true;
  } else {
    correctStyle(day, dayError);
    correctStyle(month, monthError);
    correctStyle(year, yearError);
    return false;
  }
}

// style functions

function errorStyle(element) {
  element.style.borderColor = "red";
  const elementLabel = document.querySelector(`#${element.id}-label`);
  elementLabel.classList.add("label-wrong-input");
}

function correctStyle(element, errorName) {
  errorName.textContent = "";
  element.style.borderColor = "lightGreen";
  const elementLabel = document.querySelector(`#${element.id}-label`);
  elementLabel.classList.remove("label-wrong-input");
}

function errorText(errorFiled, text) {
  errorFiled.textContent = text;
  return true;
}

function ageStyle(years, months, days) {
  yearCount.textContent = +years;
  monthCount.textContent = +months;
  dayCount.textContent = +days;
}

// Check functions
function checkIfNumber(value) {
  return isNaN(value);
}

function checkIfNegative(value) {
  return value < 0;
}

function checkIfEmpty(value) {
  return value == "";
}

function isDateValid(year, month, day) {
  const date = new Date(year, month - 1, day);

  // here we compare the adjusted values
  //from the new date with the given one
  return (
    year === date.getFullYear() &&
    month === date.getMonth() + 1 &&
    day === date.getDate()
  );
}

function getDaysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}
