import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Cart.css";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
    totalItems,
    totalPrice,
  } = useCart();

  // ── Empty state ──────────────────────────────────────
  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <div className="cart-empty__icon">🛒</div>
          <h2 className="cart-empty__title">Your cart is empty</h2>
          <p className="cart-empty__sub">
            Looks like you haven't added anything yet. Start shopping!
          </p>
          <Link to="/" className="cart-empty__btn">
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  const shipping = totalPrice > 50 ? "Free" : "$9.99";
  const shippingCost = totalPrice > 50 ? 0 : 9.99;
  const grandTotal = (parseFloat(totalPrice) + shippingCost).toFixed(2);

  return (
    <div className="cart-page">
      {/* Title */}
      <h1 className="cart-page__title">Your Cart</h1>
      <p className="cart-page__count">
        {totalItems} {totalItems === 1 ? "item" : "items"}
      </p>

      <div className="cart-layout">
        {/* ── LEFT: Cart Items ── */}
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              {/* Image */}
              <img
                className="cart-item__image"
                src={item.thumbnail}
                alt={item.title}
              />

              {/* Info */}
              <div className="cart-item__info">
                <div className="cart-item__name">{item.title}</div>
                <div className="cart-item__category">{item.category}</div>
                <div className="cart-item__price">${item.price} each</div>
              </div>

              {/* Actions */}
              <div className="cart-item__actions">
                {/* Subtotal */}
                <div className="cart-item__subtotal">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                {/* Qty controls */}
                <div className="qty-controls">
                  <button
                    className="qty-btn"
                    onClick={() => decreaseQty(item.id)}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <div className="qty-value">{item.quantity}</div>
                  <button
                    className="qty-btn"
                    onClick={() => increaseQty(item.id)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Remove */}
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── RIGHT: Order Summary ── */}
        <div className="cart-summary">
          <h2 className="cart-summary__title">Order Summary</h2>

          <div className="cart-summary__row">
            <span>Subtotal ({totalItems} items)</span>
            <span>${totalPrice}</span>
          </div>
          <div className="cart-summary__row">
            <span>Shipping</span>
            <span>{shipping}</span>
          </div>

          {totalPrice <= 50 && (
            <div className="cart-summary__row">
              <span style={{ color: "var(--accent)", fontSize: "12px" }}>
                Add ${(50 - totalPrice).toFixed(2)} more for free shipping!
              </span>
            </div>
          )}

          <hr className="cart-summary__divider" />

          <div className="cart-summary__total">
            <span>Total</span>
            <span>${grandTotal}</span>
          </div>

          <button className="checkout-btn">Proceed to Checkout</button>

          <p className="cart-summary__note">
            🔒 Secure checkout · Free returns · 30-day guarantee
          </p>
        </div>
      </div>
    </div>
  );
}

export default Cart;
