import express from "express";
import controller from "../controllers/Cuisine";

const router = express.Router();

router.post("/create", controller.createCuisine);
router.get("/get/:cuisineId", controller.readCuisine);
router.get("/get", controller.readAllCuisine);
router.patch("/update/:cuisineId", controller.updateCuisine);
router.delete("/delete/:cuisineId", controller.deleteCuisine);

export = router;
