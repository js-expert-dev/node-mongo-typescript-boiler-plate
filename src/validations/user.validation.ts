import Joi from "joi";
import { objectId } from "./custom.validation";
import { GetUserValidationType } from "./types";

export const getUserValidation = Joi.object<GetUserValidationType>().keys({
  params: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
  }),
});
