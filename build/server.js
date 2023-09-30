"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importStar(require("mongoose"));
const config_1 = require("./config/config");
const Logging_1 = __importDefault(require("./library/Logging"));
const Cuisine_1 = __importDefault(require("./routes/Cuisine"));
const Dish_1 = __importDefault(require("./routes/Dish"));
const cors_1 = __importDefault(require("cors"));
const router = (0, express_1.default)();
router.use((0, cors_1.default)());
//connnect to monngoose
mongoose_1.default
    .connect(config_1.config.mongo.url, { retryWrites: true, w: "majority" })
    .then(() => {
    Logging_1.default.info("Connected to MongoDB");
    StartServer();
})
    .catch((err) => {
    Logging_1.default.err("Unable to Connect");
    Logging_1.default.err(err);
});
//  Only start the server if Mongo Connects
const StartServer = () => {
    router.use((req, res, next) => {
        Logging_1.default.info(`Incoming Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] `);
        res.on("finish", () => {
            Logging_1.default.info(`Incoming Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] status: [${req.statusCode}]`);
        });
        next();
    });
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json());
    //Rules of API
    router.use((req, res, next) => {
        res.header("Access-Control-Allow-Oigin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-requested with, Content-Type, Accept, Authorization ");
        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
            return res.status(200).json({});
        }
        next();
    });
    //   Routes
    router.use("/cuisines", Cuisine_1.default);
    router.use("/dishes", Dish_1.default);
    // HealthCheck of API
    router.get("/ping", (req, res, next) => {
        return res.status(200).json({ message: "pong" });
    });
    //   Error Handling
    router.use((req, res, next) => {
        const error = new mongoose_1.Error("not Found");
        Logging_1.default.err(error);
        return res.status(404).json({ message: error.message });
    });
    //   creating http
    http_1.default
        .createServer(router)
        .listen(config_1.config.server.port, () => Logging_1.default.info(`Server is Running on Port ${config_1.config.server.port}`));
};
