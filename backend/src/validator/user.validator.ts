import mongoose from "mongoose";
import { z } from "zod";

export const getAllUserSchema = {
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(10),
    search: z.string().optional(),
    sortBy: z.enum(["createdAt", "email", "name"]).default("createdAt"),
    order: z.enum(["asc", "desc"]).default("asc"),
  }),
};

export const getUserByIdSchema = {
  params: z.object({
    id: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid user ID",
    }),
  }),
};

export type GetAllUserInput = z.infer<typeof getAllUserSchema.query>;
export type GetUserByIdInput = z.infer<typeof getUserByIdSchema.params>;
