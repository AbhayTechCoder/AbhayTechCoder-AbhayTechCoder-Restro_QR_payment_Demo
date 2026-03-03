import axios from "axios";

const OrderSidebar = ({
  cartItems,
  setCartItems,
  tableNumber,
  setTableNumber,
}) => {

  // SAFE total (agar props na aaye to crash na kare)
  const total = cartItems
    ? cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      )
    : 0;

  const handlePayment = async () => {
    try {
      if (!total || total === 0) {
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
        order_id: data.order.id,
        handler: async function (response) {
          await axios.post(
            `${import.meta.env.VITE_API_URL}/api/payment/verify-payment`,
            response,
            { withCredentials: true }
          );

          alert("Payment Successful ✅");

          if (setCartItems) {
            setCartItems([]);
          }
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