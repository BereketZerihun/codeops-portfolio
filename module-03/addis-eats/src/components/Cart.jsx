import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    deleteFromCart,
    totalPrice,
    totalItems,
    placeOrder,
  } = useCart();

  return (
    <div className="cart">
      <h2 className="cart-title">Your Cart ({totalItems} items)</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty. Add some Habesha food!</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-price">
                    ${item.price.toFixed(2)} each
                  </span>
                </div>
                <div className="cart-item-controls">
                  <button
                    className="qty-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    −
                  </button>
                  <span className="qty-display">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => addToCart(item)}>
                    +
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteFromCart(item.id)}
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-total">
            <span>Total:</span>
            <span>{totalPrice.toFixed(2)}Birr</span>
          </div>

          <button className="place-order-btn" onClick={placeOrder}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;