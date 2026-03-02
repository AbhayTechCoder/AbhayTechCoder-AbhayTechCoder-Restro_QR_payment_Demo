const express = require("express");
const { 
  getVegDishes, 
  getNonVegDishes,
  getAllDishesForOwner,
  updateDish,
  deleteDish,
  postDish
} = require("../controllers/dish-controllers");
const { isAuth } = require("../middlewares/isAuth");
const { isAdmin } = require("../middlewares/isAdmin");

const dishRouter = express.Router();

dishRouter.route("/veg").get(getVegDishes);
dishRouter.route("/non-veg").get(getNonVegDishes);
dishRouter.route("/post-dish").post(isAuth, isAdmin, postDish);

dishRouter.route("/dish-update/:id").put(isAuth, isAdmin, updateDish);
dishRouter.route("/dish-delete/:id").delete(isAuth, isAdmin, deleteDish);

/* ✅ NEW ROUTE FOR OWNER */
dishRouter.route("/all").get(getAllDishesForOwner);

module.exports = { dishRouter };