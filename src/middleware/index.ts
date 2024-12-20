import { serveStatic } from "hono/deno";
import { logger } from "hono/logger";
import { OpenAPIHono as Hono } from "@hono/zod-openapi";
import { errorHandler } from "./error-handler.ts";
import { printFunction } from "./logger.ts";

export const setupMiddleware = (app: Hono) => {
  app.use(logger(printFunction));
  app.use("/public/*", serveStatic({ root: "./" }));
  app.onError(errorHandler);
};
