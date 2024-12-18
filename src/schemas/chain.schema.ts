import { z } from "@hono/zod-openapi";

export const SupportedChainsSchema = z.object({
  supportedChains: z.array(z.string()).openapi({
    example: ["cosmos", "osmosis"],
  }),
});
