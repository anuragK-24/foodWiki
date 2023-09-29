"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Dish_1 = __importDefault(require("../models/Dish"));
const createDish = (req, res, next) => {
  const { title, cuisine } = req.body;
  console.log("Reached till here", title, cuisine);
  const dish = new Dish_1.default({
    _id: new mongoose_1.default.Types.ObjectId(),
    title,
    cuisine,
  });
  return dish
    .save()
    .then((dish) => res.status(201).json({ dish }))
    .catch((err) => res.status(500).json({ err }));
};
const readDish = (req, res, next) => {
  const dishId = req.params.dishId;
  return Dish_1.default
    .findById(dishId)
    .populate("cuisine")
    .select("-__v")
    .then((dish) =>
      dish
        ? res.status(200).json({ dish })
        : res.status(404).json({ message: "Not Found" })
    )
    .catch((err) => res.status(500).json({ err }));
};
const readAllDish = (req, res, next) => {
  return Dish_1.default
    .find()
    .populate("cuisine") //it'll add the cuisine name with it's id, inside the get of json of the Dish api
    .select("-__v") // if don't want "__v" in the get request
    .then((dishes) => res.status(200).json({ dishes }))
    .catch((err) => res.status(500).json({ err }));
};
const updateDish = (req, res, next) => {
  const dishId = req.params.dishId;
  return Dish_1.default
    .findById(dishId)
    .then((dish) => {
      if (dish) {
        dish.set(req.body);
        return dish
          .save()
          .then((dish) => res.status(201).json({ dish }))
          .catch((err) => res.status(500).json({ err }));
      } else {
        res.status(404).json({ message: "Not Found" });
      }
    })
    .catch((err) => res.status(500).json({ err }));
};
const deleteDish = (req, res, next) => {
  const dishId = req.params.dishId;
  return Dish_1.default
    .findByIdAndDelete(dishId)
    .then((dish) =>
      dish
        ? res.status(201).json({ message: "Deleted Successfully" })
        : res.status(404).json({ message: "Not Found" })
    )
    .catch((err) => res.status(500).json({ err }));
};
exports.default = {
  createDish,
  readDish,
  readAllDish,
  updateDish,
  deleteDish,
};
