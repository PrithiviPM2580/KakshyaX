import {
  getAllUsersController,
  getUserByIdController,
  getUserDepartments,
} from "@/controllers/user.controller.js";
import asyncHandler from "@/middlewares/async-handler.middleware.js";
import { authenticateMiddleware } from "@/middlewares/authenticate.middleware.js";
import { apiLimitter } from "@/middlewares/rate-limit.middleware.js";
import validateRequestMiddleware from "@/middlewares/validate-request.middleware.js";
import {
  getAllUserSchema,
  getUserByIdSchema,
} from "@/validator/user.validator.js";
import { Router } from "express";

const router: Router = Router();

router
  .route("/")
  .get(
    apiLimitter,
    authenticateMiddleware(["admin", "teacher"]),
    validateRequestMiddleware(getAllUserSchema),
    asyncHandler(getAllUsersController),
  );

router
  .route("/:id")
  .get(
    apiLimitter,
    authenticateMiddleware(["admin", "teacher", "student"]),
    validateRequestMiddleware(getUserByIdSchema),
    asyncHandler(getUserByIdController),
  );

router
  .route("/:id/departments")
  .get(
    apiLimitter,
    authenticateMiddleware(["admin", "teacher", "student"]),
    validateRequestMiddleware(getUserByIdSchema),
    asyncHandler(getUserDepartments),
  );
export default router;
