import express, { type Express } from "express";
import cors from "cors";
import { globalRateLimiter } from "./middlewares/rate-limit.middleware.js";
import routes from "@/routes/index.route.js";
import globalErrorHandler from "./middlewares/global-error.middleware.js";
const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(globalRateLimiter);

app.use(routes);

app.use(globalErrorHandler);

export default app;
