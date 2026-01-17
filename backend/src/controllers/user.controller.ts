import { getValidatedPart, successResponse } from "@/utils/index.util.js";
import { logger } from "better-auth";
import type { Request, Response, NextFunction } from "express";
import { getAllUserService } from "@/services/user.service.js";
import type { GetAllUserInput } from "@/validator/user.validator.js";

export async function getAllUsersController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const query = getValidatedPart<GetAllUserInput>(req, "query");

  const users = await getAllUserService(query);

  logger.info(`Fetched ${users} users from database`);

  successResponse(res, 200, "Users fetched successfully", { users });
}
