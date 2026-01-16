import config from "@/config/env.config.js";
import { z } from "zod";
export function formatIssues(issues: z.ZodError["issues"]) {
  return issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));
}

export const corsOptions = {
  origin: config.CORS_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  optionsSuccessStatus: 200,
  credentials: true,
};
