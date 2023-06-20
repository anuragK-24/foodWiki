import express from "express";
import controller from "../controllers/Dish";

const router = express.Router();

router.post("/create", controller.createDish);
router.get("/get/:dishId", controller.readDish);
router.get("/get", controller.readAllDish);
router.patch("/update/:dishId", controller.updateDish);
router.delete("/delete/:dishId", controller.deleteDish);

export = router;
