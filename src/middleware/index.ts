import { OpenAPIHono as Hono } from "@hono/zod-openapi";
import { logger } from "hono/logger";
import { errorHandler } from "./error-handler.ts";
import { printFunction } from "./logger.ts";

export const setupMiddleware = (app: Hono) => {
  app.use(logger(printFunction));
  app.onError(errorHandler);
};
