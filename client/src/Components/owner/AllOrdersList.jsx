import { useEffect, useState } from "react";
import socket from "../../socket";

export const AllOrdersList = () => {

  const [orders,setOrders] = useState([]);

  const fetchOrders = async () => {

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/orders/all`,
      { credentials:"include" }
    );

    const data = await res.json();
    setOrders(data);

  };


  useEffect(()=>{

    fetchOrders();

    socket.on("new-order",(order)=>{

      setOrders(prev => [order,...prev]);

    });

    return ()=> socket.off("new-order");

  },[]);



  const markServed = async(id)=>{

    await fetch(
      `${import.meta.env.VITE_API_URL}/api/orders/served/${id}`,
      {
        method:"PATCH",
        credentials:"include"
      }
    );

    fetchOrders();

  };



  return (

    <div className="orders-list">

      {orders.map(order=>(
        <div key={order._id} className="order-card">

          <h3>Table {order.tableNumber}</h3>

          {order.items.map((item,i)=>(
            <p key={i}>
              {item.name} × {item.quantity} — ₹{item.price}
            </p>
          ))}

          <p>Total: ₹{order.totalAmount}</p>

          {order.status === "pending" && (
            <button
              onClick={()=>markServed(order._id)}
            >
              Mark as Served
            </button>
          )}

        </div>
      ))}

    </div>

  );

};