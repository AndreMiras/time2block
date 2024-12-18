import type { Context } from "hono";
import { SupportedChainsSchema } from "../schemas/chain.schema.ts";
import * as rpcConfig from "../config/rpc.config.ts";

export const getSupportedChains = (c: Context) => {
  const supportedChains = rpcConfig.getSupportedChains();
  const response = { supportedChains };
  SupportedChainsSchema.parse(response);
  return c.json(response, 200);
};
