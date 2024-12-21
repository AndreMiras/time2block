import { z } from "@hono/zod-openapi";
import * as rpcConfig from "../config/rpc.config.ts";

const supportedChains = rpcConfig.getSupportedChains() as [string, ...string[]];

export const BlockParamsSchema = z.object({
  chain: z.enum(supportedChains).openapi({
    param: {
      name: "chain",
      in: "path",
    },
    description: "The blockchain chain (e.g., cosmos, osmosis).",
    enum: supportedChains,
    example: "cosmos",
  }),
  timestamp: z.string().openapi({
    param: {
      name: "timestamp",
      in: "path",
    },
    description: "The Unix timestamp to find the closest block.",
    example: "1716578490",
  }),
});

export type BlockParams = z.infer<typeof BlockParamsSchema>;

export const BlockResponseSchema = z.object({
  blockNumber: z.number().openapi({
    example: 123456,
  }),
  chain: z.string().openapi({
    example: "cosmos",
  }),
  timestamp: z.number().openapi({
    example: 1716578490,
  }),
});
