import mongoose, { Document, Schema } from "mongoose";

export interface ICuisine {
  name: string;
}

export interface ICuisineModel extends ICuisine, Document {}

const CuisineSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    versionKey: false, // this means that I don't wanna return the versionKey  variable, provided by mongo
  }
);

export default mongoose.model<ICuisineModel>("Cuisine", CuisineSchema);
