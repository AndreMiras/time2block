import { Hono } from "@hono/hono";
import { logger } from "@hono/hono/logger";
import blockRouteV1 from "./routes/v1/block.route.ts";
import chainRouteV1 from "./routes/v1/chain.route.ts";

const app = new Hono();

app.use(logger());

app.route("/v1", blockRouteV1);
app.route("/v1", chainRouteV1);

export default app;
