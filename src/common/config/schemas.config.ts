import * as joi from 'joi';

export const schemaValidations = joi.object({
  PORT: joi.number().required(),
  MONGO_DB_URI: joi.string().required(),
  JWT_SECRET: joi.string().required(),
});
