import Joi from "joi";
import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";

const validate =
  (schema: Joi.ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req);
    if (error) {
      // Validation failed
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: error.details[0].message });
    }
    // Validation passed, continue with route handling
    next();
  };
export default validate;
