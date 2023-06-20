import Joi, { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";
import Logging from "../library/Logging";
import { ICuisine } from "../models/Cuisine";
import { IDish } from "../models/Dish";

export const ValidateSchema = (Schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Schema.validateAsync(req.body);
      //   return res.status(200);
    } catch (error) {
      Logging.err(error);
      return res.status(422).json({ error });
    }
  };
};

export const Schemas = {
  cuisine: {
    create: Joi.object<ICuisine>({
      name: Joi.string().required(),
    }),
    update: Joi.object<ICuisine>({
      name: Joi.string().required(),
    }),
  },
  dish: {
    create: Joi.object<IDish>({
      cuisine: Joi.string()
        .regex(/[0-9a-zA-Z]{26}/)
        .required(),
      title: Joi.string().required(),
    }),
    update: Joi.object<IDish>({
      cuisine: Joi.string()
        .regex(/[0-9a-zA-Z]{26}/)
        .required(),
      title: Joi.string().required(),
    }),
  },
};
