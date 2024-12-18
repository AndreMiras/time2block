import { OpenAPIHono as Hono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { OPENAPI_SPEC_PATH } from "../config/openapi.config.ts";

const app = new Hono();

app.get("/swagger", swaggerUI({ url: OPENAPI_SPEC_PATH }));

export default app;
