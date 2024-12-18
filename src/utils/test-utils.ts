/**
 * Clears all environment variables.
 */
export const clearEnv = () => {
  for (const key in Deno.env.toObject()) {
    Deno.env.delete(key);
  }
};

/**
 * Restores the environment variables to their original state.
 *
 * @param {Record<string, string>} originalEnv - A snapshot of the original environment variables.
 */
export const restoreEnv = (originalEnv: Record<string, string>) => {
  clearEnv();
  for (const key in originalEnv) {
    Deno.env.set(key, originalEnv[key]);
  }
};

/**
 * Takes a snapshot of the current environment variables.
 *
 * @returns {Record<string, string>} A snapshot of the current environment variables.
 */
export const snapshotEnv = (): Record<string, string> => Deno.env.toObject();

/**
 * Disables logging for tests by setting the `ENABLE_LOGGER` environment variable to `false`.
 *
 * Use this in your test setup to silence unnecessary logging during tests.
 */
export const disableLogger = () => Deno.env.set("ENABLE_LOGGER", "false");

/**
 * Clears the current environment variables and disables the logger for tests.
 */
export const loadTestEnv = () => {
  clearEnv();
  disableLogger();
};
