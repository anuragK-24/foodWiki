"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Cuisine_1 = __importDefault(require("../models/Cuisine"));
const createCuisine = (req, res, next) => {
    const { name } = req.body;
    const { dishImage } = req.body;
    const cuisine = new Cuisine_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        name,
        dishImage,
    });
    return cuisine
        .save()
        .then((cuisine) => res.status(201).json({ cuisine }))
        .catch((err) => res.status(500).json({ err }));
};
const readCuisine = (req, res, next) => {
    const cuisineId = req.params.cuisineId;
    return Cuisine_1.default.findById(cuisineId)
        .then((cuisine) => cuisine
        ? res.status(200).json({ cuisine })
        : res.status(404).json({ message: "Not Found" }))
        .catch((err) => res.status(500).json({ err }));
};
const readAllCuisine = (req, res, next) => {
    return Cuisine_1.default.find()
        .then((cuisines) => res.status(200).json({ cuisines }))
        .catch((err) => res.status(500).json({ err }));
};
const updateCuisine = (req, res, next) => {
    const cuisineId = req.params.cuisineId;
    return Cuisine_1.default.findById(cuisineId)
        .then((cuisine) => {
        if (cuisine) {
            cuisine.set(req.body);
            return cuisine
                .save()
                .then((cuisine) => res.status(201).json({ cuisine }))
                .catch((err) => res.status(500).json({ err }));
        }
        else {
            res.status(404).json({ message: "Not Found" });
        }
    })
        .catch((err) => res.status(500).json({ err }));
};
const deleteCuisine = (req, res, next) => {
    const cuisineId = req.params.cuisineId;
    return Cuisine_1.default.findByIdAndDelete(cuisineId)
        .then((cuisine) => cuisine
        ? res.status(201).json({ message: "Deleted Successfully" })
        : res.status(404).json({ message: "Not Found" }))
        .catch((err) => res.status(500).json({ err }));
};
exports.default = {
    createCuisine,
    readCuisine,
    readAllCuisine,
    updateCuisine,
    deleteCuisine,
};
