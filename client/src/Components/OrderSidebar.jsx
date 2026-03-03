import axios from "axios";

const OrderSidebar = ({
  cartItems,
  setCartItems,
  tableNumber,
  setTableNumber,
}) => {

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePayment = async () => {
    try {
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
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Total: ₹{total}</h3>

      <button onClick={handlePayment}>
        Proceed to Payment
      </button>
    </div>
  );
};

export default OrderSidebar;