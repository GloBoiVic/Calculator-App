// Global State management variables
let previousValue = "";
let currentValue = "";
let operator = "";
let operatorActive = false;
let result = 0;

// DOM Elements;
const numBtns = document.querySelectorAll(".num-btn");
const operatorBtns = document.querySelectorAll(".operator-btn");
const decimalBtn = document.querySelector(".decimal-btn");
const clearBtn = document.querySelector(".clear-btn");
const equalBtn = document.querySelector(".equal-btn");
const previousOutput = document.querySelector(".previous");
const currentOutput = document.querySelector(".current");

// Functions
const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};

const divide = function (a, b) {
  if (a === 0 || b === 0) {
    return "Crash💥";
  } else {
    return a / b;
  }
};

const multiply = function (a, b) {
  return a * b;
};

function operate(operator, num1, num2) {
  if (operator === "add") return add(num1, num2);
  if (operator === "subtract") return subtract(num1, num2);
  if (operator === "divide") return divide(num1, num2);
  if (operator === "multiply") return multiply(num1, num2);
}

function updateUI() {
  numBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      handleNum(e.target.textContent);
      currentOutput.textContent = currentValue;
    });
  });

  operatorBtns.forEach((op) => {
    op.addEventListener("click", (e) => {
      handleOperator(e.target.getAttribute("data-action"));
      currentOutput.textContent = currentValue;
    });
  });

  decimalBtn.addEventListener("click", addDecimal);

  equalBtn.addEventListener("click", displayResult);

  clearBtn.addEventListener("click", clear);
}

function handleNum(num) {
  // Restrict entries to 5
  if (currentValue.length <= 5) {
    currentValue += num;
  }
}
// Map data-action values to operator symbols
const operatorSymbols = {
  add: "+",
  subtract: "-",
  multiply: "x",
  divide: "÷",
};

function handleOperator(op) {
  if (currentValue !== "") {
    if (previousValue !== "") {
      // If both previousValue and currentValue exist, perform the calculation
      result = roundResults(operate(operator, +previousValue, +currentValue));
      previousOutput.textContent = result;
    } else {
      // If only currentValue exists, set the result to the currentValue
      result = +currentValue;
    }
    operator = op;
    operatorActive = true;
    previousValue = result;
    currentValue = "";
  }
  previousOutput.textContent = `${previousValue} ${operatorSymbols[op]}`;
}

// Make decimal btn work
function addDecimal() {
  if (!currentValue.includes(".")) {
    currentValue += ".";
    currentOutput.textContent += ".";
  }
}

function roundResults(num) {
  return Math.round(num * 1000) / 1000;
}

function displayResult() {
  if (currentValue !== "" && previousValue !== "") {
    result = roundResults(operate(operator, +previousValue, +currentValue));
    currentOutput.textContent = result;
    previousOutput.textContent = "";
    previousValue = "";
    currentValue = result;
  }
}

function clear() {
  previousValue = "";
  currentValue = "";
  result = 0;
  previousOutput.textContent = "";
  currentOutput.textContent = "0";
}

updateUI();
