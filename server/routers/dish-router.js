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

const dishRouter = express.Router();

/* ================= PUBLIC ROUTES ================= */

dishRouter.route("/veg").get(getVegDishes);

dishRouter.route("/non-veg").get(getNonVegDishes);

/* ================= OWNER ROUTES ================= */

dishRouter.route("/post-dish").post(isAuth, postDish);

dishRouter.route("/dish-update/:id").put(isAuth, updateDish);

dishRouter.route("/dish-delete/:id").delete(isAuth, deleteDish);

/* ================= OWNER DASHBOARD ================= */

dishRouter.route("/all").get(isAuth, getAllDishesForOwner);

module.exports = { dishRouter };