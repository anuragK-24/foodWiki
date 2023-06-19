import express from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";

const router = express();
//connnect to monngoose
mongoose
  .connect(config.mongo.url, {retryWrites:true, w:'majority'})
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.log("This is ", err);
  });
