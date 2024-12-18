import { OpenAPIHono as Hono } from "@hono/zod-openapi";
import { setupMiddleware } from "./middleware/index.ts";
import {
  OPENAPI_METADATA,
  OPENAPI_SPEC_PATH,
} from "./config/openapi.config.ts";
import docRoute from "./routes/documentation.route.ts";
import blockRouteV1 from "./routes/v1/block.route.ts";
import chainRouteV1 from "./routes/v1/chain.route.ts";

const app = new Hono();

setupMiddleware(app);

app.doc(OPENAPI_SPEC_PATH, OPENAPI_METADATA);

app.route("/", docRoute);
app.route("/v1", chainRouteV1);
app.route("/v1", blockRouteV1);

export default app;
