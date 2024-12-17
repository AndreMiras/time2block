import { Hono } from "@hono/hono";
import * as blockController from "../../controllers/block.controller.ts";

const app = new Hono()
  .get("/:chain/timestamp/:timestamp", blockController.getBlockByTimestamp);

export default app;
