import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import products from '../data/products'
import { CartContext } from '../context/CartContext'

const Catalog = () => {
  const [search, setSearch] = useState('')
  const { addToCart } = useContext(CartContext)

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const productsToShow = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h2>Catalog</h2>

      <input
        data-testid="search"
        placeholder="Search products..."
        value={search}
        onChange={handleSearchChange}
      />

      {productsToShow.length === 0 && (
        <p data-testid="no-results">No products found.</p>
      )}

      <ul className="products">
        {productsToShow.map((product) => (
          <li key={product.id} data-testid={`product-${product.id}`}>
            <Link to={`/products/${product.id}`} data-testid={`product-link-${product.id}`}>
              {product.name}
            </Link>
            <span data-testid={`price-${product.id}`}>${product.price.toFixed(2)}</span>
            <button data-testid={`add-${product.id}`} onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Catalog