import { getValidatedPart, successResponse } from "@/utils/index.util.js";
import { logger } from "better-auth";
import type { Request, Response, NextFunction } from "express";
import {
  getAllUserService,
  getUserByIdService,
} from "@/services/user.service.js";
import type {
  GetUserByIdInput,
  GetAllUserInput,
} from "@/validator/user.validator.js";

export async function getAllUsersController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const query = getValidatedPart<GetAllUserInput>(req, "query");
  const userId = req.session?.user?.id;

  const users = await getAllUserService(query, userId);

  logger.info(`Fetched ${users} users from database for user ${userId}`);

  successResponse(res, 200, "Users fetched successfully", { users });
}

export async function getUserByIdController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const params = getValidatedPart<GetUserByIdInput>(req, "params");

  const user = await getUserByIdService(params);

  logger.info(`Fetched user with id ${params.id} from database`);

  successResponse(res, 200, "User fetched successfully", { user });
}
