import type { Context } from "@hono/hono";
import blockService from "../services/block.service.ts";

export const getBlockByTimestamp = async (c: Context) => {
  const chain = c.req.param("chain");
  const timestamp = Number(c.req.param("timestamp"));
  const blockNumber = await blockService.getBlockByTimestamp(
    chain,
    timestamp,
  );
  return c.json({
    blockNumber,
    chain,
    timestamp,
  });
};
