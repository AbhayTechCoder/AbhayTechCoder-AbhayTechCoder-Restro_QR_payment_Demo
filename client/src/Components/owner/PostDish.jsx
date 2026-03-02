import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const PostDishes = () => {
  const navigate = useNavigate();

  const [dish, setDish] = useState({
    name: "",
    price: "",
    image_url: "",
    category: "veg",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDish({
      ...dish,
      [name]: name === "price" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dish.name.trim()) {
      alert("Dish name is required");
      return;
    }

    if (!dish.price || dish.price <= 0) {
      alert("Price must be greater than 0");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${BASE_URL}/api/dishes/post-dish`,
        dish,
        { withCredentials: true }
      );

      if (response.status === 201) {
        alert("Post successful");
        navigate(-1);
      }
    } catch (error) {
      console.log("Post dish error:", error);
      alert("Failed to post dish");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box neu-element">
        <button className="close-modal" onClick={() => navigate(-1)}>
          ×
        </button>

        <h2>Post New Dish</h2>

        <form onSubmit={handleSubmit} className="modal-form">

          <label>Name</label>
          <input
            type="text"
            name="name"
            value={dish.name}
            onChange={handleChange}
            className="neu-input"
            required
          />

          <label>Price (₹)</label>
          <input
            type="number"
            name="price"
            value={dish.price}
            onChange={handleChange}
            className="neu-input"
            min="1"
            required
          />

          <label>Image URL</label>
          <div>
            <input
              type="text"
              name="image_url"
              value={dish.image_url}
              onChange={handleChange}
              className="neu-input img-url-input"
              placeholder="Paste image URL"
            />

            {dish.image_url && (
              <img
                src={dish.image_url}
                alt="preview"
                className="image-preview"
                style={{
                  width: "20%",
                  borderRadius: "50px",
                  marginBottom: "10px"
                }}
              />
            )}
          </div>

          <label>Category</label>
          <select
            name="category"
            value={dish.category}
            onChange={handleChange}
            className="neu-input"
          >
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
          </select>

          <label>Description</label>
          <textarea
            name="description"
            value={dish.description}
            onChange={handleChange}
            className="neu-input"
          />

          <button type="submit" className="neu-button" disabled={loading}>
            {loading ? "Posting..." : "Post Dish"}
          </button>

        </form>
      </div>
    </div>
  );
};