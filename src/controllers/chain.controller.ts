import type { Context } from "@hono/hono";
import * as rpcConfig from "../config/rpc.config.ts";

export const getSupportedChains = (c: Context) =>
  c.json({ supportedChains: rpcConfig.getSupportedChains() });
