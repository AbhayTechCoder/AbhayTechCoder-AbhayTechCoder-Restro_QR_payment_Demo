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

  const handlePayment = async () => {

    try {

      console.log("Payment button clicked");

      if (!totalAmount || totalAmount <= 0) {
        alert("Cart is empty");
        return;
      }

      // 1️⃣ Create Razorpay Order
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/payment/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: totalAmount
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        alert("Order creation failed");
        return;
      }

      // 2️⃣ Razorpay Options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: "INR",
        name: "Delicious Bites",
        description: "Food Order Payment",
        order_id: data.order.id,

        handler: async function (response) {

          console.log("Razorpay Response:", response);

          const verifyRes = await fetch(
            `${import.meta.env.VITE_API_URL}/api/payment/verify-payment`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              }),
            }
          );

          const verifyData = await verifyRes.json();

          if (verifyData.success) {

            alert("Payment Successful 🎉");

            // future
            // clearCart()

          } else {

            alert("Payment Verification Failed ❌");

          }
        },

        prefill: {
          name: "Customer",
          email: "customer@email.com",
          contact: "9999999999"
        },

        theme: {
          color: "#ff6b6b"
        }
      };

      // 3️⃣ Open Razorpay
      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {

      console.error("Payment Error:", error);
      alert("Payment failed");

    }
  };

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

      <button
        disabled={cartItems.length === 0}
        onClick={handlePayment}
      >
        Proceed to Payment
      </button>

    </div>
  );
};