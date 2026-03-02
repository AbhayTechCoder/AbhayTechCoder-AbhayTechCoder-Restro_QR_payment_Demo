import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const PaymentSettings = ({ close }) => {

  const [paymentData, setPaymentData] = useState({
    shopName: "",
    upiId: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saved Payment Settings:", paymentData);

    // 🔥 Future:
    // await axios.post("/api/payment-settings", paymentData)

    navigate(-1); // close modal and go back to previous page
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">

        <button className="close-modal" onClick={()=> navigate(-1)}>
          ×
        </button>

        <h2>Payment Settings</h2>

        <form onSubmit={handleSubmit} className="modal-form">

          <label>Shop / Restaurant Name</label>
          <input
            type="text"
            name="shopName"
            value={paymentData.shopName}
            onChange={handleChange}
            className="neu-input"
            placeholder="Delicious Bites"
            required
          />

          <label>UPI ID</label>
          <input
            type="text"
            name="upiId"
            value={paymentData.upiId}
            onChange={handleChange}
            className="neu-input"
            placeholder="yourname@bank"
            required
          />

          <button type="submit" className="neu-button">
            Save Settings
          </button>

        </form>
      </div>
    </div>
  );
};