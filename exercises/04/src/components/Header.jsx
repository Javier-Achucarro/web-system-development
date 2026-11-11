import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'

const Header = () => {
  const { cartItems } = useContext(CartContext)

  let totalUnits = 0
  for (let i = 0; i < cartItems.length; i++) {
    totalUnits = totalUnits + cartItems[i].quantity
  }

  return (
    <header>
      <h1>Mini Shop</h1>
      <nav>
        <Link to="/" data-testid="nav-home">Home</Link>
        <Link to="/cart" data-testid="nav-cart">
          Cart (<span data-testid="cart-count">{totalUnits}</span>)
        </Link>
      </nav>
    </header>
  )
}

export default Header