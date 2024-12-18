import { Hono } from "@hono/hono";
import { logger } from "@hono/hono/logger";
import { errorHandler } from "./error-handler.ts";
import { printFunction } from "./logger.ts";

export const setupMiddleware = (app: Hono) => {
  app.use(logger(printFunction));
  app.onError(errorHandler);
};
