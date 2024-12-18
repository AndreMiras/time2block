import { z } from "@hono/zod-openapi";

export const BlockParamsSchema = z.object({
  chain: z.string().openapi({
    param: {
      name: "chain",
      in: "path",
    },
    example: "cosmos",
  }),
  timestamp: z.string().openapi({
    param: {
      name: "timestamp",
      in: "path",
    },
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
