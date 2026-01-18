import type { NextFunction, Request, Response } from "express";
import type { z } from "zod";
import APIError from "@/lib/api-error.lib.js";
import logger from "@/lib/logger.lib.js";
import { formatIssues } from "@/lib/validate.lib.js";

const validatePart = (
  part: "body" | "query" | "params",
  schema: z.ZodTypeAny | undefined,
  req: Request,
  next: NextFunction,
): boolean => {
  if (!schema) return true;

  const result = schema.safeParse(req[part]);

  if (!result.success) {
    const issues = formatIssues(result.error.issues);
    logger.error(`Validation error in request ${part}`, {
      label: "ValidateRequestMiddleware",
      issues,
    });
    next(
      new APIError(400, "Validation Error", true, {
        type: "ValidationError",
        details: issues,
      }),
    );
    return false;
  }

  (req as any).validated = (req as any).validated || {};
  (req as any).validated[part] = result.data;
  return true;
};

const validateRequestMiddleware =
  (schema: RequestValidate) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    try {
      const bodyValid = validatePart("body", schema.body, req, next);
      if (!bodyValid) return;
      const queryValid = validatePart("query", schema.query, req, next);
      if (!queryValid) return;
      const paramsValid = validatePart("params", schema.params, req, next);
      if (!paramsValid) return;
      next();
    } catch (error) {
      logger.error("Unexpected error in validation middleware", {
        label: "ValidateRequestMiddleware",
        error,
      });
      next(error);
    }
  };

export default validateRequestMiddleware;
