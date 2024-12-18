import { createRoute, OpenAPIHono as Hono } from "@hono/zod-openapi";
import {
  BlockParamsSchema,
  BlockResponseSchema,
} from "../../schemas/block.schema.ts";
import * as blockController from "../../controllers/block.controller.ts";

const route = createRoute({
  method: "get",
  path: "/{chain}/timestamp/{timestamp}",
  request: {
    params: BlockParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: BlockResponseSchema,
        },
      },
      description: "Retrieve the block number closest to the given timestamp",
    },
  },
});

const app = new Hono()
  .openapi(
    route,
    (context) =>
      blockController.getBlockByTimestamp(context.req.valid("param"))(context),
  );

export default app;
