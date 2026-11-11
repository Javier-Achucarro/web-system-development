import { useState, useContext } from 'react'
import { CartContext } from '../context/CartContext'

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useContext(CartContext)
  const [customerName, setCustomerName] = useState('')
  const [confirmation, setConfirmation] = useState('')

  let total = 0
  for (let i = 0; i < cartItems.length; i++) {
    total = total + cartItems[i].price * cartItems[i].quantity
  }

  const handleNameChange = (event) => {
    setCustomerName(event.target.value)
  }

  const handleCheckout = (event) => {
    event.preventDefault()
    const name = customerName.trim()
    if (name === '') {
      return
    }
    setConfirmation(`Thank you for your order, ${name}!`)
    clearCart()
    setCustomerName('')
  }

  return (
    <div>
      <h2>Cart</h2>

      {confirmation && <p data-testid="order-confirmation">{confirmation}</p>}

      {cartItems.length === 0 ? (
        <p data-testid="cart-empty">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart">
            {cartItems.map((item) => (
              <li key={item.id} data-testid={`cart-item-${item.id}`}>
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
                <button
                  data-testid={`decrease-${item.id}`}
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span data-testid={`quantity-${item.id}`}>{item.quantity}</span>
                <button
                  data-testid={`increase-${item.id}`}
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
                <button data-testid={`remove-${item.id}`} onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <p>
            Total: <span data-testid="cart-total">${total.toFixed(2)}</span>
          </p>

          <form onSubmit={handleCheckout}>
            <input
              data-testid="customer-name"
              placeholder="Your name"
              value={customerName}
              onChange={handleNameChange}
            />
            <button type="submit" data-testid="checkout">
              Checkout
            </button>
          </form>
        </>
      )}
    </div>
  )
}

export default Cart