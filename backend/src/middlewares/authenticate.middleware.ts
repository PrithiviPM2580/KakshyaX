import { auth } from "@/lib/auth.lib.js";
import APIError from "@/lib/api-error.lib.js";
import type { NextFunction, Request, Response } from "express";
import { logger } from "better-auth";

export function authenticateMiddleware(allowRoles?: Roles[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await auth.api.getSession({
        headers: Object.fromEntries(
          Object.entries(req.headers).map(([key, value]) => [
            key,
            String(value),
          ]),
        ),
      });

      if (!session) {
        logger.info("No session found");
        return next(new APIError(401, "Unauthorized"));
      }

      if (allowRoles && !allowRoles.includes(session.user.role as Roles)) {
        logger.info(`User role ${session.user.role} not allowed`);
        return next(new APIError(403, "Forbidden"));
      }

      req.session = {
        user: {
          id: session.user.id,
          role: session.user.role as Roles,
        },
      };
      next();
    } catch (error) {
      next(error);
    }
  };
}
