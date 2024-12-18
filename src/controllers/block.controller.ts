import type { Context } from "hono";
import blockService from "../services/block.service.ts";
import { BlockParams, BlockResponseSchema } from "../schemas/block.schema.ts";

export const getBlockByTimestamp =
  (params: BlockParams) => async (c: Context) => {
    const chain = params.chain;
    const timestamp = Number(params.timestamp);
    const blockNumber = await blockService.getBlockByTimestamp(
      chain,
      timestamp,
    );
    const response = {
      blockNumber,
      chain,
      timestamp,
    };
    BlockResponseSchema.parse(response);
    return c.json(response, 200);
  };
