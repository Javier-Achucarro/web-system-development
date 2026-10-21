/**
 * calculations.js
 * ES6 Module providing calculation and validation utilities.
 * Conforms to Module 03 syllabus (ES6 Modules: import/export, Arrow Functions, Array.reduce).
 */

/**
 * Calculates the total spent from an array of expense objects.
 * Uses Array.prototype.reduce (Slide 25).
 * 
 * @param {Array<{name: string, amount: number}>} expenses
 * @returns {number}
 */
export const calculateTotal = (expenses) => {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0);
};

/**
 * Validates the expense inputs.
 * Rule: name must not be empty, amount must be a positive number.
 * 
 * @param {string} name
 * @param {number} amount
 * @returns {{isValid: boolean, message: string}}
 */
export const validateExpense = (name, amount) => {
  const trimmedName = name.trim();

  if (trimmedName === '') {
    return {
      isValid: false,
      message: 'Expense name cannot be empty.',
    };
  }

  if (isNaN(amount) || amount <= 0) {
    return {
      isValid: false,
      message: 'Amount must be a positive number greater than 0.',
    };
  }

  return {
    isValid: true,
    message: '',
  };
};
