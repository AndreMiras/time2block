import type { Context } from "hono";

/**
 * Global error handler for Hono applications.
 *
 * This function handles errors that occur during request processing and ensures
 * a consistent JSON response format for clients.
 *
 * @param {unknown} error - The error that occurred during request processing. It can be of any type.
 * @param {Context} c - The context of the current request, used to construct the response.
 * @returns {Response} JSON response with the error message and a status code of 500.
 */
export const errorHandler = (error: unknown, c: Context) => {
  if (error instanceof Error) {
    return c.json({ error: error.message }, 500);
  }
  return c.json({ error: "An unknown error occurred" }, 500);
};
