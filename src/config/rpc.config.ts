import "jsr:@std/dotenv/load";

/**
 * Fetch all RPC endpoints from the environment variable.
 *
 * @returns {Record<string, string>} An object containing chain-to-RPC mappings.
 */
export const getRpcEndpoints = (): Record<string, string> =>
  JSON.parse(Deno.env.get("CHAINS") || "{}");

/**
 * Fetch RPC endpoint dynamically for a given chain name.
 *
 * @param {string} chain - The name of the blockchain chain (e.g., "cosmos", "osmosis").
 * @returns {string} The RPC endpoint URL.
 * @throws {Error} If the chain is unsupported or not configured.
 */
export const getRpcEndpoint = (chain: string): string => {
  const rpcEndpoints = getRpcEndpoints();
  const rpcEndpoint = rpcEndpoints[chain];
  if (!rpcEndpoint) {
    const supportedChains = Object.keys(rpcEndpoints).join(", ");
    throw new Error(
      `Unsupported chain: '${chain}'. Supported chains are: ${supportedChains}`,
    );
  }
  return rpcEndpoint;
};

/**
 * Retrieve the list of supported chains.
 *
 * @returns {string[]} An array of supported chain names.
 */
export const getSupportedChains = (): string[] =>
  Object.keys(getRpcEndpoints());

const defaultExports = {
  getRpcEndpoint,
};

export default defaultExports;
