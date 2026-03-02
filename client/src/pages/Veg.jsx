import { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";

export const Veg = () => {

  const [vegItems, setVegItems] = useState([]);
  const { addToCart } = useCart(); // Context se aa raha hai

  const fetchVegItems = async () => {
    try {
      const response = await fetch(
        "${import.meta.env.VITE_API_URL}/api/dishes/veg"
      );
      const data = await response.json();
      setVegItems(data);
    } catch (error) {
      console.error("Error fetching veg items:", error);
    }
  };

  useEffect(() => {
    fetchVegItems();
  }, []);

  return (
    <main className="veg-container container">
      <div className="veg-grid card-padding">
        {vegItems.map(item => (
          <div className="card" key={item._id}>

            <div className="veg-image-container">
              <img
                src={item.image_url}
                className="veg-image"
                alt={item.name}
              />
            </div>

            <h3 className="veg-title">{item.name}</h3>
            <p className="veg-description">
              {item.description}
            </p>

            <div className="card-price">
              <p className="veg-price">
                ₹{item.price}
              </p>

              <button
                className="btn nonveg-btn"
                onClick={() => addToCart(item)} // ✅ Context function
              >
                Add +
              </button>
            </div>

          </div>
        ))}
      </div>
    </main>
  );
};