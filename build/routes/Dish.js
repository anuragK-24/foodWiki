"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Dish_1 = __importDefault(require("../controllers/Dish"));
const ValidateSchema_1 = require("../middleware/ValidateSchema");
const router = express_1.default.Router();
router.post("/create", (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.dish.create), Dish_1.default.createDish);
router.get("/get/:dishId", Dish_1.default.readDish);
router.get("/get", Dish_1.default.readAllDish);
router.patch("/update/:dishId", (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.cuisine.update), Dish_1.default.updateDish);
router.delete("/delete/:dishId", Dish_1.default.deleteDish);
module.exports = router;
