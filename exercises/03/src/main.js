import { calculateTotal, validateExpense } from './calculations.js'

// State: array of expense objects
let expenses = []

// DOM elements
const nameInput = document.getElementById('expense-name')
const amountInput = document.getElementById('expense-amount')
const addButton = document.getElementById('add-btn')
const expenseList = document.getElementById('expense-list')
const totalElement = document.getElementById('total')
const errorMessage = document.getElementById('error-message')

// Draws the whole list of expenses in the DOM
const renderExpenses = () => {
  expenseList.innerHTML = ''

  if (expenses.length === 0) {
    const emptyItem = document.createElement('li')
    emptyItem.setAttribute('class', 'empty-state')
    emptyItem.textContent = 'No expenses added yet.'
    expenseList.appendChild(emptyItem)
    return
  }

  expenses.forEach((expense) => {
    const li = document.createElement('li')

    const nameSpan = document.createElement('span')
    nameSpan.textContent = expense.name

    const amountSpan = document.createElement('span')
    amountSpan.setAttribute('class', 'expense-amount')
    amountSpan.textContent = `$${expense.amount}`

    li.appendChild(nameSpan)
    li.appendChild(amountSpan)
    expenseList.appendChild(li)
  })
}

const updateTotal = () => {
  totalElement.textContent = calculateTotal(expenses)
}

const showError = (message) => {
  errorMessage.textContent = message
  errorMessage.style.display = 'block'
}

const clearError = () => {
  errorMessage.textContent = ''
  errorMessage.style.display = 'none'
}

const handleAddExpense = () => {
  const name = nameInput.value

  const validation = validateExpense(name, amountInput.value)
  if (validation.isValid === false) {
    showError(validation.message)
    return
  }

  clearError()

  const amount = parseFloat(amountInput.value)

  const newExpense = { name: name, amount: amount }

  // concat creates a new array, the old one remains unchanged
  expenses = expenses.concat(newExpense)

  renderExpenses()
  updateTotal()

  nameInput.value = ''
  amountInput.value = ''
}

addButton.addEventListener('click', handleAddExpense)

renderExpenses()