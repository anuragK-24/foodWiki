import express from "express";
import controller from "../controllers/Dish";
import { Schemas, ValidateSchema } from "../middleware/ValidateSchema";

const router = express.Router();

router.post(
  "/create",
  ValidateSchema(Schemas.dish.create),
  controller.createDish
);
router.get("/get/:dishId", controller.readDish);
router.get("/get", controller.readAllDish);
router.patch(
  "/update/:dishId",
  ValidateSchema(Schemas.cuisine.update),
  controller.updateDish
);
router.delete("/delete/:dishId", controller.deleteDish);

export = router;
