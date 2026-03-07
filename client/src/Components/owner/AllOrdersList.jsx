import { useEffect, useState } from "react";
import socket from "../../socket";

export const AllOrdersList = () => {

  const [orders, setOrders] = useState([]);

  /* ================= FETCH ORDERS ================= */

  const fetchOrders = async () => {

    try {

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders/all`,
        { credentials: "include" }
      );

      const data = await res.json();

      // 🔥 important fix
      if (Array.isArray(data.orders)) {
        setOrders(data.orders);
      } else {
        setOrders([]);
      }

    } catch (error) {
      console.error("Fetch orders error:", error);
      setOrders([]);
    }

  };


  /* ================= SOCKET LISTENER ================= */

  useEffect(() => {

    fetchOrders();

    socket.on("new-order", (order) => {
      setOrders(prev => [order, ...prev]);
    });

    return () => socket.off("new-order");

  }, []);


  /* ================= MARK ORDER SERVED ================= */

  const markServed = async (id) => {

    try {

      await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders/served/${id}`,
        {
          method: "PATCH",
          credentials: "include"
        }
      );

      fetchOrders();

    } catch (error) {
      console.error("Serve order error:", error);
    }

  };


  /* ================= UI ================= */

  return (

    <div className="orders-list">

      {Array.isArray(orders) && orders.map(order => (

        <div key={order._id} className="order-card">

          {/* HEADER */}

          <div className="order-header">
            <h3>Table {order.tableNumber}</h3>
          </div>


          {/* ITEMS */}

          <div className="order-items">

            {order.items?.map((item, i) => (

              <div key={i} className="order-item-row">
                <span>{item.name}</span>
                <span>× {item.quantity}</span>
                <span>₹{item.price}</span>
              </div>

            ))}

          </div>


          {/* FOOTER */}

          <div className="order-footer">

            <div className="payment-info">

              <p>Total: ₹{order.totalAmount}</p>

              <span className={`payment-status ${order.paymentStatus}`}>
                {order.paymentStatus === "paid" ? "PAID" : "FAILED"}
              </span>

              <span className="payment-method">
                {order.paymentMethod}
              </span>

            </div>

            {order.status === "pending" && (
              <button
                className="serve-btn"
                onClick={() => markServed(order._id)}
              >
                Mark as Served
              </button>
            )}

          </div>

        </div>

      ))}

    </div>

  );

};