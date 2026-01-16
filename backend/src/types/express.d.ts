import type { RateLimitInfo } from "express-rate-limit";

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
      rateLimit?: RateLimitInfo;
    }
  }
}
