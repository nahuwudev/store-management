import dotenv from "dotenv";
import { logger } from "./winston/logger";

dotenv.config();

interface EnvConfig {
  PORT?: string;
  // add more env var
}

const requiredEnvVariables: Array<keyof EnvConfig> = [
  "PORT",
  // add the same var in EnvConfig
];

const config: EnvConfig = {};

for (const envVar of requiredEnvVariables) {
  const value = process.env[envVar];

  if (value === undefined) {
    logger.error(`Environment variable ${envVar} is undefined`);
  }

  config[envVar] = value;
}

export { config };
