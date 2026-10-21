// calculations.js
// Named exports used by main.js (ES6 modules)

// Sum of all the amounts in the array of expenses
export const calculateTotal = (expenses) => {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0)
}

// Checks the two inputs (both arrive as text) and returns
// an object with the result and the error message to show
export const validateExpense = (name, amountText) => {
  if (name === '' && amountText === '') {
    return { isValid: false, message: "You haven't entered anything." }
  }

  if (name === '') {
    return { isValid: false, message: "You haven't entered a name." }
  }

  // isNaN is true when the text is NOT a number, so false means "it is a number"
  if (isNaN(name) === false) {
    return { isValid: false, message: 'The name cannot be a number.' }
  }

  if (amountText === '') {
    return { isValid: false, message: "You haven't entered an amount." }
  }

  // if the amount is not a number, "amount > 0" is false as well
  const amount = parseFloat(amountText)
  const isPositive = amount > 0
  if (isPositive === false) {
    return { isValid: false, message: 'The amount must be a positive number.' }
  }

  return { isValid: true, message: '' }
}