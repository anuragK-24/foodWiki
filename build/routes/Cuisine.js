"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Cuisine_1 = __importDefault(require("../controllers/Cuisine"));
const router = express_1.default.Router();
router.post("/create", Cuisine_1.default.createCuisine);
router.get("/get/:cuisineId", Cuisine_1.default.readCuisine);
router.get("/get", Cuisine_1.default.readAllCuisine);
router.patch("/update/:cuisineId", Cuisine_1.default.updateCuisine);
router.delete("/delete/:cuisineId", Cuisine_1.default.deleteCuisine);
module.exports = router;
