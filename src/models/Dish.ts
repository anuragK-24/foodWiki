import mongoose, { Document, Schema, mongo } from "mongoose";
import { ICuisine } from "./Cuisine";
import Cuisine from "../controllers/Cuisine";

export interface IDish {
  title: string;
  cuisine: string;
}

export interface IDishModel extends ICuisine, Document {}

const DishSchema: Schema = new Schema(
  {
    title: { type: String, require: true },
    cuisine: { type: Schema.Types.ObjectId, require: true, ref: "Cuisine" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IDishModel>("Dish", DishSchema);
