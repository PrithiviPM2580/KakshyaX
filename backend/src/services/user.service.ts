import type { GetAllUserInput } from "@/validator/user.validator.js";
import APIError from "@/lib/api-error.lib.js";
import { findUsers, countUsers } from "@/repositories/user.repository.js";

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
