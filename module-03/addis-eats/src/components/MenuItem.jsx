import { useCart } from "../context/CartContext";

function MenuItem({ item }) {
  const { addToCart } = useCart();

  return (
    <div className="menu-item">
      <img src={item.image} alt={item.name} className="menu-item-image" />
      <div className="menu-item-body">
        <h3 className="menu-item-name">{item.name}</h3>
        <p className="menu-item-description">{item.description}</p>
        <div className="menu-item-footer">
          <span className="menu-item-price">{item.price.toFixed(2)} Birr</span>
          <button className="add-to-cart-btn" onClick={() => addToCart(item)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuItem;