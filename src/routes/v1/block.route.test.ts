import { assertEquals, assertObjectMatch } from "jsr:@std/assert";
import { afterEach, beforeEach, describe, it } from "jsr:@std/testing/bdd";
import sinon from "sinon";
import blockService from "../../services/block.service.ts";
import * as testUtils from "../../utils/test-utils.ts";
import app from "./block.route.ts";

describe("Block Router", () => {
  describe("GET /v1/:chain/timestamp/:timestamp", () => {
    const originalEnv = testUtils.snapshotEnv();
    const chains = {
      cosmos: "https://rpc.cosmos.network",
      osmosis: "https://rpc.osmosis.zone",
    };
    const chain = "cosmos";
    const timestamp = 1765432100;
    const blockNumber = 123456;
    const url = `/${chain}/timestamp/${timestamp}`;

    beforeEach(() => testUtils.clearEnv());

    afterEach(() => {
      testUtils.restoreEnv(originalEnv);
      sinon.restore();
    });

    it("should return the block number for a valid chain and timestamp", async () => {
      Deno.env.set("CHAINS", JSON.stringify(chains));
      const getBlockByTimestampStub = sinon.stub(
        blockService,
        "getBlockByTimestamp",
      ).resolves(blockNumber);
      const response = await app.request(url);
      assertEquals(response.status, 200);
      const responseJson = await response.json();
      assertObjectMatch(responseJson, {
        blockNumber,
        chain,
        timestamp,
      });
      assertEquals(getBlockByTimestampStub.args, [[chain, timestamp]]);
    });

    it("should return an error for an unsupported chain", async () => {
      const response = await app.request(url);
      assertEquals(response.status, 500);
      const responseText = await response.text();
      assertEquals(responseText, "Internal Server Error");
    });
  });
});