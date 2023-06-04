const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};

const divide = function (a, b) {
  if (a === 0 || b === 0) {
    return 'Cannot divide with zero';
  } else {
    return a / b;
  }
};

const multiply = function (a, b) {
  return a * b;
};

let previousValue = '';
let operator = '';
let currentValue = '';

function operate(operator, num1, num2) {
  if (operator === 'add') return add(num1, num2);
  if (operator === 'subtract') return subtract(num1, num2);
  if (operator === 'divide') return divide(num1, num2);
  if (operator === 'multiply') return multiply(num1, num2);
}

// DOM Elements;
const numBtns = document.querySelectorAll('.num-btn');
const operatorBtn = document.querySelectorAll('.operator-btn');
const clearBtn = document.querySelector('.clear-btn');
const equalBtn = document.querySelector('.equal-btn');
const calculatorScreen = document.querySelector('.calculator-screen');
const previousOutput = document.querySelector('.previous');
const currentOutput = document.querySelector('.current');

const handleNumBtns = function () {
  numBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      handleNumber(e.target.textContent);
      currentOutput.textContent = currentValue;
    });
  });
};

const handleOperatorBtns = function () {
  operatorBtn.forEach((operator) => {
    operator.addEventListener('click', (e) => {
      handleOperator(e.target.textContent);
      previousOutput.textContent = previousValue + ' ' + operator;
      currentOutput.textContent = currentValue;
    });
  });
};

const handleNumber = function (num) {
  if (currentValue.length <= 5) currentValue += num;
};

const handleOperator = function (op) {
  operator = op;
  previousValue = currentValue;
  currentValue = '';
};

handleNumBtns();
handleOperatorBtns();
// handleBtns();

// console.log(numBtns);
