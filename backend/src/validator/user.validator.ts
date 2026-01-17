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

export type GetAllUserInput = z.infer<typeof getAllUserSchema.query>;
