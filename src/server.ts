import express from "express";
import http from "http";
import mongoose, { Error } from "mongoose";
import { config } from "./config/config";
import Logging from "./library/Logging";
import cuisineRoutes from "./routes/Cuisine";

const router = express();
//connnect to monngoose
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    Logging.info("Connected to MongoDB");
    StartServer();
  })
  .catch((err) => {
    Logging.err("Unable to Connect");
    Logging.err(err);
  });

//  Only start the server if Mongo Connects

const StartServer = () => {
  router.use((req, res, next) => {
    Logging.info(
      `Incoming Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] `
    );

    res.on("finish", () => {
      Logging.info(
        `Incoming Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] status: [${req.statusCode}]`
      );
    });
    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  //Rules of API
  router.use((req, res, next) => {
    res.header("Access-Control-Allow-Oigin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-requested with, Content-Type, Accept, Authorization "
    );

    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }
    next();
  });

  //   Routes

    router.use('/cuisines', cuisineRoutes)

  // HealthCheck of API

  router.get("/ping", (req, res, next) => {
    return res.status(200).json({ message: "pong" });
  });

  //   Error Handling
  router.use((req, res, next) => {
    const error = new Error("not Found");
    Logging.err(error);
    return res.status(404).json({message:error.message});
  });

//   creating http 

  http.createServer(router).listen(config.server.port, ()=> Logging.info(`Server is Running on Port ${config.server.port}`))
};
