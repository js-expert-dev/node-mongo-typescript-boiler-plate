import Joi from "joi";
import path from "path";
import dotenv from "dotenv";
//
import { ConfigType, EnvType } from "./types";
import { NODE_ENV } from "utils/constants";

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object<ConfigType, true>()
  .keys({
    NODE_ENV: Joi.string()
      .valid(NODE_ENV.DEVELOPMENT, NODE_ENV.PRODUCTION, NODE_ENV.TEST)
      .required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description("Mongo DB url"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const env: EnvType = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL,
  },
};
