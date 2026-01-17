import { getAllUsersController } from "@/controllers/user.controller.js";
import asyncHandler from "@/middlewares/async-handler.middleware.js";
import { authenticateMiddleware } from "@/middlewares/authenticate.middleware.js";
import { apiLimitter } from "@/middlewares/rate-limit.middleware.js";
import { Router } from "express";

const router: Router = Router();

router
  .route("/")
  .get(
    apiLimitter,
    authenticateMiddleware(["admin", "teacher"]),
    asyncHandler(getAllUsersController),
  );

export default router;
