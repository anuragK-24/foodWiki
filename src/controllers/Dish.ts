import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Dish from "../models/Dish";

const createDish = (req: Request, res: Response, next: NextFunction) => {
  const { title, cuisine } = req.body;
  console.log("Reached till here", title, cuisine);

  const dish = new Dish({
    _id: new mongoose.Types.ObjectId(),
    title,
    cuisine,
  });

  return dish
    .save()
    .then((dish) => res.status(201).json({ dish }))
    .catch((err) => res.status(500).json({ err }));
};

const readDish = (req: Request, res: Response, next: NextFunction) => {
  const dishId = req.params.dishId;
  return Dish.findById(dishId)
    .then((dish) =>
      dish
        ? res.status(200).json({ dish })
        : res.status(404).json({ message: "Not Found" })
    )
    .catch((err) => res.status(500).json({ err }));
};
const readAllDish = (req: Request, res: Response, next: NextFunction) => {
  return Dish.find()
    .then((dishes) => res.status(200).json({ dishes }))
    .catch((err) => res.status(500).json({ err }));
};

const updateDish = (req: Request, res: Response, next: NextFunction) => {
  const dishId = req.params.dishId;
  return Dish.findById(dishId)
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

const deleteDish = (req: Request, res: Response, next: NextFunction) => {
  const dishId = req.params.dishId;
  return Dish.findByIdAndDelete(dishId)
    .then((dish) =>
      dish
        ? res.status(201).json({ message: "Deleted Successfully" })
        : res.status(404).json({ message: "Not Found" })
    )
    .catch((err) => res.status(500).json({ err }));
};

export default {
  createDish,
  readDish,
  readAllDish,
  updateDish,
  deleteDish,
};
