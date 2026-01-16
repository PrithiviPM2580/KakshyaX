import validate from "@/lib/validate.lib.js";
import { envSchema } from "@/validator/env.validator.js";

const envConfig = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  LOG_LEVEL: process.env.LOG_LEVEL,
  DATABASE_URL: process.env.DATABASE_URL,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
};

const config = validate(envSchema, envConfig);

export default config;
