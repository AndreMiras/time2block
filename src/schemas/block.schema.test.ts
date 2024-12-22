import { assertEquals, assertObjectMatch, assertThrows } from "jsr:@std/assert";
import { afterEach, beforeEach, describe, it } from "jsr:@std/testing/bdd";
import * as testUtils from "../utils/test-utils.ts";

describe("Block Schema", () => {
  describe("BlockParamsSchema", () => {
    const originalEnv = testUtils.snapshotEnv();
    const chains = {
      cosmos: "https://rpc.cosmos.network",
      osmosis: "https://rpc.osmosis.zone",
    };

    beforeEach(() => testUtils.loadTestEnv());

    afterEach(() => {
      testUtils.restoreEnv(originalEnv);
    });

    it("should validate and transform valid inputs", async () => {
      Deno.env.set("CHAINS", JSON.stringify(chains));
      const { BlockParamsSchema } = await import("./block.schema.ts");
      const input = {
        chain: "cosmos",
        timestamp: "1716578490",
      };
      const result = BlockParamsSchema.parse(input);
      assertEquals(result.chain, "cosmos");
      // Transformed to number
      assertEquals(result.timestamp, 1716578490);
    });

    it("should throw an error for invalid chain", async () => {
      const { BlockParamsSchema } = await import("./block.schema.ts");
      const input = {
        chain: "invalid_chain",
        timestamp: "1716578490",
      };
      assertThrows(
        () => BlockParamsSchema.parse(input),
        Error,
        "Invalid enum value",
      );
    });

    it("should throw an error for invalid timestamp", async () => {
      const { BlockParamsSchema } = await import("./block.schema.ts");
      const input = {
        chain: "cosmos",
        timestamp: "invalid_timestamp",
      };
      assertThrows(
        () => BlockParamsSchema.parse(input),
        Error,
        "Must be a valid Unix timestamp",
      );
    });
  });

  describe("BlockResponseSchema", () => {
    it("should validate correct responses", async () => {
      const { BlockResponseSchema } = await import("./block.schema.ts");
      const response = {
        blockNumber: 123456,
        chain: "cosmos",
        timestamp: 1716578490,
      };
      const result = BlockResponseSchema.parse(response);
      assertObjectMatch(result, {
        blockNumber: 123456,
        chain: "cosmos",
        timestamp: 1716578490,
      });
    });

    it("should throw an error for invalid response", async () => {
      const { BlockResponseSchema } = await import("./block.schema.ts");
      const response = {
        // Invalid type
        blockNumber: "not_a_number",
        chain: "cosmos",
        timestamp: 1716578490,
      };
      assertThrows(
        () => BlockResponseSchema.parse(response),
        Error,
        "Expected number, received string",
      );
    });
  });
});
