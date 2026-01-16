import mongoose, { mongo } from "mongoose";
import config from "./env.config.js";
import logger from "@/lib/logger.lib.js";
import APIError from "@/lib/api-error.lib.js";
import type { Server } from "node:http";

let isConnected = false;

export async function connectToDatabase() {
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
}

export async function disconnectFromDatabase() {
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
}

export function getDatabaseConnection() {
  if (!isConnected) {
    throw new APIError(500, "Database is not connected", true);
  }
  return mongoose.connection;
}

export async function gracefullyCloseDatabaseConnection(server: Server) {
  try {
    await disconnectFromDatabase();

    logger.info("Shutting down the server...");
  } catch (error) {
    throw new APIError(
      500,
      "Error during graceful shutdown",
      true,
      error as Errorresponse
    );
  } finally {
    server.close(() => {
      logger.info("Server closed successfully.");
      process.exit(0);
    });
  }
}
