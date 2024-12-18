import { createRoute, OpenAPIHono as Hono } from "@hono/zod-openapi";
import { SupportedChainsSchema } from "../../schemas/chain.schema.ts";
import * as chainController from "../../controllers/chain.controller.ts";

const route = createRoute({
  method: "get",
  path: "/supported-chains",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: SupportedChainsSchema,
        },
      },
      description: "Retrieve the list of supported chains",
    },
  },
});

const app = new Hono()
  .openapi(route, chainController.getSupportedChains);

export default app;
