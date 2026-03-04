import { useEffect,useState } from "react";

const CompletedOrders = ()=>{

  const [orders,setOrders] = useState([]);

  const fetchOrders = async ()=>{

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/completed`,{
      credentials:"include"
    });

    const data = await res.json();
    setOrders(data);

  };

  useEffect(()=>{
    fetchOrders();
  },[]);

  return (

    <div>

      {orders.map(order=>(
        <div key={order._id} className="order-card">

          <h3>Table {order.tableNumber}</h3>

          {order.items.map((item,i)=>(
            <p key={i}>
              {item.name} × {item.quantity}
            </p>
          ))}

          <p>Total ₹{order.totalAmount}</p>

        </div>
      ))}

    </div>

  );
};

export default CompletedOrders;