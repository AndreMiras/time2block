import { assertEquals, assertObjectMatch } from "jsr:@std/assert";
import { afterEach, beforeEach, describe, it } from "jsr:@std/testing/bdd";
import * as testUtils from "../../utils/test-utils.ts";
import app from "./chain.route.ts";

describe("Chain Router", () => {
  const originalEnv = testUtils.snapshotEnv();
  const chains = {
    cosmos: "https://rpc.cosmos.network",
    osmosis: "https://rpc.osmosis.zone",
  };

  beforeEach(() => testUtils.clearEnv());

  afterEach(() => testUtils.restoreEnv(originalEnv));

  describe("GET /v1/supported-chains", () => {
    const url = "/supported-chains";

    it("should return the list of supported chains when CHAINS is set", async () => {
      Deno.env.set("CHAINS", JSON.stringify(chains));
      const response = await app.request(url);
      assertEquals(response.status, 200);
      const responseJson = await response.json();
      assertObjectMatch(responseJson, { supportedChains: Object.keys(chains) });
    });
  });
});
