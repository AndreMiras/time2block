import { assertEquals, assertThrows } from "jsr:@std/assert";
import { afterEach, beforeEach, describe, it } from "jsr:@std/testing/bdd";
import * as testUtils from "../utils/test-utils.ts";
import * as rpcConfig from "./rpc.config.ts";

describe("RPC Config", () => {
  describe("getRpcEndpoint", () => {
    // Snapshot of original environment variables
    const originalEnv = Deno.env.toObject();
    const chains = {
      cosmos: "https://rpc.cosmos.network",
      osmosis: "https://rpc.osmosis.zone",
    };

    beforeEach(() => testUtils.clearEnv());

    afterEach(() => testUtils.restoreEnv(originalEnv));

    it("should return the correct RPC endpoint for a valid chain", () => {
      Deno.env.set("CHAINS", JSON.stringify(chains));
      const endpoint = rpcConfig.getRpcEndpoint("cosmos");
      assertEquals(endpoint, "https://rpc.cosmos.network");
    });

    it("should throw an error for an unsupported chain", () => {
      Deno.env.set("CHAINS", JSON.stringify(chains));
      assertThrows(
        () => rpcConfig.getRpcEndpoint("juno"),
        Error,
        "Unsupported chain: 'juno'. Supported chains are: cosmos, osmosis",
      );
    });

    it("should throw an error when no chains are configured", () => {
      assertThrows(
        () => rpcConfig.getRpcEndpoint("cosmos"),
        Error,
        "Unsupported chain: 'cosmos'. Supported chains are:",
      );
    });
  });
});
