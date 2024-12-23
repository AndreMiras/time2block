import { OpenAPIHono as Hono } from "@hono/zod-openapi";
import { setupMiddleware } from "./middleware/index.ts";
import {
  getOpenAPIMetadata,
  OPENAPI_SPEC_PATH,
} from "./config/openapi.config.ts";
import indexRoute from "./routes/index.route.tsx";
import docRoute from "./routes/documentation.route.tsx";
import blockRouteV1 from "./routes/v1/block.route.ts";
import chainRouteV1 from "./routes/v1/chain.route.ts";

export const createApp = (version = "1.0.0"): Hono => {
  const app = new Hono();

  setupMiddleware(app);

  app.doc(OPENAPI_SPEC_PATH, getOpenAPIMetadata(version));
  app.route("/", indexRoute);
  app.route("/", docRoute);
  app.route("/v1", chainRouteV1);
  app.route("/v1", blockRouteV1);

  return app;
};
