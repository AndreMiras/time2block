import type { Context } from "hono";
import { assertEquals } from "jsr:@std/assert";
import { afterEach, beforeEach, describe, it } from "jsr:@std/testing/bdd";
import sinon from "sinon";
import * as testUtils from "../utils/test-utils.ts";
const rpcEndpoints = {
  cosmos: "http://127.0.0.1:26657",
  osmosis: "http://example.com:26657",
};

describe("Error Handler", () => {
  describe("errorHandler", () => {
    const originalEnv = testUtils.snapshotEnv();
    const mockContext = {
      json: sinon.fake((response: unknown, status: number) =>
        new Response(JSON.stringify(response), { status })
      ),
    } as unknown as Context;

    beforeEach(() => testUtils.loadTestEnv());

    afterEach(() => {
      testUtils.restoreEnv(originalEnv);
      sinon.restore();
    });

    it("should sanitize the error message and return a JSON response", async () => {
      Deno.env.set("CHAINS", JSON.stringify(rpcEndpoints));
      const { errorHandler } = await import("./error-handler.ts");
      const error = new Error(
        "Error connecting to http://127.0.0.1:26657. Connection refused.",
      );
      //
      const response = errorHandler(error, mockContext);
      assertEquals(response.status, 500);
      const jsonResponse = await response.json();
      assertEquals(
        jsonResponse.error,
        "Error connecting to ***. Connection refused.",
      );
    });

    it("should return a generic error message for unknown errors", async () => {
      const { errorHandler } = await import("./error-handler.ts");
      const response = errorHandler(null, mockContext);
      assertEquals(response.status, 500);
      const jsonResponse = await response.json();
      assertEquals(jsonResponse.error, "An unknown error occurred");
    });
  });
});
