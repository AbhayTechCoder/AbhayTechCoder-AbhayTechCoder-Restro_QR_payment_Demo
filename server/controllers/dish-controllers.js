const { NonVeg } = require("../models/nonVeg-model");
const { Veg } = require("../models/veg-model");

/* ================= GET ================= */

const getVegDishes = async (req, res) => {
    try {
        const vegitems = await Veg.find();
        res.status(200).json(vegitems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getNonVegDishes = async (req, res) => {
    try {
        const nonVegitems = await NonVeg.find();
        res.status(200).json(nonVegitems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* ================= OWNER ALL ================= */

const getAllDishesForOwner = async (req, res) => {
    try {
        const vegitems = await Veg.find();
        const nonVegitems = await NonVeg.find();

        const allDishes = [
            ...vegitems.map(item => ({
                ...item._doc,
                category: "veg"
            })),
            ...nonVegitems.map(item => ({
                ...item._doc,
                category: "non-veg"
            }))
        ];

        res.status(200).json(allDishes);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* ================= UPDATE ================= */

const updateDish = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description, category } = req.body;

        if (!name || !price) {
            return res.status(400).json({
                message: "Name and price are required"
            });
        }

        const updateData = {
            name,
            price,
            description
        };

        let updatedDish;

        if (category === "veg") {
            updatedDish = await Veg.findByIdAndUpdate(
                id,
                updateData,
                { returnDocument: "after", runValidators: true }
            );
        } else if (category === "non-veg") {
            updatedDish = await NonVeg.findByIdAndUpdate(
                id,
                updateData,
                { returnDocument: "after", runValidators: true }
            );
        } else {
            return res.status(400).json({ message: "Invalid category" });
        }

        if (!updatedDish) {
            return res.status(404).json({ message: "Dish not found" });
        }

        res.status(200).json({
            success: true,
            dish: updatedDish,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* ================= DELETE ================= */

const deleteDish = async (req, res) => {
    try {
        const { id } = req.params;
        const { category } = req.body;

        let deletedDish;

        if (category === "veg") {
            deletedDish = await Veg.findByIdAndDelete(id);
        } else if (category === "non-veg") {
            deletedDish = await NonVeg.findByIdAndDelete(id);
        } else {
            return res.status(400).json({ message: "Invalid category" });
        }

        if (!deletedDish) {
            return res.status(404).json({ message: "Dish not found" });
        }

        res.status(200).json({
            success: true,
            message: "Dish deleted successfully",
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* ================= POST ================= */

const postDish = async (req, res) => {
    try {
        const { name, price, image_url, category, description } = req.body;

        if (!name || !price) {
            return res.status(400).json({
                message: "Dish name and price required"
            });
        }

        const dishData = {
            name,
            price,
            image_url,
            category,
            description
        };

        let newDish;

        if (category === "veg") {
            newDish = await Veg.create(dishData);
        } else if (category === "non-veg") {
            newDish = await NonVeg.create(dishData);
        } else {
            return res.status(400).json({ message: "Invalid category" });
        }

        res.status(201).json({
            success: true,
            dish: newDish
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getVegDishes,
    getNonVegDishes,
    getAllDishesForOwner,
    updateDish,
    deleteDish,
    postDish
};