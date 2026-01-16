import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { getDatabaseConnection } from "@/config/db.config.js";
import APIError from "./api-error.lib.js";
import config from "@/config/env.config.js";

const client = getDatabaseConnection();

if (!client.db) {
  throw new APIError(500, "Database connection not established");
}

export const auth = betterAuth({
  database: mongodbAdapter(client.db),
  emailAndPassword: {
    enabled: true,
  },
  user:{
    additionalFields:{
     role:{
      type:"string",
      required:true,
      defaultValue:"student",
      input:true
     },
     avatar:{
      type:"string",
      required:false,
      input:true
     }
    }
  },
  socialProviders: {
    google: {
      clientId: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_ID,
      redirectURI: config.GOOGLE_REDIRECT_URI,
    },
  },
  secret: config.BETTER_AUTH_SECRET,
  baseURL: config.BETTER_AUTH_URL,
  basePath: "/api/v1/auth",
});
