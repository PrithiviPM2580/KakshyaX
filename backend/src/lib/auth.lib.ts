import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import APIError from "./api-error.lib.js";
import config from "@/config/env.config.js";

const client = new MongoClient(config.DATABASE_URL);
const db = client.db();

const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "student",
        input: true,
      },
      avatar: {
        type: "string",
        required: false,
        input: true,
      },
    },
  },
  socialProviders: {
    google: {
      clientId: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      redirectURI: config.GOOGLE_REDIRECT_URI,
    },
  },
  advanced: {
    disableCSRFCheck: true,
  },
  secret: config.BETTER_AUTH_SECRET,
  baseURL: config.BETTER_AUTH_URL,
  basePath: "/api/v1/auth",
  trustedOrigins: [config.CORS_ORIGIN, "*"],
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days - main session expiration
    updateAge: 60 * 60 * 24, // 1 day - session refresh interval
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes - cookie cache duration
    },
  },
});

export { auth, db };
