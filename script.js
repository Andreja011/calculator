"use strict";

const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};

const multiply = function (a, b) {
  return a * b;
};

const divide = function (a, b) {
  return a / b;
};

const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

const inputDigit = function (digit) {
  const { displayValue, waitingForSecondOperand } = calculator;
  // Overwrite `displayValue` if the current value is '0' otherwise append to it
  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }
  console.log(calculator);
};

const inputDecimal = function (dot) {
  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = "0.";
    calculator.waitingForSecondOperand = false;
    return;
  }

  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
};

const handleOperator = function (nextOperator) {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }

  if (firstOperand == null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);

    calculator.displayValue = `${parseFloat(
      result.toFixed(4)
    ).toLocaleString()}`;

    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);
};

const calculate = function (firstOperand, secondOperand, operator) {
  if (operator === "\u002B") {
    return add(firstOperand, secondOperand);
  } else if (operator === "\u002D") {
    return subtract(firstOperand, secondOperand);
  } else if (operator === "\u00D7") {
    return multiply(firstOperand, secondOperand);
  } else if (operator === "\u00F7") {
    return divide(firstOperand, secondOperand);
  }

  return secondOperand;
};

function resetCalculator() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
}

const updateDisplay = function () {
  const display = document.querySelector(`.calculator-body-display`);
  display.textContent = calculator.displayValue;
};

updateDisplay();

const buttons = document.querySelector(`.calculator-body-buttons`);

buttons.addEventListener("click", (event) => {
  // Access the clicked element
  const { target } = event;

  // Check if the clicked element is a button.
  // If not, exit from the function
  if (!target.matches("button")) {
    return;
  }

  if (target.classList.contains("operator")) {
    handleOperator(target.textContent);
    updateDisplay();
    return;
  }

  if (target.classList.contains("decimal")) {
    inputDecimal(target.textContent);
    updateDisplay();
    return;
  }

  if (target.classList.contains("clear")) {
    resetCalculator();
    updateDisplay();
    return;
  }

  if (target.classList.contains("delete")) {
    console.log("ON/OFF", target.textContent);
    return;
  }

  inputDigit(target.textContent);
  updateDisplay();
});
