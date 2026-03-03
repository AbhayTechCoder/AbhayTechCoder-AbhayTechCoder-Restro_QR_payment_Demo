import axios from "axios";

const OrderSidebar = ({
  cartItems = [],        // ✅ default safe value
  setCartItems = () => {},
  tableNumber,
  setTableNumber,
}) => {

  // ✅ Safe total calculation
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePayment = async () => {
    try {
      if (total === 0) {
        alert("Cart is empty");
        return;
      }

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/payment/create-order`,
        { amount: total },
        { withCredentials: true }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: data.order.amount,
        currency: "INR",
        name: "Delicious Bites",
        description: "Order Payment",
        order_id: data.order.id,
        handler: async function (response) {
          await axios.post(
            `${import.meta.env.VITE_API_URL}/api/payment/verify-payment`,
            response,
            { withCredentials: true }
          );

          alert("Payment Successful ✅");
          setCartItems([]);
        },
        theme: {
          color: "#ff6b6b",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();

    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed ❌");
    }
  };

  return (
    <div className="order-sidebar">
      <h3>Total: ₹{total}</h3>

      <button onClick={handlePayment} className="neu-button">
        Proceed to Payment
      </button>
    </div>
  );
};

export default OrderSidebar;