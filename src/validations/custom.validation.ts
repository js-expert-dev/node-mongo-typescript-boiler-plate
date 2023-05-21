import Joi from "joi";

export const objectId: Joi.CustomValidator = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message({
      message: '"{{#label}}" must be a valid mongo id',
    });
  }
  return value;
};
