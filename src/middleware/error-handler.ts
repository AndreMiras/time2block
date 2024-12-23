import type { Context } from "hono";
import { getRpcEndpoints } from "../config/rpc.config.ts";

/**
 * Sanitizes sensitive information in an error message.
 *
 * This function replaces occurrences of sensitive RPC endpoints in the provided
 * error message with a placeholder ("***"). It ensures that sensitive information,
 * such as node addresses or URLs, is not exposed in client-facing responses.
 *
 * @param {string} errorMessage - The original error message containing sensitive information.
 * @param {Record<string, string>} rpcEndpoints - A map of chain names to their corresponding RPC endpoints.
 * @returns {string} The sanitized error message with sensitive information replaced.
 */
const sanitizeErrorMessage = (
  errorMessage: string,
  rpcEndpoints: Record<string, string>,
): string =>
  Object.values(rpcEndpoints).reduce(
    (sanitizedMessage, endpoint) =>
      sanitizedMessage.replaceAll(endpoint, "***"),
    errorMessage,
  );

/**
 * Global error handler for Hono applications.
 *
 * This function handles errors that occur during request processing and ensures
 * a consistent JSON response format for clients. Sensitive information in error
 * messages, such as RPC endpoints, is sanitized before being sent to the client.
 *
 * @param {unknown} error - The error that occurred during request processing. It can be of any type.
 * @param {Context} c - The context of the current request, used to construct the response.
 * @returns {Response} JSON response with the sanitized error message and a status code of 500.
 */
export const errorHandler = (error: unknown, c: Context) => {
  if (error instanceof Error) {
    const rpcEndpoints = getRpcEndpoints();
    const errorMessage = sanitizeErrorMessage(error.message, rpcEndpoints);
    return c.json({ error: errorMessage }, 500);
  }
  return c.json({ error: "An unknown error occurred" }, 500);
};
