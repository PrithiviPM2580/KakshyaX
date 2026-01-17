import type { RateLimitInfo } from "express-rate-limit";

declare global {
  namespace Express {
    interface Request {
      rateLimit?: RateLimitInfo;
      session?: {
        user: {
          id: string;
          role: Roles;
        };
      };
    }
  }
}
