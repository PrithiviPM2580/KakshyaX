import config from "@/config/env.config.js";
import type { Request, Response } from "express";
import { z } from "zod";

export const corsOptions = {
  origin: config.CORS_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  optionsSuccessStatus: 200,
  credentials: true,
};

export function successResponse<T>(
  res: Response,
  statusCode: number = 200,
  message: string = "Success",
  data?: T,
) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

export function getValidatedPart<T>(
  req: Request,
  part: "body" | "query" | "params",
): T {
  const validated = (req as any).validated?.[part];
  return validated !== undefined ? validated : (req[part] as unknown as T);
}
