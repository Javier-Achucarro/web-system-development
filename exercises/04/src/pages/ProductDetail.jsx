import { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import products from '../data/products'
import { CartContext } from '../context/CartContext'

const ProductDetail = () => {
  const { id } = useParams()
  const { addToCart } = useContext(CartContext)

  const product = products.find((p) => p.id === id)

  if (!product) {
    return (
      <div>
        <p data-testid="product-not-found">Product not found.</p>
        <Link to="/">Back to the catalog</Link>
      </div>
    )
  }

  return (
    <div>
      <h2 data-testid="product-name">{product.name}</h2>
      <p data-testid="product-price">${product.price.toFixed(2)}</p>
      <p data-testid="product-description">{product.description}</p>
      <button data-testid="add-to-cart" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
      <p>
        <Link to="/">Back to the catalog</Link>
      </p>
    </div>
  )
}

export default ProductDetail