import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Cuisine from "../models/Cuisine";

const createCuisine = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;

  const cuisine = new Cuisine({
    _id: new mongoose.Types.ObjectId(),
    name,
  });

  return cuisine
    .save()
    .then((cuisine) => res.status(201).json({ cuisine }))
    .catch((err) => res.status(500).json({ err }));
};

const readCuisine = (req: Request, res: Response, next: NextFunction) => {
  const cuisineId = req.params.cuisineId;
  return Cuisine.findById(cuisineId)
    .then((cuisine) =>
      cuisine
        ? res.status(200).json({ cuisine })
        : res.status(404).json({ message: "Not Found" })
    )
    .catch((err) => res.status(500).json({ err }));
};
const readAllCuisine = (req: Request, res: Response, next: NextFunction) => {
  return Cuisine.find()
    .then((cuisines) => res.status(200).json({ cuisines }))
    .catch((err) => res.status(500).json({ err }));
};

const updateCuisine = (req: Request, res: Response, next: NextFunction) => {
  const cuisineId = req.params.cuisineId;
  return Cuisine.findById(cuisineId)
    .then((cuisine) => {
      if (cuisine) {
        cuisine.set(req.body);

        return cuisine
          .save()
          .then((cuisine) => res.status(201).json({ cuisine }))
          .catch((err) => res.status(500).json({ err }));
      } else {
        res.status(404).json({ message: "Not Found" });
      }
    })
    .catch((err) => res.status(500).json({ err }));
};

const deleteCuisine = (req: Request, res: Response, next: NextFunction) => {
  const cuisineId = req.params.cuisineId;
  return Cuisine.findByIdAndDelete(cuisineId)
    .then((cuisine) =>
      cuisine
        ? res.status(201).json({ message: "Deleted Successfully" })
        : res.status(404).json({ message: "Not Found" })
    )
    .catch((err) => res.status(500).json({ err }));
};

export default {
  createCuisine,
  readCuisine,
  readAllCuisine,
  updateCuisine,
  deleteCuisine,
};
