import { useCart } from "../context/CartContext";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const hasSale = product.discountPercentage > 10;
  const discountedPrice = (
    product.price *
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <div className="product-card">
      {/* Image */}
      <div className="product-card__image-wrap">
        <img src={product.thumbnail} alt={product.title} loading="lazy" />
        {hasSale ? (
          <span className="product-card__badge product-card__badge--sale">
            Sale
          </span>
        ) : (
          <span className="product-card__badge product-card__badge--new">
            New
          </span>
        )}
      </div>

      {/* Info */}
      <div className="product-card__info">
        <div>
          <div className="product-card__name">{product.title}</div>
          <div className="product-card__sub">{product.category}</div>
        </div>
        <div className="product-card__price">
          {hasSale ? (
            <>
              <span className="product-card__price-old">${product.price}</span>$
              {discountedPrice}
            </>
          ) : (
            `$${product.price}`
          )}
        </div>
      </div>

      {/* Add to Cart */}
      <button
        className="product-card__add-btn"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
