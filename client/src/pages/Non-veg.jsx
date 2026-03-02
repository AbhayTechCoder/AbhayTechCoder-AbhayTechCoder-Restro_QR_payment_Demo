import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";

export const NonVeg = () => {

  const [nonVegItems, setNonVegItems] = useState([]);
  const { addToCart } = useCart(); // Context se aa raha hai

  const fetchNonVegItems = async () => {
    try {
      const response = await fetch(
        "${import.meta.env.VITE_API_URL}/api/dishes/non-veg"
      );
      const data = await response.json();
      setNonVegItems(data);
    } catch (error) {
      console.error("Error fetching non-veg items:", error);
    }
  };

  useEffect(() => {
    fetchNonVegItems();
  }, []);

  return (
    <main className="nonveg-container container">
      <div className="nonveg-grid card-padding">
        {nonVegItems
          .filter(item => item.isAvailable)
          .map(item => (
            <div className="card" key={item._id}>
              <div className="nonveg-image-container">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="nonveg-image"
                />
              </div>

              <h3 className="nonveg-title">{item.name}</h3>
              <p className="nonveg-description">
                {item.description}
              </p>

              <div className="card-price">
                <p className="veg-price">₹{item.price}</p>

                <button
                  className="btn nonveg-btn"
                  onClick={() => addToCart(item)}   // ✅ Context function
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