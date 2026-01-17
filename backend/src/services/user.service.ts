import type {
  GetAllUserInput,
  GetUserByIdInput,
} from "@/validator/user.validator.js";
import APIError from "@/lib/api-error.lib.js";
import {
  findUsers,
  countUsers,
  findUserById,
} from "@/repositories/user.repository.js";
import { logger } from "better-auth";

export async function getAllUserService(query: GetAllUserInput) {
  const { page, limit, search, sortBy, order } = query;

  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    findUsers({
      skip,
      limit,
      search,
      sortBy,
      order,
    }),
    countUsers({
      search,
    }),
  ]);

  if (!users || users.length === 0 || total === 0) {
    logger.error("No users found in the database");
    throw new APIError(404, "No users found");
  }

  return {
    users,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
    },
  };
}

export async function getUserByIdService(params: GetUserByIdInput) {
  const { id } = params;

  const user = await findUserById(id);

  if (!user) {
    logger.error(`User with id ${id} not found`);
    throw new APIError(404, "User not found");
  }

  return user;
}
