import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "@/lib/auth.lib.js";
import { successResponse } from "@/utils/index.util.js";
import config from "@/config/env.config.js";
import mongoose from "mongoose";
import APIError from "@/lib/api-error.lib.js";

const router: Router = Router();

router.all("/api/v1/auth/*splat", toNodeHandler(auth));

router.route("/").get((req: Request, res: Response, next: NextFunction) => {
  try {
    successResponse(res, 200, "KakshysX API is running", {
      appName: config.APP_NAME,
      status: process.uptime() > 0 ? "Running" : "Stopped",
      version: config.APP_VERSION,
      environment: config.NODE_ENV,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
});

router
  .route("/health")
  .get((req: Request, res: Response, next: NextFunction) => {
    try {
      const dbState =
        mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";
      successResponse(res, 200, "Health Check Successful", {
        appName: config.APP_NAME,
        service: "KakshyaX API",
        status: "ok",
        environment: config.NODE_ENV,
        database: dbState,
        timestamp: new Date().toISOString(),
        memoryUsage: `${process.memoryUsage().heapUsed / 1024 / 1024} MB`,
      });
    } catch (error) {
      next(error);
    }
  });

router.use((req: Request, res: Response, next: NextFunction) => {
  next(
    new APIError(
      404,
      "Route Not Found",
      true,
      "The requested route does not exist"
    )
  );
});

export default router;
