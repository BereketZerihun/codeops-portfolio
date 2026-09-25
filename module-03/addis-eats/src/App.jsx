import { useState } from "react";
import { CartProvider, useCart } from "./context/CartContext";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import OrderSuccess from "./components/OrderSuccess";
import "./App.css";

function AppContent() {
  const { showSuccess, totalItems } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Habesha Eats</h1>
        <button
          className="cart-toggle-btn"
          onClick={() => setCartOpen(!cartOpen)}
        >
          Cart ({totalItems})
        </button>
      </header>

      <div className="app-body">
        <main className="menu-section">
          <Menu />
        </main>

        {cartOpen && (
          <aside className="cart-sidebar">
            <button
              className="close-cart-btn"
              onClick={() => setCartOpen(false)}
            >
              Close
            </button>
            <Cart />
          </aside>
        )}
      </div>

      {showSuccess && <OrderSuccess />}
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;