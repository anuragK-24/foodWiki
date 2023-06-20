"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Cuisine_1 = __importDefault(require("../controllers/Cuisine"));
const ValidateSchema_1 = require("../middleware/ValidateSchema");
const router = express_1.default.Router();
router.post("/create", (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.cuisine.create), Cuisine_1.default.createCuisine);
router.get("/get/:cuisineId", Cuisine_1.default.readCuisine);
router.get("/get", Cuisine_1.default.readAllCuisine);
router.patch("/update/:cuisineId", (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.cuisine.update), Cuisine_1.default.updateCuisine);
router.delete("/delete/:cuisineId", Cuisine_1.default.deleteCuisine);
module.exports = router;
