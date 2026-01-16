import mongoose, { mongo } from "mongoose";
import config from "./env.config.js";
import logger from "@/lib/logger.lib.js";
import APIError from "@/lib/api-error.lib.js";

let isConnected = false;

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(config.DATABASE_URL);
    isConnected = true;
    logger.info("Connected to the database successfully.");
  } catch (error) {
    logger.error("Database connection error:", error);
    throw new APIError(
      500,
      "Database connection error",
      true,
      error as Errorresponse
    );
  }
};

export const disconnectFromDatabase = async () => {
  if (isConnected) {
    try {
      await mongoose.disconnect();
      isConnected = false;
      logger.info("Disconnected from the database successfully.");
    } catch (error) {
      logger.error("Error disconnecting from the database:", error);
      throw new APIError(
        500,
        "Database disconnection error",
        true,
        error as Errorresponse
      );
    }
  }
};

export const getDatabaseConnection = () => {
  if (!isConnected) {
    throw new APIError(500, "Database is not connected", true);
  }
  return mongoose.connection;
};
