import { BlockResponse, Tendermint34Client } from "@cosmjs/tendermint-rpc";
import * as rpcConfig from "../config/rpc.config.ts";

/**
 * Retrieves the block height closest to a given timestamp using binary search.
 *
 * This function connects to a Tendermint RPC endpoint, fetches the latest block height,
 * and performs a binary search over block heights to locate the block whose timestamp
 * is closest to the specified input timestamp.
 *
 * If the input timestamp is provided in milliseconds, it is automatically converted to seconds.
 * The function assumes block timestamps are returned in UTC and uses seconds for comparison.
 *
 * If the exact timestamp is not found, the block closest *before* the given timestamp is returned.
 *
 * @param {string} rpcEndpoint - The Tendermint RPC endpoint URL (e.g., "https://rpc.cosmos.network").
 * @param {number} timestamp - The Unix timestamp (seconds or milliseconds) for which to find the block.
 *
 * @returns {Promise<number>} The height of the block closest to the provided timestamp.
 *
 * @throws {Error} If no block is found matching the timestamp or the RPC endpoint is unreachable.
 */
export const getBlockByTimestamp = async (
  chain: string,
  timestamp: number,
): Promise<number> => {
  const rpcEndpoint = rpcConfig.getRpcEndpoint(chain);
  const client = await Tendermint34Client.connect(rpcEndpoint);
  // Normalize user-provided timestamp to seconds if needed
  const timestampInSeconds = timestamp > 1e10
    ? Math.floor(timestamp / 1000)
    : timestamp;

  const latestBlock = await client.block();
  const latestHeight = latestBlock.block.header.height;

  let low = 1;
  let high = Number(latestHeight);
  let closestBlock: BlockResponse | null = null;
  let blockTimeInSeconds: number;

  // Binary search for the block closest to the given timestamp
  do {
    const mid = Math.floor((low + high) / 2);
    const block = await client.block(mid);

    blockTimeInSeconds = Math.floor(
      new Date(block.block.header.time.toISOString()).getTime() / 1000,
    );

    if (blockTimeInSeconds === timestampInSeconds) {
      // Exact match found
      closestBlock = block;
    } else if (blockTimeInSeconds < timestampInSeconds) {
      low = mid + 1;
      // Update the closest block so far
      closestBlock = block;
    } else {
      high = mid - 1;
    }
  } while (low <= high && blockTimeInSeconds !== timestampInSeconds);

  if (!closestBlock) {
    throw new Error("No block found for the given timestamp.");
  }

  return Number(closestBlock.block.header.height);
};

const defaultExports = {
  getBlockByTimestamp,
};

export default defaultExports;
