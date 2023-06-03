// Set global variables to be manipulated
let operator = '';
let previousValue = '';
let currentValue = '';

document.addEventListener('DOMContentLoaded', function () {
  // store html components when DOM loads
  let clear = document.querySelector('.clear-btn');
  let equal = document.querySelector('.equal-btn');
  let decimal = document.querySelector('.decimal-btn');

  let numbers = document.querySelectorAll('.num-btn');
  let operators = document.querySelectorAll('.operator-btn');

  let previousOutput = document.querySelector('.previous');
  let currentOutput = document.querySelector('.current');

  //Loop through number buttons
  numbers.forEach((number) =>
    number.addEventListener('click', function (e) {
      handleNumber(e.target.textContent);
      currentOutput.textContent = currentValue;
    })
  );

  //Loop through operator
  operators.forEach((op) =>
    op.addEventListener('click', function (e) {
      handleOperator(e.target.textContent);
      previousOutput.textContent = previousValue + ' ' + operator;
      currentOutput.textContent = currentValue;
    })
  );

  clear.addEventListener('click', function () {
    previousValue = '';
    currentValue = '';
    operator = '';
    previousOutput.textContent = currentValue;
    currentOutput.textContent = currentValue;
  });

  equal.addEventListener('click', function () {
    if (currentValue != '' && previousValue != '') {
      calculate();
      previousOutput.textContent = '';
      if (previousValue.length <= 5) {
        currentOutput.textContent = previousValue;
      } else {
        currentOutput.textContent = previousValue.slice(0, 5) + '...';
      }
    }
  });

  decimal.addEventListener('click', function () {
    addDecimal();
  });
});

//Restrict display to show only 5 numbers
function handleNumber(num) {
  if (currentValue.length <= 5) {
    currentValue += num;
  }
}

// Makes operator buttons work
function handleOperator(op) {
  operator = op;
  previousValue = currentValue;
  currentValue = '';
}

// Adds calculation functionality
function calculate() {
  previousValue = Number(previousValue);
  currentValue = Number(currentValue);

  if (operator === '+') {
    previousValue += currentValue;
    console.log(previousValue, currentValue);
  } else if (operator === '-') {
    previousValue -= currentValue;
  } else if (operator === 'x') {
    previousValue *= currentValue;
  } else {
    previousValue /= currentValue;
  }

  previousValue = roundNumber(previousValue);
  previousValue = previousValue.toString();
  currentValue = previousValue.toString();
}

// Rounds numbers
function roundNumber(num) {
  return Math.round(num * 1000) / 1000;
}

// Make decimal btn work
function addDecimal() {
  if (!currentValue.includes('.')) {
    currentValue += '.';
  }
}
