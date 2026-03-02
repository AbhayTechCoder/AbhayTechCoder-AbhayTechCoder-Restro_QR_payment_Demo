import { useEffect, useState } from "react";
import axios from "axios";
import "./ManageDishes.css";


export const ManageDishes = () => {
  const [dishes, setDishes] = useState([]);
  const [category, setCategory] = useState("veg");
  const [editDish, setEditDish] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_URL;

  const fetchDishes = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/dishes/all`
      );
      setDishes(res.data);
    } catch (err) {
      console.log("Error fetching dishes:", err);
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  const handleDelete = async (id, category) => {
    try {
      await axios.delete(
        `${BASE_URL}/api/dishes/dish-delete/${id}`,
        {
          data: { category },
          withCredentials: true
        }
      );

      fetchDishes();
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  const handleUpdate = async () => {
    try {
      const { _id, name, price, description, category } = editDish;

      await axios.put(
        `${BASE_URL}/api/dishes/dish-update/${_id}`,
        { name, price, description, category },
        { withCredentials: true }
      );

      setEditDish(null);
      fetchDishes();
    } catch (err) {
      console.log("Update error:", err);
    }
  };

  const filteredDishes = dishes.filter(
    (dish) => dish.category === category
  );

  return (
    <div className="container">
      <div className="owner-nav">
        <button
          className={`owner-link ${category === "veg" ? "active" : ""}`}
          onClick={() => setCategory("veg")}
        >
          Veg
        </button>

        <button
          className={`owner-link ${category === "non-veg" ? "active" : ""}`}
          onClick={() => setCategory("non-veg")}
        >
          Non-Veg
        </button>
      </div>

      <div className="veg-grid card-padding">
        {filteredDishes.length === 0 ? (
          <p>No dishes found</p>
        ) : (
          filteredDishes.map((item) => (
            <div className="card" key={item._id}>
              <div className="veg-image-container">
                <img
                  src={item.image_url}
                  className="veg-image"
                  alt={item.name}
                />
              </div>

              <h3 className="veg-title">{item.name}</h3>
              <p className="veg-description">{item.description}</p>

              <div className="card-price">
                <p className="veg-price">₹{item.price}</p>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    className="btn"
                    onClick={() => setEditDish({ ...item })}
                  >
                    Edit
                  </button>

                  <button
                    className="btn nonveg-btn"
                    onClick={() =>
                      handleDelete(item._id, item.category)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {editDish && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button
              className="close-modal"
              onClick={() => setEditDish(null)}
            >
              ✕
            </button>

            <h2>Edit Dish</h2>

            <input
              type="text"
              value={editDish.name}
              onChange={(e) =>
                setEditDish({ ...editDish, name: e.target.value })
              }
              placeholder="Dish Name"
            />

            <input
              type="number"
              value={editDish.price}
              onChange={(e) =>
                setEditDish({ ...editDish, price: e.target.value })
              }
              placeholder="Price"
            />

            <textarea
              value={editDish.description}
              onChange={(e) =>
                setEditDish({
                  ...editDish,
                  description: e.target.value,
                })
              }
              placeholder="Description"
            />

            <button className="btn" onClick={handleUpdate}>
              Update Dish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};