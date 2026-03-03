import axios from "axios";
const handlePayment = async () => {
  try {
    // Create order on backend
    const { data } = await axios.post(
      "https://abhay-tech-coder-abhay-tech-coder-restro-qr-payment-demo.vercel.app/api/payment/create-order",
      { amount: total }  // total comes from your cart
    );

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID",
      amount: data.order.amount,
      currency: "INR",
      name: "Delicious Bites",
      order_id: data.order.id,
      handler: async (response) => {
        await axios.post(
          "https://abhay-tech-coder-abhay-tech-coder-restro-qr-payment-demo.vercel.app/api/payment/verify-payment",
          response
        );
        alert("Payment Successful");
      },
      theme: {
        color: "#ff6b6b",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error(error);
  }
};