import app from "./app.js";
import {
  connectToDatabase,
  gracefullyCloseDatabaseConnection,
} from "./config/db.config.js";
import config from "./config/env.config.js";
import logger from "./lib/logger.lib.js";

const PORT = config.PORT || 3000;

const startServer = async () => {
  await connectToDatabase();

  const server = app.listen(PORT, () => {
    logger.info(`Server is running in http://localhost:${PORT}`);
  });

  process.on("unhandledRejection", (reason, promise) => {
    logger.error(
      "Unhandled Rejection at:",
      promise,
      "reason:",
      (reason as Error).message
    );
  });

  process.on("uncaughtException", (error) => {
    logger.error("Uncaught Exception thrown:", error.message);
    process.exit(1);
  });

  process.on("SIGTERM", async () => {
    await gracefullyCloseDatabaseConnection(server);
  });

  process.on("SIGINT", async () => {
    await gracefullyCloseDatabaseConnection(server);
  });
};

startServer();
