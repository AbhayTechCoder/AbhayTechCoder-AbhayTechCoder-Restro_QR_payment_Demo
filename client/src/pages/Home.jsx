import { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";

export const Home = () => {

  const [allItems, setAllItems] = useState([]);
  const { addToCart } = useCart(); // Context se aa raha hai

  const fetchVegItems = async () => {
    try {
      const response = await fetch(${import.meta.env.VITE_API_URL}/api/dishes/veg);
      const data = await response.json();
      setAllItems(prev => [...prev, ...data]);
    } catch (error) {
      console.error("Error fetching veg items:", error);
    }
  };

  const fetchNonVegItems = async () => {
    try {
      const response = await fetch(${import.meta.env.VITE_API_URL}/api/dishes/non-veg);
      const data = await response.json();
      setAllItems(prev => [...prev, ...data]);
    } catch (error) {
      console.error("Error fetching non-veg items:", error);
    }
  };

  useEffect(() => {
    fetchVegItems();
    fetchNonVegItems();
  }, []);

  return (
    <main className="home-container container">
      <div className="home-grid card-padding">
        {allItems
          .filter(item => item.isAvailable)
          .map(item => (
            <div className="card" key={item._id}>
              <div className="home-image-container">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="home-image"
                />
              </div>

              <h3 className="home-title">{item.name}</h3>
              <p className="home-description">{item.description}</p>

              <div className="card-price">
                <p className="home-price">₹{item.price}</p>

                <button
                  className="btn all-btn"
                  onClick={() => addToCart(item)}  // ✅ Context function
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