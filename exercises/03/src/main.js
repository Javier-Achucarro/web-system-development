import './style.css';
import { calculateTotal, validateExpense } from './calculations.js';

/**
 * Budget Tracker Application
 * Module 03: JavaScript Fundamentals
 * Carlos Sánchez Cazorla (cjsanchez@uloyola.es)
 * 
 * Features strictly based on the Module 03 syllabus:
 * - ES6 Modules (import/export)
 * - Array methods (push, reduce, forEach)
 * - Objects and arrow functions
 * - DOM manipulation (getElementById, createElement, appendChild, textContent)
 * - Event handling (addEventListener)
 */

// State: list of expenses (Array of objects, Slide 19-21, 28)
const expenses = [];

// DOM Elements selection (Slide 38-39)
const expenseForm = document.getElementById('expense-form');
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseList = document.getElementById('expense-list');
const totalElement = document.getElementById('total');
const errorMessage = document.getElementById('error-message');

/**
 * Renders the expense list in the DOM.
 * Follows DOM manipulation pattern from Slide 37 & 41.
 */
const renderExpenses = () => {
  // Clear the existing list
  expenseList.innerHTML = '';

  if (expenses.length === 0) {
    const emptyLi = document.createElement('li');
    emptyLi.className = 'empty-state';
    emptyLi.textContent = 'No expenses added yet.';
    expenseList.appendChild(emptyLi);
    return;
  }

  // Iterate over expenses using forEach (Slide 21, 37)
  expenses.forEach((expense) => {
    const li = document.createElement('li');
    li.className = 'expense-item';

    const nameSpan = document.createElement('span');
    nameSpan.className = 'expense-name';
    nameSpan.textContent = expense.name;

    const amountSpan = document.createElement('span');
    amountSpan.className = 'expense-amount';
    amountSpan.textContent = `$${expense.amount.toFixed(2)}`;

    // Append child nodes to list item (Slide 37, 41)
    li.appendChild(nameSpan);
    li.appendChild(amountSpan);

    // Append list item to list
    expenseList.appendChild(li);
  });
};

/**
 * Updates the total amount spent displayed in the element with id="total".
 * Uses Array.reduce via calculateTotal (Slide 25).
 */
const updateTotalDisplay = () => {
  const total = calculateTotal(expenses);
  totalElement.textContent = total.toFixed(2);
};

/**
 * Displays an error message to the user.
 * 
 * @param {string} message 
 */
const showError = (message) => {
  if (errorMessage) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
  }
};

/**
 * Clears the error message.
 */
const clearError = () => {
  if (errorMessage) {
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
  }
};

/**
 * Handles adding a new expense.
 * Validates inputs: name must not be empty, amount must be a positive number.
 */
const handleAddExpense = (event) => {
  // Prevent page refresh on form submit
  event.preventDefault();

  const rawName = expenseNameInput.value;
  const rawAmount = parseFloat(expenseAmountInput.value);

  // Validation
  const validation = validateExpense(rawName, rawAmount);
  if (!validation.isValid) {
    showError(validation.message);
    return;
  }

  // Clear any previous error
  clearError();

  // Create new expense object (Slide 28)
  const newExpense = {
    name: rawName.trim(),
    amount: rawAmount,
  };

  // Add to expenses array (Slide 21, 25)
  expenses.push(newExpense);

  // Dynamically re-render the list and update total
  renderExpenses();
  updateTotalDisplay();

  // Reset form inputs
  expenseNameInput.value = '';
  expenseAmountInput.value = '';
  expenseNameInput.focus();
};

// Event listener for form submission (Slide 42)
expenseForm.addEventListener('submit', handleAddExpense);

// Initial render
renderExpenses();
