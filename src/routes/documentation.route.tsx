import { OpenAPIHono as Hono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { OPENAPI_SPEC_PATH } from "../config/openapi.config.ts";

import ReDoc from "../components/ReDoc.tsx";

const app = new Hono();

app.get("/swagger", swaggerUI({ url: OPENAPI_SPEC_PATH }));
app.get(
  "/redoc",
  (c) =>
    c.html(
      <ReDoc title="Redoc - Time to Block API" specUrl={OPENAPI_SPEC_PATH} />,
    ),
);

export default app;
