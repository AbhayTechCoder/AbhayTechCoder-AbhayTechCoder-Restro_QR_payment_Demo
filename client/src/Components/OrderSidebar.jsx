import { useCart } from "../contexts/CartContext";

export const OrderSidebar = () => {

  const {
    cartItems,
    tableNumber,
    setTableNumber,
    increaseQty,
    decreaseQty,
    totalAmount
  } = useCart();

  return (
    <div className="order-panel">

      <h3>Table No</h3>
      <input
        type="number"
        className="table-input"
        value={tableNumber}
        onChange={(e) => setTableNumber(e.target.value)}
        placeholder="Enter table No"
      />

      <h3>Your Order</h3>

      {cartItems.length === 0 && (
        <p style={{ textAlign: "center", opacity: 0.6 }}>
          Cart is empty
        </p>
      )}

      {cartItems.map(item => (
        <div key={item._id} className="order-item">

          <div className="left-section">
            <span className="qty">{item.quantity}x</span>
            <span className="dish-name">{item.name}</span>
          </div>

          <span className="price">
            ₹{item.price * item.quantity}
          </span>

          <div className="qty-control">
            <button onClick={() => decreaseQty(item._id)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => increaseQty(item._id)}>+</button>
          </div>

        </div>
      ))}

      <h3>Total: ₹{totalAmount}</h3>

      <button disabled={cartItems.length === 0}>
        Proceed to Payment
      </button>

    </div>
  );
};