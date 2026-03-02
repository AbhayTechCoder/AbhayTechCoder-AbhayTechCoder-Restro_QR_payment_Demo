const OrderCard = ({ order }) => {
  return (
    <div className="order-card neu-element">
      <div className="order-header">
        <span className="order-table">
          Table {order.tableNumber}
        </span>
        <span className="order-time">
          {order.createdAt}
        </span>
      </div>

      <span className={`order-status status-${order.status}`}>
        {order.status}
      </span>

      <div className="order-total">
        ₹ {order.totalAmount}
      </div>
    </div>
  );
};

export default OrderCard;