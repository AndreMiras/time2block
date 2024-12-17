import { Hono } from "@hono/hono";
import * as chainController from "../../controllers/chain.controller.ts";

const app = new Hono()
  .get("/supported-chains", chainController.getSupportedChains);

export default app;
